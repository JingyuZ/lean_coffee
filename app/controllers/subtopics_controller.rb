class SubtopicsController < ApplicationController
  before_action :authenticate_user!

  def vote
    subtopic_id = params[:id]
    subtopic = Subtopic.find(subtopic_id)
    subtopic_group = subtopic.subtopic_group
    subtopic_group.update!(votes: subtopic_group.votes + 1)

    ActionCable.server.broadcast('messages', votes: subtopic_group.votes, id: subtopic_group.id)

    head :no_content
  end

  def change_group
    subtopic_id = params[:id]
    subtopic = Subtopic.find(subtopic_id)
    source_group = subtopic.subtopic_group
    destination_group_id = params[:subtopic_group_id]

    subtopic.update_attributes!(subtopic_group_id: destination_group_id)
    result = { subtopic: subtopic.as_json, source_group_destroyed: false, source_group_id: source_group.id }
    if source_group.reload.subtopics.empty?
      result[:source_group_destroyed] = true
      source_group.destroy!
    end

    render json: result
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
