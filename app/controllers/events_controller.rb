class EventsController < ApplicationController
  before_action :set_event, :except => [:create, :index, :new]

	def index
    @all_events = Event.all.as_json(include: :users)
    if params[:date].present?
        str = params[:date]
        @events = Event.where(:date => str.slice(0..(str.index(' GMT')))).as_json(include: :users)
    else
      @events = Event.all.as_json(include: :users)
    end
    respond_to do |format|
      format.html
      format.json { render json: {events: @events} }
    end
  end

  def new
  end

  def create
    @event = Event.new(event_params)
    @event.update_attributes(:date => params[:start_date].to_date)
    if @event.save
      respond_to do |format|
        format.html
        format.json { render json: @event }
      end
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event.destroy
    head :no_content
  end

  def add_user
    @event.users << User.find(params[:user])

    if params[:role]
      Event.find(params[:id]).update_attributes(params[:role].intern => params[:user])
    end

    render json: Event.all
  end

  def remove_user
    @user = User.find(params[:user])
    @event.users.delete(@user)
    Event.find(params[:id]).update_attributes(params[:role].intern => nil)
    render json: Event.all
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:title, :description, :date)
  end
end
