class CreateActionItems < ActiveRecord::Migration[5.1]
  def change
    create_table :action_items do |t|
      t.string :description, null: false
      t.date :due_on, null: true
      t.date :completed_on, null: true
      t.belongs_to :board, index: true, foreign_key: true

      t.integer :lock_version, null: false, default: 0
      t.timestamps null: false
    end
  end
end
