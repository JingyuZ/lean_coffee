class CreateBoards < ActiveRecord::Migration[5.1]
  def change
    create_table :boards do |t|
      t.string :topic, null: false

      t.integer :lock_version, null: false, default: 0
      t.timestamps null: false
    end
  end
end
