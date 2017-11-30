class CreateSubtopics < ActiveRecord::Migration[5.1]
  def change
    create_table :subtopics do |t|
      t.string :description, null: false
      t.belongs_to :subtopic_group, index: true, foreign_key: true

      t.integer :lock_version, null: false, default: 0
      t.timestamps null: false
    end
  end
end
