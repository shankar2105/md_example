import * as Action from '../actions/app';

const initialState = {
    message: '',
    error: ''
};

const auth = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case Action.SET_MESSAGE:
      console.log('action.msg', action);
      state = {
        ...state,
        error: '',
        message: action.msg
      };
      break;
      case `${Action.AUTHORISE}_FULFILLED`:
        console.log('authorised');
      break;
      case `${Action.AUTHORISE}_REJECTED`:
        state = {
          ...state,
          error: action.payload
        };
      break;
      case `${Action.CONNECT}_FULFILLED`:
        console.log('Connected');
        state = {
          ...state,
          error: '',
          message: 'Connected'
        };
      break;
      case `${Action.CONNECT}_REJECTED`:
        console.log('Not Connected');
        state = {
          ...state,
          error: 'Unable to connected'
        };
      break;
      case `${Action.CREATE_MD}_FULFILLED`:
        state = {
          ...state,
          error: '',
          message: `Created MD :: ${JSON.stringify(action.payload)}`
        };
      break;
      case `${Action.GET_MD}_FULFILLED`:
        state = {
          ...state,
          error: '',
          message: `MD Stored :: ${JSON.stringify(action.payload)}`
        };
      break;
      case `${Action.DELTE_KEY}_FULFILLED`:
        state = {
          ...state,
          error: '',
          message: 'Deleted Key'
        };
      break;
      case `${Action.CREATE_MD}_REJECTED`:
      case `${Action.GET_MD}_REJECTED`:
      case `${Action.DELTE_KEY}_REJECTED`:
        state = {
          ...state,
          error: `Error :: ${action.payload.message}`,
          message: ''
        };
      break;
  }
  return state;
};

export default auth;
