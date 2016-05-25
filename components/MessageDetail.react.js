import React from 'react';
import MailerActions from '../actions/MailerActions';
import MessageDetailStore from '../stores/MessageDetailStore';

export default class MessageDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: {}, loading: true};
    this.updateMessage = this.updateMessage.bind(this);
  }

  componentDidMount() {
    MessageDetailStore.addChangeListener(this.updateMessage);
  }

  componentWillUnmount() {
    MessageDetailStore.removeChangeListener(this.updateMessage);
  }

  updateMessage() {
    this.setState({message: MessageDetailStore.get(), loading: false});
  }

  render() {
    let loading = this.state.loading ? <p>loading ...</p> : '';
    return (
      <div>
        <h2>MessageDetail</h2>
        <a href="#" onClick={this._onClickBack}>Back</a>
        <div>
          {loading}
          {this.state.message.body}
        </div>
      </div>
    )
  }
  _onClickBack(e) {
    e.preventDefault();
    MailerActions.close();
  }
}
