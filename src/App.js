import React from 'react';
import Pics from './Pics';
import TitleView from './TitleView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuery: 'enter here',
      currentSubreddit: '',
      currentAlbum: [],
      currentTitle: '',
      currentViews: '',
      currentScore: '',
      firstClick: false,
      gifOnly: false,
      buttonColor: {
        backgroundColor: 'grey'
      },
      size: {maxWidth: '550px',maxHeight: '550px'},
      saves: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.setBlank = this.setBlank.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.gifToggle = this.gifToggle.bind(this);
    this.filter = this.filter.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.hoverHand = this.hoverHand.bind(this);
    this.save = this.save.bind(this);
  }

  hoverHand(pic) {
    this.setState({
      currentTitle: pic.title,
      currentViews: pic.views,
      currentScore: pic.score,
      currentSubreddit: pic.sub
    })
  }

  handleSize(e) {
    var sizes = [{maxWidth: '150px',maxHeight: '150px'},
                 {maxWidth: '350px',maxHeight: '350px'},
                 {maxWidth: '550px',maxHeight: '550px'},
                 {maxWidth: '80%', maxHeight: '80%'}]

    var choice = e.target.innerHTML;
    let newSize;

    if(choice === 'small') {
      newSize = sizes[0];
    } else if (choice === 'medium') {
      newSize = sizes[1];
    } else if (choice === 'large'){
      newSize = sizes[2];
    } else {
      newSize = sizes[3];
    }

    this.setState({
      size: newSize
    })
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

  save(pic) {
    this.state.saves.push(pic)
  }

  download() {
    
  }

  render() {
    return (
      <div>
        <header>TumblrRedditImgurPinterestYoutube
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
                  <button onClick={this.handleSize}>small</button>
                  <button onClick={this.handleSize}>medium</button>
                  <button onClick={this.handleSize}>large</button>
                  <button onClick={this.handleSize}>original</button>

                </form>
                <div className="subReddit">
                  currently browsing ... /r/{this.state.currentSubreddit}
                </div>
                <div>
                  <TitleView
                    title={this.state.currentTitle}
                    views={this.state.currentViews}
                    score={this.state.currentScore}
                    sub={this.state.currentSubreddit}
                  />
                </div>
                <div className ="saves">
                  pictures saved: {this.state.saves.length}
                </div>
                <button className="download" onClick={this.download}>Download</button>
              </div>
        </header>

          <span className="outer">
            {this.state.currentAlbum.map((pic, idx) => {
              return (
                <Pics
                  pic={pic.link}
                  title={pic.title}
                  views={pic.views}
                  score={pic.score}
                  sub={this.state.currentSubreddit}
                  size={this.state.size}
                  key={idx}
                  hoverHand={this.hoverHand}
                  save={this.save}
                />
              )
            })}
          </span>
      </div>
    );
  }
}


export default App;
