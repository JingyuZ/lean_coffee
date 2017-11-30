class AddAssignedToToActionItems < ActiveRecord::Migration[5.1]
  def change
    add_reference :action_items, :assigned_to, references: :users, null: false
    add_foreign_key :action_items, :users, column: :assigned_to_id
  end
end
