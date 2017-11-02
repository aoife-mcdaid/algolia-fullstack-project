class MovieResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.handleMovieDelete = this.handleMovieDelete.bind(this);
  }

  mouseOver() {
    this.setState({hover: true});
  }

  mouseOut() {
    this.setState({hover: false});
  }

  handleMovieDelete() {
    const movieId = this.props.movie.objectID
    const deleteUrl = `/movies/${movieId}`
    $.ajax({
      type: "DELETE",
      url: deleteUrl,
      dataType: "json"
    })
  }

  render() {
    const movie = this.props.movie;
    return (
      <div
        key={movie.objectID}
        className="movie-container"
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
      >
        <div className="movie-inner-container">
          <img src={movie.image} alt={movie.title}/>
          <div className="movie-details">
            <div className="movie-detail-row">
              <span className="movie-title">{movie.title}</span>
              <span className="movie-stars">
                {_(movie.rating).times((i) => {
                  return (
                    <span key={i} className="movie-star">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                  )
                })}
              </span>
            </div>
            <div className="movie-detail-row movie-year">{movie.year}</div>
            <div className="movie-detail-row">{movie.genre.map((genre, i) => {
              return <span key={i} className="movie-genre">{genre}</span>
            })}</div>
          </div>
        </div>
        <button onClick={this.handleMovieDelete} className={classNames(
          "brand-button warning-button",
          {"hide": !this.state.hover}
        )}>
          Delete
        </button>
      </div>
    )
  }
}
