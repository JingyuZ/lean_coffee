class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.html {}
      format.json do
        render json: { boards: Board.all }
      end
    end
  end

  def show
    respond_to do |format|
      format.html { @board_id = params[:id] }
      format.json do
        board = Board.includes(subtopic_groups: :subtopics).find(params[:id])
        render json: board
      end
    end
  end
end
