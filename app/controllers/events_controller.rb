class EventsController < ApplicationController
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

  def create
    @event = Event.new(event_params)
    if @event.save
      @event.update_attributes(:date => params[:date].to_date)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    head :no_content
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :date)
  end
end
