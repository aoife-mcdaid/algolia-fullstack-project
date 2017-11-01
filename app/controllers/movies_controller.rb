class MoviesController < ApplicationController
  def index
    @movies = Movie.first(5)
  end

  def show
  end

  def new
    @movie = Movie.new
  end

  def create
    movie = Movie.new(
      title: params[:title],
      year: params[:year],
      rating: params[:rating],
      # genre: params[:genre],
      # actors: params[:actors]
    )
    # binding.pry
    if movie.save
      redirect_to root_path, notice: "Movie added!"
    else
      redirect_to new_movie_path, alert: "Movie not added"
    end

    # if movie.save
    #   render json: { success: true }, code: 200
    # else
    #   render json: { error: "FAIL!"}, status: :unauthorized, notice: "ERROR ADDING"
    # end
  end

  def destroy
  end
end
