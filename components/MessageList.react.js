import React from 'react';
import MailerActions from '../actions/MailerActions';
import MessagesStore from '../stores/MessagesStore';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      messages: []
    };
    this.updateMessages = this.updateMessages.bind(this);
  }

  componentDidMount() {
    MessagesStore.addChangeListener(this.updateMessages);
    MailerActions.fetchInbox();
  }

  componentWillUnmount() {
    MessagesStore.removeChangeListener(this.updateMessages);
  }

  updateMessages() {
    this.setState({messages: MessagesStore.getAll(), loading: false});
  }

  render() {
    let messages = this.state.messages.map( (message, i) => {
      return <Message message={message} key={i} />
    })
    let loading = this.state.loading ? <p>loading ...</p> : '';
    let tableStyle = this.state.loading ? {display: 'none'} : {};
    return (
      <div>
        <h2>MessageList</h2>
        <a href="#" onClick={this._onClickReload.bind(this)}>Reload</a>
        {loading}
        <table style={tableStyle}>
          <thead><tr><td>From</td><td>Subject</td><td>Date</td></tr></thead>
          <tbody>{messages}</tbody>
        </table>
      </div>
    )
  }

  _onClickReload(e) {
    e.preventDefault();
    MailerActions.fetchInbox();
    this.setState({loading: true});
  }
}

class Message extends React.Component {
  render() {
    return (
      <tr onClick={this._onClick.bind(this)}>
        <td>{this.props.message.from}</td>
        <td>{this.props.message.subject}</td>
        <td>{this.props.message.date}</td>
      </tr>
    )
  }
  _onClick() {
    MailerActions.open(this.props.message)
  }
}
