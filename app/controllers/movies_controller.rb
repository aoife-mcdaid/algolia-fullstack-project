class MoviesController < ApplicationController
  def index
    @algolia_image = ActionController::Base.helpers.asset_path('algolia-logo-light.png')
  end

  def new
    @movie = Movie.new
  end

  def create
    movie = Movie.new(
      title: params[:title],
      year: params[:year],
      rating: params[:rating],
      genre: params[:genre]
    )
    if movie.save
      redirect_to root_path, notice: "#{movie.title} added!"
    else
      redirect_to new_movie_path, alert: "Error: #{movie.title} could not be added"
    end
  end

  def destroy
    movie_id = params["id"].to_i
    movie = Movie.find(movie_id)
    movie.destroy

    redirect_to root_path, notice: "#{movie.title} was successfully deleted", status: 303
  end

end
