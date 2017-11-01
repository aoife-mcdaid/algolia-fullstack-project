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
      <div>
        <div>
          <SearchBox
            onChange={this.handleSearch}
          />
          <a href={this.props.newMovieLink}>Create a new movie</a>
        </div>
        <SearchResults
          movies={this.state.results}
        />
      </div>
    )
  }
}



// import {InstantSearch, SearchBox, Hits} from 'react-instantsearch/dom';

// function Search() {
//   return (
//     <div className="container">
//       <Hits />
//     </div>
//   );
// }

// class App extends React.Component {
//   render() {
//     return (
//       <InstantSearch
//         appId="2Z8R6W7EZ5"
//         apiKey="d297d1d451a887a971514b14f221ee84"
//         indexName="Movie"
//       >
//         <Search/>
//       </InstantSearch>

//     )
//   }

// }


// class SearchPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       results: []
//     }
//   }
//   handleClick(title) {
//     console.log(`This will delete a movie from database`);
//   }
//   handleSearch(e) {
//     e.preventDefault();
//     let text = $('input#search').val();

//     var client = algoliasearch('2Z8R6W7EZ5', '0964bd4385533bac4d63209e7a13cf30');
//     var index = client.initIndex('Movie');
//     index.search(text, { hitsPerPage: 10, page: 0 })
//       .then(function searchDone(content) {
//         console.log(content.hits)
//         // this.setState({results: content})
//       })
//       .catch(function searchFailure(err) {
//         console.error(err);
//       });

//   }

//   search() {
//     return (
//       <div className="container">
//         <Hits />
//       </div>
//     );
//   }
//   render() {
//     return(
//       <div>
//         <InstantSearch
//           appId="2Z8R6W7EZ5"
//           apiKey="d297d1d451a887a971514b14f221ee84"
//           indexName="Movie"
//         >
//           {this.search}
//         </InstantSearch>
//       </div>
//     )
//   }
// }

// class Hits extends React.Component {
//   render() {
//     return(
//       <h1>Hello</h1>
//     )
//   }
// }


// // const App = () =>
// //   <InstantSearch
// //     appId="latency"
// //     apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
// //     indexName="bestbuy"
// //   >
// //     {/* Search widgets will go there */}
// //   </InstantSearch>


// class SearchBox extends React.Component {
//   render() {
//     return (
//       <form onSubmit={this.props.onSearch} action="">
//         <label htmlFor="search">Search Box</label>
//         <input id="search" type="text"/>
//         <input type="submit"/>
//       </form>
//     )
//   }
// }


// class SearchResults extends React.Component {
//   render() {
//     let movies = this.props.movies;
//     return (
//       <div>
//         <h3>Results here:</h3>
//         { movies.map((movie) => {
//           return(
//             <div key={movie.objectID}>
//               <span>{movie.title}</span>
//               <span
//                 style={{paddingLeft: '3px', color: 'red'}}
//                 onClick={this.props.onClick}
//               >Delete</span>
//             </div>
//           )
//         })}
//       </div>
//     )
//   }
// }
