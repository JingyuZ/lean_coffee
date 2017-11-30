class ActionItem < ActiveRecord::Base
  validates_presence_of :description, :board
  validates_date :due_on, allow_nil: true
  validates_date :completed_on, allow_nil: true

  belongs_to :board
end
