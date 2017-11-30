class AddSubmittedByToSubtopic < ActiveRecord::Migration[5.1]
  def change
    add_reference :subtopics, :submitted_by, references: :users, null: false
    add_foreign_key :subtopics, :users, column: :submitted_by_id
  end
end
