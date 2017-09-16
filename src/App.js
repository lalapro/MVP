import React from 'react';
import Pics from './Pics'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuery: 'enter here',
      currentSubreddit: '',
      currentAlbum: [],
      firstClick: false,
      gifOnly: false,
      buttonColor: {
        backgroundColor: 'grey'
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.setBlank = this.setBlank.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.gifToggle = this.gifToggle.bind(this);
    this.filter = this.filter.bind(this);
  }

  handleChange(e) {
    this.setState({
      currentQuery: e.target.value
    })
  }

  handleFilter(e) {
    this.props.search(this.state.currentQuery, (data) => {
      let filteredData = this.filter(data);
      this.setState({
        currentAlbum: filteredData,
        currentSubreddit: this.state.currentQuery
      })
    })

    e.preventDefault();
  }


  setBlank() {
    if (!this.state.firstClick) {
      this.setState({
        currentQuery: '',
        firstClick: true
      });
    }
  }

  gifToggle() {
    if(this.state.buttonColor.backgroundColor === 'grey') {
      this.setState({
        buttonColor: {
          backgroundColor: 'green'
        }
      })
    } else {
      this.setState({
        buttonColor: {
          backgroundColor: 'grey'
        }
      })
    }
    this.setState({
      gifOnly: !this.state.gifOnly
    })
  }

  filter(data) {
    var filter = data.data.filter((img) => {
      var isAlbum = img.link.includes('.com/a');
      if(img.hasOwnProperty('type')) {
        var isGif = img.type.includes('gif');
      }
      return (this.state.gifOnly) ? !isAlbum && isGif : !isAlbum
    })

    // filter.forEach((img) => {
    //   if(img.title.length > 20) {
    //     img.title = img.title.slice(0,20);
    //     img.title += '...'
    //   }
    // })
    return filter;
  }

  render() {
    return (
      <div>
        <header>SubredditImgur
          <div>Search your subreddit! </div>
          <div className="container">
            <form onSubmit={this.handleFilter}>
              <label>
                <input
                  type="text"
                  value={this.state.currentQuery}
                  onChange={this.handleChange}
                  onClick={this.setBlank}/>
                </label>
                <input
                  type="submit"
                  value="Submit"
                />
                <button
                  type="gifToggle"
                  onClick={this.gifToggle}
                  style={this.state.buttonColor}
                  >
                    GIF ONLY
                  </button>
                </form>
                <div className="subReddit">
                  currently browsing ... /r/{this.state.currentSubreddit}
                </div>
              </div>
        </header>

          <p className="outer">
            {this.state.currentAlbum.map((pic, idx) => {
              return (
                <Pics
                  pic={pic.link}
                  title={pic.title}
                  views={pic.views}
                  score={pic.score}
                  sub={this.state.currentSubreddit}
                  index={idx}
                />
              )
            })}
          </p>
      </div>
    );
  }
}


export default App;
