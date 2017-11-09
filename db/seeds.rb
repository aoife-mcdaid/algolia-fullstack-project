# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# require 'movies.json'


puts "Deleting all movies..."
Movie.delete_all

movies = JSON.parse(File.read('db/movies.json'))

movies.each do |movie|
  puts "Creating movie: #{movie["title"]}"
  movie = Movie.create(
    title: movie["title"],
    alternative_titles: movie["alternative_titles"],
    year: movie["year"],
    image: movie["image"],
    color: movie["color"],
    score: movie["score"],
    rating: movie["rating"],
    actors: movie["actors"],
    actor_facets: movie["actor_facets"],
    genre: movie["genre"],
    objectID: movie["objectID"]
  )
end

