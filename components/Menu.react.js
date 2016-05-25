import React from 'react';
import {Link} from 'react-router';

export default class Menu extends React.Component {
  render() {
    return (
      <div>
        <h3>Menu</h3>
        <ul>
          <li><Link to="inbox">Inbox</Link></li>
          <li><Link to="sent">Sent</Link></li>
          <li><Link to="draft">Draft</Link></li>
        </ul>
      </div>
    )
  }
}
