class CreateShifts < ActiveRecord::Migration
  def change
    create_table :shifts do |t|
      t.references :user, index: true
      t.references :event, index: true
      t.timestamps null: false
    end
  end
end
