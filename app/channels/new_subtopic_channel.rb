class NewSubtopicChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'new_subtopic'
  end
end
