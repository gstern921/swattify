import React from "react";
import { connect } from "react-redux";
import { logout } from "../../entities/user/user.actions";

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  render() {
    
    return (
      <button onClick={this.handleLogout} className="logout-btn">
        Log Out
      </button>
    );
  }
}

export default connect()(LogoutButton);
