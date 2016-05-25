import React from 'react';

import MessageList from './MessageList.react';
import MessageDetail from './MessageDetail.react';
import Menu from './Menu.react';

import MessagesStore from '../stores/MessagesStore';
import MessageDetailStore from '../stores/MessageDetailStore';
import MailerActions from '../actions/MailerActions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opendMessage: null,
      main: 'inbox'
    };
  }

  componentDidMount() {

    MessageDetailStore.addChangeListener( () => {
      if (MessageDetailStore.isLoading()) {
        this.setState({main: 'detail'})
      } else if (MessageDetailStore.get() == null) {
        this.setState({main: 'inbox'});
      }
    });

  }

  render() {
    let main;
    switch (this.state.main) {
      case 'detail':
        main = <MessageDetail />
        break;
      default:
        main = <MessageList />
    }

    return (
      <div>
        <h1>Hello!</h1>
        <Menu />
        {main}
      </div>
    )
  }
}
