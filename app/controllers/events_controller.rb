class EventsController < ApplicationController
  before_action :set_event, :except => [:create, :index, :new, :route_to_home]

	def index
    @all_events = Event.all.as_json(include: :users)
    if params[:date].present?
        str = params[:date]
        @events = Event.where(:date => str.slice(0..(str.index(' GMT')))).as_json(include: :users)
    else
      @events = Event.all.includes([:users])
    end
    # respond_to do |format|
    #   format.html
    #   format.json { render json: {events: @events} }
    # end
  end

  def show
  end

  def new
    respond_to do |format|
      format.json {
        render json: {cities: @cities = CS.countries}
      }
      format.html
    end
  end

  def create
    @event = Event.new(event_params)
    @event.update_attributes(:date => params[:event][:startDate])
    @event.update_attributes(:end_date => Date.strptime(params[:end_date], "%m/%d/%Y"))
    @event.update_attributes(:city => params[:city])
    @event.update_attributes(:region => params[:region])
    @event.update_attributes(:start_time => params[:start_time].to_time)
    @event.update_attributes(:end_time => params[:end_time].to_time)
    
    if @event.save
      respond_to do |format|
        format.js {render js: "location.href = '/events'"}
      end
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def update
    if @event.update_attributes(:title => params[:event])
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
    redirect_to events_path(:event => @event.id, :city => @event.city)
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:start_date, :end_date, :startDate, :start_time, :end_time, :region, :manager, :client, :users, :location, :title, :description, :date, :city, :address)
  end
end
