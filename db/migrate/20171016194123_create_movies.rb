class CreateMovies < ActiveRecord::Migration[5.0]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :alternative_titles, array: true
      t.integer :year
      t.string :image
      t.string :color
      t.integer :score
      t.integer :rating
      t.string :actors, array: true
      t.string :actor_facets, array: true
      t.string :genre, array: true
      t.string :objectID

      t.timestamps
    end
  end
end
