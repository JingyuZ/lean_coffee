class Subtopic < ActiveRecord::Base
  validates_presence_of :description, :subtopic_group

  belongs_to :subtopic_group
  belongs_to :submitted_by, class_name: 'User'

  def as_json(options = {})
    super(only: [:id, :description, :subtopic_group_id])
  end
end
