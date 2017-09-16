import React from 'react';

var TitleView = (props) => (
  <header2>
    <table className="tabs">
      <tr>
        <th>Title:</th>
        <th>{props.title}</th>
      </tr>
      <tr>
        <th>Views:</th>
        <th>{props.views}</th>
      </tr>
      <tr>
        <th>Score:</th>
        <th>{props.score}</th>
      </tr>
      <tr>
        <th>subreddit:</th>
        <th>{props.redditLink}</th>
      </tr>
    </table>
  </header2>
);

export default TitleView;


// import React from 'react';
//
//
// class TitleView extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       currentTitle: this.props.title,
//       currentViews: this.props.views,
//       currentScore: this.props.score,
//       currentSub: this.props.sub
//     }
//
//   }
//
//   render() {
//     return (
//       <header2>
//         <table className="tabs">
//           <tr>
//             <th>Title:</th>
//             <th>{this.props.title}</th>
//           </tr>
//           <tr>
//             <th>Views:</th>
//             <th>{this.state.currentViews}</th>
//           </tr>
//           <tr>
//             <th>Score:</th>
//             <th>{this.state.currentScore}</th>
//           </tr>
//           <tr>
//             <th>Subreddit:</th>
//             <th>{this.state.currentSub}</th>
//           </tr>
//         </table>
//       </header2>
//     )
//   }
// }
//
//
// export default TitleView;
