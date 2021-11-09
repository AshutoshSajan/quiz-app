import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ user, handleLogout }) {
  const [toolTip, setTooltip] = useState(false);

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
      style={{ position: "fixed", width: "100%", top: "0" }}
    >
      <div className="navbar-brand">
        <h1
          className="navbar-item"
          style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          <Link to="/" style={{ color: "#fff" }}>
            QUIZ APP
          </Link>
        </h1>
      </div>

      {user && user.user && user.user.isAdmin ? (
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Play Game
            </Link>
            <Link to="/quizzes/list-quiz" className="navbar-item">
              List Quiz
            </Link>
            <Link to="/quizzes/create-quiz" className="navbar-item">
              Create Quiz
            </Link>
          </div>
        </div>
      ) : user && user.user && !user.user.isAdmin ? (
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Play Game
            </Link>

            <Link to="/quizzes/list-quiz" className="navbar-item">
              List Quiz
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!user || !user.user ? (
              <>
                <Link to="/users/register" className="button is-primary">
                  <strong>Sign up</strong>
                </Link>

                <Link to="/users/login" className="button is-primary is-light">
                  Log in
                </Link>
              </>
            ) : (
              <>
                <button className="button is-light">
                  <Link to="/users/score">
                    <strong style={{ fontWeight: "bold", fontSize: "24px" }}>
                      Show score
                    </strong>
                  </Link>
                </button>

                <button className="button is-light">
                  <strong style={{ fontWeight: "bold", fontSize: "24px" }}>
                    Score : {user && user.user ? user.currentScore : 0}
                  </strong>
                </button>

                <Link
                  to="/users/register"
                  className="button is-primary"
                  onClick={handleLogout}
                >
                  <strong>Log out</strong>
                </Link>

                <button
                  className={`button ${
                    toolTip ? "is-danger" : "is-warning"
                  } is-rounded`}
                  onMouseEnter={() => setTooltip(true)}
                  onMouseLeave={() => setTooltip(!true)}
                >
                  <strong>
                    {toolTip && user && user.user && user.user.isAdmin
                      ? "Admin user"
                      : toolTip && user && user.user && !user.user.isAdmin
                      ? "User"
                      : user && user.user
                      ? user.user.name
                      : ""}
                  </strong>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
