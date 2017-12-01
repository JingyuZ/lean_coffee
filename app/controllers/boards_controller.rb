class BoardsController < ApplicationController
  before_action :authenticate_user!

  BOARDS = [
    { id: 1, topic: 'pumpkin pie', description: 'da real mvp', subtopics: [ { id: 1, description: 'Where is the whip cream?' } ] },
    { id: 2, topic: 'coffee mochi', description: 'you can not drink coffee hahaha', subtopics: [{ id: 2, description: 'How long does it take to soften?' }] },
  ].freeze

  def index
    respond_to do |format|
      format.html {}
      format.json do
        render json: { boards: BOARDS }
      end
    end
  end

  def show
    respond_to do |format|
      format.html { @board_id = params[:id] }
      format.json do
        render json: BOARDS.find { |board| board[:id] == params[:id].to_i }
      end
    end
  end
end
