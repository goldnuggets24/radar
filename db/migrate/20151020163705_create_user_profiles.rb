class CreateUserProfiles < ActiveRecord::Migration
  def change
  	create_table(:user_profiles) do |t|
      t.integer :user_id
  		t.string :sex
  		t.datetime :dob
  		t.integer :mobile
  		t.string :ethnicity
  		t.string :height
  		t.integer :weight
  		t.string :t_shirt_size
  		t.string :dress_size
  		t.string :chest
  		t.string :cup_size
  		t.string :hip
  		t.string :waist
  		t.string :shoe_size
  		t.string :eye_color
  		t.string :hair_color
  		t.string :hair_length
  		t.string :tattoes
  		t.string :address
  		t.string :unit
  		t.string :city
  		t.string :state
  		t.integer :zip_code
      t.integer :created_by_id
      t.integer :updated_by_id

      t.timestamps
  	end

    add_index :user_profiles, :user_id
    add_index :user_profiles, :created_by_id
    add_index :user_profiles, :updated_by_id
  end
end
