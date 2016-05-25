import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

let _message = null;
let _isLoading = false;

const CHANGE_EVENT = 'change';
class MessageDetailStore extends EventEmitter {
  constructor() {
    super();
    AppDispatcher.register( action => {
      switch (action.type) {
        case 'OPEN_MESSAGE':
          _isLoading = true;
          this.emitChange();
          setTimeout( () => {
            _message = {body: 'hello-'+(new Date().getTime())};
            _isLoading = false;
            this.emitChange();
          }, 1000);
          break;

        case 'CLOSE_MESSAGE':
          _message = null;
          this.emitChange();
          break;

        default:
          return false;
      }
    });
  }

  get() {
    return _message;
  }

  isLoading() {
    return _isLoading;
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

export default new MessageDetailStore();
