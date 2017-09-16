import React from 'react';

var TitleView = (props) => (
  <header2>
    <table className="tabs">
      <tbody>
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
          <th>{props.sub}</th>
        </tr>
      </tbody>
    </table>
  </header2>
);

export default TitleView;
