import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Header = ({ alert }) => {
  return (
    <>
      <a href="/" className="logo">
        notes app
      </a>
      {alert ? (
        <Alert className="alert-message" variant="primary">
          {alert}
        </Alert>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { alert } = state.notes;
  return {
    alert,
  };
};

export default connect(mapStateToProps, null)(Header);
