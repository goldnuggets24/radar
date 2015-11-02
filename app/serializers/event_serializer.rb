class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :description
end
