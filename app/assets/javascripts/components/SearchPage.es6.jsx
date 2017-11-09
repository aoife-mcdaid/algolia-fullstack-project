class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      results: [],
      nbPages: null,
      currentPage: null
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    const text = this.input.value;
    if (text.length === 0) { return this.setState({ results: [] })}
    const client = algoliasearch(this.props.appId, this.props.searchOnlyApiKey);
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
    const client = algoliasearch(this.props.appId, this.props.searchOnlyApiKey);
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
                placeholder="Search"
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
        { this.state.results.length ?
          <div className="results-container">
            {this.state.results.map((movie) => {
              return <MovieResult key={movie.objectID} movie={movie}/>
            })}
            <div className="results-pagination">
              {this.state.nbPages > 1 &&
                <Pagination
                  nbPages={this.state.nbPages}
                  currentPage={this.state.currentPage}
                  onPageClick={this.handlePageClick}
                />
              }
            </div>
          </div>
        :
          <div className="no-results-text">Start seaching now!</div>
        }
      </div>
    )
  }
}

SearchPage.propTypes = {
  newMovieLink: PropTypes.string.isRequired,
  algoliaImage: PropTypes.string.isRequired
}
