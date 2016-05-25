import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

let _messages = [];

const CHANGE_EVENT = 'change';
class MessagesStore extends EventEmitter {
  constructor() {
    super();
    AppDispatcher.register( action => {
      switch (action.type) {
        case 'FETCH_INBOX':
          return setTimeout( () => {
            _messages = [
              {id: 1, from: 'Alice', subject: 'Hello!', date: '2016.05.25'},
              {id: 2, from: 'Bob', subject: 'World!', date: '2016.05.27'},
            ];
            this.emitChange()
          }, 1000);
        default:
          return false;
      }
    });
  }

  getAll() {
    return _messages;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

}

export default new MessagesStore();
