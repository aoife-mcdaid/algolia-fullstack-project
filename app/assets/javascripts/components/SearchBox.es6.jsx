class SearchBox extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSearch} action="">
        <input id="search" type="text" onChange={this.props.onChange} />
        <input className="brand-button submit-button" type="submit"/>
      </form>
    )
  }
}
