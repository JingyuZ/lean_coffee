class SubtopicsController < ApplicationController
  before_action :authenticate_user!

  def vote
    subtopic_id = params[:id]
    subtopic = Subtopic.find(subtopic_id)
    subtopic_group = subtopic.subtopic_group
    subtopic_group.update!(votes: subtopic_group.votes + 1)

    head :no_content
  end
end
