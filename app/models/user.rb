class User < ActiveRecord::Base
  include PgSearch
  paginates_per 1
  # after_create :create_user_profile

  # has_one :user_profile, dependent: :destroy

  enum role: [:user, :vip, :admin]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :user
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  scope :sorted, ->{ order(name: :asc) }
  pg_search_scope :search,
                  against: [
                    :name,
                    :role
                  ],
                  using: {
                    tsearch: {
                      prefix: true,
                      normalization: 2
                    }
                  }
end
