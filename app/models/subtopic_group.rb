class SubtopicGroup < ActiveRecord::Base
  validates_presence_of :votes, :board

  belongs_to :board
end
