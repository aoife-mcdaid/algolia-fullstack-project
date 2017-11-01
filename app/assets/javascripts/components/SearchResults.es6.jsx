class SearchResults extends React.Component {
  render() {
    const movies = this.props.movies;
    console.log('movies: ' + movies);
    return (
      <div>
        <h3>Results here:</h3>
        {movies.map((movie) => {
          return(
            <div key={movie.objectID} className="movie-container">
              <img src={movie.image} alt={movie.title}/>
              <div className="movie-details">
                <div className="movie-detail-row">
                  <span className="movie-title">{movie.title}</span>
                  <span className="movie-stars">
                    {_(movie.rating).times(() => {
                      return(
                        <span className="movie-star">
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </span>
                      )
                    })}
                  </span>
                </div>
                <div className="movie-detail-row">{movie.year}</div>
                <div className="movie-detail-row">{movie.genre.map((genre) => {
                  return (
                    <span className="movie-genre">{genre}</span>
                  )
                })}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
