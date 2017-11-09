class Pagination extends React.Component {
  render() {
    return (
      <div>
        {_(this.props.nbPages).times((i) => {
          return (
            <span
              key={i}
              className={classNames(
                "page-number",
                {"selected": i === this.props.currentPage}
              )}
              onClick={() => this.props.onPageClick(i)}
            >
              {i + 1}
            </span>
          )
        })}
      </div>
    )
  }
}
