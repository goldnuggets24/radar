class AddFieldsToEvents < ActiveRecord::Migration
  def change
  	add_column :events, :start_time, :time
  	add_column :events, :end_time, :time
  	add_column :events, :end_date, :date
  	add_column :events, :city, :string
  	add_column :events, :address, :string
    add_column :events, :state, :string
  	add_column :events, :team_lead, :integer
  	add_column :events, :project_manager, :integer
  	add_column :events, :product_specialist, :integer
  	add_column :events, :hospitality_server, :integer
  	add_column :events, :promotional_model, :integer
  	add_column :events, :event_manager, :integer
  end
end
