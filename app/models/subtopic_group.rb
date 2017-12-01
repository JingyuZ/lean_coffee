class SubtopicGroup < ActiveRecord::Base
  validates_presence_of :votes, :board

  belongs_to :board
  has_many :subtopics

  def as_json(options = {})
    super(only: [:id, :votes]).merge(subtopics: subtopics.as_json)
  end
end
