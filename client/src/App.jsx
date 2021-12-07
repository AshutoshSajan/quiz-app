import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./app/componets/Header.jsx";
import AdminRoutes from "./admin/components/AdminRoutes.jsx";
import UserRoutes from "./user/components/UserRoutes.jsx";
import PublicRoutes from "./app/componets/PublicRoutes.jsx";
import { handleAutoLogin } from "./user/actions";
import { BASE_URL } from "./static";

class App extends Component {
  state = {};

  componentDidMount = () => {
    const { jwt } = localStorage;

    if (jwt) {
      this.props.dispatch(
        handleAutoLogin(BASE_URL + "/users/me", jwt, this.props.history),
      );
    } else if (!jwt) {
      this.props.history.push("/users/login");
    }
  };

  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    const { user } = this.props;

    return (
      <div className="app" style={{ marginTop: "60px" }}>
        <Header user={user} handleLogout={this.handleLogout} />
        {!user.user ? <PublicRoutes /> : ""}

        {user && user.user && user.user.isAdmin ? (
          <AdminRoutes />
        ) : user && user.user && !user.user.isAdmin ? (
          <UserRoutes />
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(App));
