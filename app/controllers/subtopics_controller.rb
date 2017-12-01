class SubtopicsController < ApplicationController
  before_action :authenticate_user!

  def vote
    subtopic_id = params[:id]
    subtopic = Subtopic.find(subtopic_id)
    subtopic_group = subtopic.subtopic_group
    subtopic_group.update!(votes: subtopic_group.votes + 1)

    ActionCable.server.broadcast('messages', votes: subtopic_group.votes)

    head :no_content
  end

  def create
    respond_to do |format|
      format.json do
        subtopic_group = SubtopicGroup.create!(votes: 0, board_id: params.require(:board_id))
        subtopic = Subtopic.new(create_subtopic_params.merge(subtopic_group: subtopic_group))
        result = {}
        status = :ok
        if subtopic.save
          result[:subtopic] = subtopic.as_json
        else
          status = :unprocessable_entity
          p subtopic.errors
          result[:errors] = subtopic.errors.to_h
        end
        render json: result, status: status
      end
    end
  end

  private

  def create_subtopic_params
    params.require(:subtopic).permit(:description).merge(submitted_by: current_user)
  end
end
