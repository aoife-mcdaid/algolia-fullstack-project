class MovieResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({hover: true});
  }
  mouseOut() {
    this.setState({hover: false});
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
                {_(movie.rating).times(() => {
                  return(
                    <span className="movie-star">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                  )
                })}
              </span>
            </div>
            <div className="movie-detail-row movie-year">{movie.year}</div>
            <div className="movie-detail-row">{movie.genre.map((genre) => {
              return <span className="movie-genre">{genre}</span>
            })}</div>
          </div>
        </div>
        <a href={this.props.deleteMovieUrl}>
          <button className={classNames(
            "brand-button warning-button",
            {"hide": !this.state.hover}
          )}>
            Delete
          </button>
        </a>
      </div>
    )
  }
}
