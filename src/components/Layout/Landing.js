import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

function Landing(props) {
  useEffect(() => {
    if (props.security.validToken) {
      props.history.push('/posts');
    }
  }, [props.security.validToken, props.history]);
  return <div>Landing</div>;
}

Landing.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(Landing);
