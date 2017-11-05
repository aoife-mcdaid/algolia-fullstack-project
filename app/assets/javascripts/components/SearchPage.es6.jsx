class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      results: props.movies,
      nbPages: null,
      currentPage: null
    }
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    e.preventDefault();
    const text = this.input.value;
    const client = algoliasearch('2Z8R6W7EZ5', '0964bd4385533bac4d63209e7a13cf30');
    const index = client.initIndex('Movie');
    index.search(text, {
      hitsPerPage: 10,
      page: 0
    })
      .then((content) => {
        this.setState({
          searchText: this.input.value,
          results: content.hits,
          nbPages: content.nbPages,
          currentPage: content.page
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handlePageClick(pageNumber) {
    const searchText = this.state.searchText;
    const client = algoliasearch('2Z8R6W7EZ5', '0964bd4385533bac4d63209e7a13cf30');
    const index = client.initIndex('Movie');
    index.search(searchText, {
      hitsPerPage: 10,
      page: pageNumber
    })
      .then((content) => {
        this.setState({
          searchText: this.input.value,
          results: content.hits,
          nbPages: content.nbPages,
          currentPage: pageNumber
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return(
      <div className="search-page-container">
        <div className="search-header-bar">
          <div className="search-area-container">
            <img src={this.props.algoliaImage}/>
            <form onSubmit={this.handleSearch} action="">
              <input
                id="search"
                ref={el => this.input = el}
                type="text"
                onChange={this.handleSearch}
              />
              <input
                className="brand-button submit-button"
                type="submit"
                value="Search"
              />
            </form>
          </div>
          <a href={this.props.newMovieLink}>
            <button className="brand-button">Add a new movie</button>
          </a>
        </div>
        <div className="results-container">
          {this.state.results.map((movie) => {
            return <MovieResult key={movie.objectID} movie={movie}/>
          })}
          <div className="results-pagination">
            {this.state.nbPages > 1 &&
              <div>
                {_(this.state.nbPages).times((i) => {
                  return (
                    <span
                      key={i}
                      className={classNames(
                        "page-number",
                        {"selected": i === this.state.currentPage}
                      )}
                      onClick={() => this.handlePageClick(i)}
                    >
                      {i + 1}
                    </span>
                  )
                })}
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}
