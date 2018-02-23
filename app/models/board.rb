class Board < ActiveRecord::Base
  validates_presence_of :topic

  has_many :subtopic_groups, dependent: :destroy

  def as_json(options = {})
    super(only: [:id, :topic, :description], methods: [:error_messages]).merge(subtopic_groups: subtopic_groups.as_json)
  end

  private

  def error_messages
    errors.messages
  end
end
