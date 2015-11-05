class EventsController < ApplicationController
	def index
    @events = Event.last(2)
    respond_to do |format|
      format.html
      format.json { render json: {events: @events} }
    end
  end

  def create
    @event = Event.new(event_params)

    if @event.save
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :date)
  end
end
