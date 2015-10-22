class AddColumnsToUsers < ActiveRecord::Migration
  def change
		add_column :users, :sex, :string
		add_column :users, :dob, :datetime
		add_column :users, :mobile, :integer
		add_column :users, :ethnicity, :string
		add_column :users, :height, :string
		add_column :users, :weight, :string
		add_column :users, :t_shirt_size, :string
		add_column :users, :dress_size, :string
		add_column :users, :chest, :string
		add_column :users, :cup_size, :string
		add_column :users, :hip, :string
		add_column :users, :waist, :string
		add_column :users, :shoe_size, :string
		add_column :users, :eye_color, :string
		add_column :users, :hair_color, :string
		add_column :users, :hair_length, :string
		add_column :users, :tattoes, :string
		add_column :users, :address, :string
		add_column :users, :unit, :string
		add_column :users, :city, :string
		add_column :users, :state, :string
		add_column :users, :zip_code, :string
  end
end
