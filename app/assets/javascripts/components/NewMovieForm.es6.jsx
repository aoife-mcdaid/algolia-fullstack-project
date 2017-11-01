class NewMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      year: '',
      rating: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
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
      if (this.state.rating.length === 0) {
        allStars.forEach((star) => {
          $(star).find('i').removeClass('fa-star')
          $(star).find('i').addClass('fa-star-o')
        })
      } else {
        for (i = 0; i <= (this.state.rating - 1); i++ ) {
          $(allStars[i]).find('i').removeClass('fa-star-o');
          $(allStars[i]).find('i').addClass('fa-star');
        }
      }
    })
  }

  handleSubmit(e) {
    const title = this.state.title;
    e.preventDefault();
    $.post({
      url: this.props.createMovieLink,
      data: {
        title: this.state.title,
        year: this.state.year,
        rating: this.state.rating
      }
    })
    this.state = {
      title: '',
      year: '',
      rating: ''
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
  render() {
    return (
      <div className="form-container">
        <h1>Add a movie</h1>
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
          <input className="submit-button" type="submit"/>
        </form>
      </div>
    )
  }
}

