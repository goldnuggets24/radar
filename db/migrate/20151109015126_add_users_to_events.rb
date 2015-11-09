class AddUsersToEvents < ActiveRecord::Migration
  def change
    create_table :events_users do |t|
      t.belongs_to :event
      t.belongs_to :user
    end
  end

  def self.down
    drop_table :users_events
  end
end
