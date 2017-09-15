import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSubreddit: 'enter here',
      firstClick: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.setBlank = this.setBlank.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      currentSubreddit: event.target.value
    })
  }

  handleSubmit() {
    console.log('hello')
  }

  setBlank() {
    if (!this.state.firstClick) {
      this.setState({
        currentSubreddit: ''
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            value={this.state.currentSubreddit}
            onChange={this.handleChange}
            onClick={this.setBlank}/>
        </label>
        <input type="submit" value="Submit" />
        <div>
          <br></br>
          {this.state.currentSubreddit}
        </div>
      </form>
    );
  }
}

export default App;
