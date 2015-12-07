class AddMoreFieldsToEvents < ActiveRecord::Migration
  def change
	add_column :events, :generic_title, :string
    add_column :events, :generic_location, :string
    add_column :events, :venue_contact, :string
    add_column :events, :region, :string
    add_column :events, :notes, :text
    add_column :events, :shift_id, :integer, references: :shifts
  end
end
