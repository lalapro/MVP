import React from 'react';
import TitleView from './TitleView';
// import Heart from './heart.png'



class Pics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false
    }
    this.hover = this.hover.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  hover() {
    this.props.hoverHand(this.props)
  }

  handleSave() {
    this.props.save(this.props)
    this.setState({
      favorite: !this.state.favorite
    })
  }

  render () {
    var display = this.state.favorite ? null : this.props.pic
    return (
      <div
        className="block"
        onMouseOver={this.hover}
        onClick={this.handleSave}
        >
        <img
          className="individual"
          src={display}
          style={this.props.size}></img>
      </div>
    )
  }
}

export default Pics;
