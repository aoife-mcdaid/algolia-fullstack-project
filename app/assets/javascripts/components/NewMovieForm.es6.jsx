class NewMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      year: '',
      rating: '',
      genre: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
  }

  componentDidMount() {
    this.initRatingStars();
  }

  initRatingStars() {
    const allStars = this.$ratingStars.find('.movie-star');

    $('.movie-star').mouseenter((e) => {
      this.clearStars();

      const currentIndex = $(e.currentTarget).data('index');
      allStars.each((i, star) => {
        if (i <= currentIndex) {
          this.fillStar(star);
        }
      });
    })

    this.$ratingStars.mouseleave(() => {
      this.clearStars();
      if (this.state.rating.length !== 0) {
        allStars.each((i, star) => {
          if (i <= this.state.rating - 1) {
            this.fillStar(star);
          }
        });
      }
    })
  }

  fillStar(star) {
    $(star).find('i').removeClass('fa-star-o').addClass('fa-star');
  }

  clearStars() {
    const allStars = $('.movie-star').toArray();
    allStars.forEach((star) => {
      $(star).find('i').removeClass('fa-star')
      $(star).find('i').addClass('fa-star-o')
    })
  }

  onPlusHover(e) {
    $(e.target).addClass("big-plus");
  }

  offPlusHover(e) {
    $(e.target).removeClass("big-plus");
  }

  handleSubmit(e) {
    const title = this.state.title;
    e.preventDefault();
    $.post({
      url: this.props.createMovieLink,
      data: {
        title: this.state.title,
        year: this.state.year,
        rating: this.state.rating,
        genre: this.state.genre
      }
    })
    this.state = {
      title: '',
      year: '',
      rating: '',
      genre: []
    }
    this.resetForm();
  }

  resetForm() {
    this.titleEl.value = '';
    this.yearEl.value = '';
    this.clearStars();
    this.genreEl.value = '';
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleYearChange(e) {
    this.setState({year: e.target.value});
  }

  handleRatingChange(e, index) {
    const value = index + 1;
    this.setState({rating: value});
  }

  handleGenreChange() {
    let genre;
    if (this.state) {
      genre = this.state.genre;
    } else {
      genre = [];
    }
    const newGenre = this.genreEl.value;
    genre.push(newGenre);
    this.setState({genre: genre});
    this.genreEl.value = '';
  }

  deleteGenre(genre) {
    const oldGenre = this.state.genre;
    const newGenre = oldGenre.filter((currentGenre) => {
      return currentGenre !== genre;
    })
    this.setState({genre: newGenre});
  }

  render() {
    return (
      <div>
        <div className="movie-form-back-link">
          <a href={this.props.homeLink}>Back to Search</a>
        </div>
        <div className="new-movie-form-container">
          <h1 className="new-movie-title">Add a Movie</h1>
          <form className="new-movie-form">
            <div className="form-group">
              <input
                ref={(el) => this.titleEl = el}
                className="form-item"
                type="text"
                name="title"
                placeholder="Movie title"
                onChange={this.handleTitleChange}
              />
              <input
                ref={(el) => this.yearEl = el}
                className="form-item"
                type="number"
                name="year"
                placeholder="Movie year"
                onChange={this.handleYearChange}
              />
              <div
                className="rating-stars form-item"
                ref={(el) => this.$ratingStars = $(el)}
              >
                {_(5).times((i) => {
                  return (
                    <span
                      key={i}
                      data-index={i}
                      className="movie-star"
                      onClick={(e) => this.handleRatingChange(e, i)}
                    >
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="movie-form-second-row">
              <div className="genre-form">
                <div className="genre-input">
                  <input
                    ref={(el) => this.genreEl = el}
                    type="text"
                    className="form-item"
                    placeholder="Add genre"


                  />
                  <i
                    ref={(el) => this.$plusEl = $(el)}
                    onMouseEnter={(e) => this.onPlusHover(e)}
                    onMouseLeave={(e) => this.offPlusHover(e)}
                    onClick={this.handleGenreChange}
                    className="fa fa-plus"
                    aria-hidden="true"
                  >
                  </i>
                </div>
                <div className="genre-list-container">
                  { this.state.genre.length > 0 &&
                    this.state.genre.map((genre, i) => {
                      return (
                        <div key={i} className="genre-list">
                          {genre}
                          <i className="fa fa-trash" onClick={() => this.deleteGenre(genre)} aria-hidden="true"></i>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <input className="submit-button brand-button" defaultValue="Submit" onClick={this.handleSubmit}/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

NewMovieForm.propTypes = {
  movie: PropTypes.object.isRequired,
  createMovieLink: PropTypes.string.isRequired,
  homeLink: PropTypes.string.isRequired
}

