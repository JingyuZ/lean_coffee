class AddDescriptionToBoards < ActiveRecord::Migration[5.1]
  def change
    add_column :boards, :description, :string, null: true
  end
end
