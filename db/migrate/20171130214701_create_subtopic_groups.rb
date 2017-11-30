class CreateSubtopicGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :subtopic_groups do |t|
      t.integer :votes, null: false, default: 0
      t.belongs_to :board, index: true, foreign_key: true

      t.integer :lock_version, null: false, default: 0
      t.timestamps null: false
    end
  end
end
