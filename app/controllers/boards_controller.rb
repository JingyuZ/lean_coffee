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

  def create
    respond_to do |format|
      format.json do
        board = Board.new(create_board_params)
        result = {}
        status = :ok
        if board.save
          result[:board] = board.as_json
        else
          status = :unprocessable_entity
          result[:errors] = board.errors.to_h
        end
        render json: result, status: status
      end
    end
  end

  def update
    respond_to do |format|
      format.json do
        board = Board.find(params[:id])
        board.assign_attributes(update_board_params)
        status =
          if board.save
            :ok
          else
            :unprocessable_entity
          end

        render json: { board: board.as_json }, status: status
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        Board.find(params[:id]).destroy!
        head :no_content
      end
    end
  end

  private

  def create_board_params
    params.require(:board).permit(:topic, :description)
  end

  def update_board_params
    params.require(:board).permit(:topic, :description)
  end
end
