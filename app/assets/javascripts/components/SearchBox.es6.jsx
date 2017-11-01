class SearchBox extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSearch} action="">
        <label htmlFor="search">Search Box</label>
        <input id="search" type="text" onChange={this.props.onChange} />
        <input type="submit"/>
      </form>
    )
  }
}
