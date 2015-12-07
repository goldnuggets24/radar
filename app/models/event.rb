class Event < ActiveRecord::Base
	has_and_belongs_to_many :users
	has_many :shifts
	default_scope { order('date ASC') }

	attr_accessor :manager, :region, :client, :location, :start_date, :startDate
end
