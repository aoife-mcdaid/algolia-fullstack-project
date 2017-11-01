class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: props.movies
    }
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    const text = e.target.value;
    const client = algoliasearch('2Z8R6W7EZ5', '0964bd4385533bac4d63209e7a13cf30');
    const index = client.initIndex('Movie');
    index.search(text, { hitsPerPage: 10, page: 0 })
      .then((content) => {
        console.log(content)
        this.setState({results: content.hits})
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
            <SearchBox
              onChange={this.handleSearch}
            />
          </div>
          <a href={this.props.newMovieLink}>
            <button className="brand-button">Add a new movie</button>
          </a>
        </div>
        <div>
          {this.state.results.map((movie) => {
            return <MovieResult movie={movie}/>
          })}
        </div>
      </div>
    )
  }
}
