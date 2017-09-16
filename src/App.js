import React from 'react';
import Pics from './Pics';
import TitleView from './TitleView';
import GameView from './GameView';
import axios from 'axios';
import Helpers from './Helpers';


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
      currentPics: 0,
      firstClick: false,
      gifOnly: false,
      buttonColor: {
        backgroundColor: 'grey'
      },
      size: {maxWidth: '550px',maxHeight: '550px'},
      saves: [],
      gameSubReddit: [],
      gameState: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.setBlank = this.setBlank.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.gifToggle = this.gifToggle.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.hoverHand = this.hoverHand.bind(this);
    this.save = this.save.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.downloadImages = this.downloadImages.bind(this);
    this.game = this.game.bind(this);
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
    if (this.state.currentQuery !== 'enter here') {
      this.props.search(this.state.currentQuery, (data) => {
        let filteredData = Helpers.filter(data, this.state.gifOnly);
        console.log(filteredData)
        this.setState({
          currentAlbum: filteredData,
          currentSubreddit: this.state.currentQuery
        });
      });
    }
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

  save(pic) {
    if(this.state.gameState) {
      let scores = this.state.currentAlbum.map((pic) => {
        return pic.score
      }).sort();
      if (pic.score !== scores[0]) {
        this.setState({
          currentAlbum: [{
            link: 'https://media.giphy.com/media/EndO2bvE3adMc/giphy.gif'
          }]
        })
      } else {
        this.setState({
          currentAlbum: [{
            link: 'https://media.giphy.com/media/XGUrip9FockVy/giphy.gif'
          }]
        })
      }
    } else {
      this.state.saves.push(pic)
    }

  }

  uploadImages() {
    axios.post('/downloads', {
      pics: this.state.saves
    })
    this.setState({
      saves: []
    })
    console.log('saves', this.state.saves)
  }

  downloadImages() {
    axios.get('/database')
      .then((album) => {
        // console.log(album)
        this.setState({
          currentAlbum: album.data,
          currentSubreddit: 'My Albums'
        })
      })
  }

  game() {
    if(this.state.currentAlbum.length > 0) {

      var gameAlbum = [];
      let pic1 = this.state.currentAlbum[Helpers.randomNum(0,this.state.currentAlbum.length)]
      let pic2 = this.state.currentAlbum[Helpers.randomNum(0,this.state.currentAlbum.length)]

      pic1 === pic2 ? this.game() :
      gameAlbum.push(pic1, pic2);
      this.setState({
        currentAlbum: gameAlbum,
        gameState: true
      })
    }
  }


  render() {
    return (
      <div>
        <header>
          <div className="subReddit">
            currently browsing ... /r/{this.state.currentSubreddit}
          </div>
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
                <div className="gif">
                  <button
                    type="gifToggle"
                    onClick={this.gifToggle}
                    style={this.state.buttonColor}
                    >
                      GIF ONLY
                    </button>
                </div>
                <div className="imgSize">
                  <button onClick={this.handleSize}>small</button>
                  <button onClick={this.handleSize}>medium</button>
                  <button onClick={this.handleSize}>large</button>
                  <button onClick={this.handleSize}>original</button>
                </div>

            </form>
              <div>
                <TitleView
                  title={this.state.currentTitle}
                  views={this.state.currentViews}
                  score={this.state.currentScore}
                  sub={this.state.currentSubreddit}
                />
              </div>
              <div className ="saves">
                pics saved: {this.state.saves.length}
              </div>
              <div className ="left">
                pics in browser: {this.state.currentAlbum.length - this.state.saves.length}
              </div>
              <div>
                <button className="download" onClick={this.uploadImages}>Upload Images</button>
              </div>
              <div>
                <button className="download" onClick={this.downloadImages}>Get My Pics</button>
              </div>
              <div>
                <button className="gamify" onClick={this.game}>GAME</button>
              </div>
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
                    gameState={this.state.gameState}
                  />
                )
            })}
          </span>
      </div>
    );
  }
}


export default App;
