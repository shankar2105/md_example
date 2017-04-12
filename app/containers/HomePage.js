// @flow

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../components/Home';
import * as AppActions from '../actions/app';

const mapStateToProps = (state) => {
  return {
    message: state.app.message,
    error: state.app.error
  };
};

const mapActionsToProps = (dispatch) => {
  return bindActionCreators(AppActions, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
