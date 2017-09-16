import React from 'react';
import TitleView from './TitleView'


const small = {
  'max-width': '150px',
  'max-height': '150px'
}

const medium = {
  'max-width': '350px',
  'max-height': '350px'
}

const large = {
  'max-width': '550px',
  'max-height': '550px'
}

class Pics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      views: 0,
      score: 0,
      sub: '',
      size: medium
    }

    this.hoverHand = this.hoverHand.bind(this);
    this.handleSize = this.handleSize.bind(this);
  }

  hoverHand() {
    console.log(this.props)
    this.setState({
      title: this.props.title,
      views: this.props.views,
      score: this.props.score,
      sub: this.props.sub
    })
  }

  handleSize(e) {
    console.log(e.target.value)
  }

  render () {
    return (
      <div className="block" onMouseOver={this.hoverHand}>
        <TitleView
          title={this.state.title}
          views={this.state.views}
          score={this.state.score}
          sub={this.state.sub}
        />
        <button onClick={this.handleSize}>small</button>
        <button >medium</button>
        <button >large</button>
        <img
          className="individual"
          src={this.props.pic}
          style={this.state.size}></img>
      </div>
    )
  }
}

export default Pics;
