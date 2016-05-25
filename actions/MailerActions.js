import AppDispatcher from '../dispatcher/AppDispatcher';

class MailerActions {
  fetchInbox() {
    AppDispatcher.dispatch({
      type: 'FETCH_INBOX'
    });
  }

  open(message) {
    AppDispatcher.dispatch({
      type: 'OPEN_MESSAGE',
      id: message.id
    });
  }

  close() {
    AppDispatcher.dispatch({
      type: 'CLOSE_MESSAGE'
    });
  }
}

export default new MailerActions()
