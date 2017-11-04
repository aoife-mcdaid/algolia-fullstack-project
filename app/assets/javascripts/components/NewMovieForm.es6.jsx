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
    const allStars = $('.movie-star').toArray();
    $('.movie-star').hover(function() {
      const currentIndex = $(this).data('index');
      allStars.forEach((star) => {
        $(star).find('i').removeClass('fa-star')
        $(star).find('i').addClass('fa-star-o')
      })
      for (i = 0; i <= currentIndex; i++ ) {
        $(allStars[i]).find('i').removeClass('fa-star-o');
        $(allStars[i]).find('i').addClass('fa-star');
      }
    })

    $('.rating-stars').mouseleave(() => {
      allStars.forEach((star) => {
        $(star).find('i').removeClass('fa-star')
        $(star).find('i').addClass('fa-star-o')
      })
      if (this.state.rating.length !== 0) {
        for (i = 0; i <= (this.state.rating - 1); i++ ) {
          $(allStars[i]).find('i').removeClass('fa-star-o');
          $(allStars[i]).find('i').addClass('fa-star');
        }
      }
    })
  }

  onPlusHover(e) {
    $(e.target).removeClass("fa-plus");
    $(e.target).addClass("fa-plus-square");
  }

  offPlusHover(e) {
    $(e.target).removeClass("fa-plus-square");
    $(e.target).addClass("fa-plus");
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

  clearStars() {
    const allStars = $('.movie-star').toArray();
    allStars.forEach((star) => {
      $(star).find('i').removeClass('fa-star')
      $(star).find('i').addClass('fa-star-o')
    })
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

  render() {
    return (
      <div>
        <div className="movie-form-back-link">
          <a href={this.props.homeLink}>Back to search</a>
        </div>
        <div className="new-movie-form-container">
          <h1 className="new-movie-title">Add a Movie</h1>
          <form className="new-movie-form" onSubmit={this.handleSubmit}>
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
              <div className="rating-stars form-item">
                {_(5).times((i) => {
                  return (
                    <span
                      key={i}
                      data-index={i}
                      className={`movie-star star-${i}`}
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
                <div>
                  { this.state.genre.length > 0 &&
                    this.state.genre.map((genre) => {
                      return (
                        <div>{genre}</div>
                      )
                    })
                  }
                </div>
              </div>
              <input className="submit-button brand-button" type="submit"/>
            </div>
          </form>
        </div>

      </div>
    )
  }
}

