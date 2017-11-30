class Subtopic < ActiveRecord::Base
  validates_presence_of :description, :subtopic_group

  belongs_to :subtopic_group
end
