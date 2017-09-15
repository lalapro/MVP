import React from 'react';
import AppView from './AppView'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuery: 'enter here',
      currentSubreddit: '',
      firstClick: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.setBlank = this.setBlank.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      currentQuery: e.target.value
    })
  }

  handleSubmit(e) {
    this.props.search(this.state.currentQuery, (data) => {
      console.log(data)
    });
    this.setState({
      currentSubreddit: this.state.currentQuery
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.currentQuery}
              onChange={this.handleChange}
              onClick={this.setBlank}/>
            </label>
          <input type="submit" value="Submit" />
        </form>
        <AppView subreddit={this.state.currentSubreddit} />
      </div>
    );
  }
}

export default App;
