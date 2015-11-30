class EventsController < ApplicationController
  before_action :set_event, :except => [:create, :index, :new, :route_to_home]

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
    @event.update_attributes(:date => Date.strptime(params[:start_date], "%m/%d/%Y"))
    binding.pry
    @event.update_attributes(:city => params[:city])
    if @event.save
      respond_to do |format|
        format.js {render js: "location.href = 'https://www.google.com'"}
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
    events = Array.new
    @user = User.find(params[:user])
    
    @event.users.each do |event| 
      events << event.id
    end
    
    unless events.include? @user.id
      @event.users << @user
    end

    if params[:role] && params[:role] != 'staff'
      Event.find(params[:id]).update_attributes(params[:role].intern => params[:user])
    end

    render json: Event.all
  end

  def remove_user
    @user = User.find(params[:user])
    @event.users.delete(@user)
    Event.find(params[:id]).update_attributes(params[:role].intern => nil) unless params[:role] == 'staff'
    render json: Event.all
  end

  def route_to_home
    @event = Event.reorder("created_at ASC").last
    redirect_to root_path(:event => @event.id, :city => @event.city)
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:title, :description, :date, :city, :address)
  end
end
