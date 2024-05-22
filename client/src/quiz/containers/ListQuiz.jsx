import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuizCard from '../components/QuizCard.jsx';
import { handleFetchQuizzes, handleUpdateScore, deleteQuiz } from '../actions';

class ListQuiz extends Component {
  state = {
    seletedCategory: 'all',
    filteredQuiz: [],
    counter: 0,
    score: 0,
    isAnswered: false,
  };

  componentDidMount = () => {
    const { jwt } = localStorage;

    if (jwt) {
      this.props.dispatch(handleFetchQuizzes('/api/v1/quizzes', jwt));
    }
  };

  handleClick = (option, quiz) => {
    if (option === quiz.answer) {
      this.setState(
        (state) => {
          return {
            score: state.score + 1,
          };
        },
        () => {
          this.props.dispatch({
            type: 'UPDATE_CURRENT_SCORE',
            payload: this.state.score,
          });

          let div = document.getElementById(quiz._id);
          if (div) div.style.pointerEvents = 'none';

          this.handleScroll();
          setTimeout(() => {
            let elm = document.getElementById(option);
            if (elm) elm.classList.remove('is-danger');
          }, 300);
        },
      );
    } else {
      if (quiz && quiz._id) {
        let div = document.getElementById(quiz._id);
        if (div) div.style.pointerEvents = 'none';
      }
      this.handleScroll();
      return null;
    }
  };

  updateUserScore = (score, jwt) => {
    this.props.dispatch(
      handleUpdateScore('/api/v1/users/score/update', jwt, score),
    );
  };

  handleDeleteQuiz = (id) => {
    const { jwt } = localStorage;
    this.props.dispatch(
      deleteQuiz(`/api/v1/quizzes/${id}/delete`, jwt, id, this.props.history),
    );
  };

  quizCategoryFilter = (category, id) => {
    if (!category || category === 'all') {
      this.setState({ filteredQuiz: [] });
    } else {
      this.setState(
        (state) => ({ seletedCategory: category, score: 0 }),
        () => {
          this.setState({
            filteredQuiz: this.props.quiz.quiz.filter(
              (quiz) => quiz.category === category,
            ),
          });
          this.props.dispatch({
            type: 'UPDATE_CURRENT_SCORE',
            payload: this.state.score,
          });
        },
      );
    }
  };

  resetCounter = () => {
    this.setState({ counter: 0, score: 0 }, () => {
      this.props.dispatch({
        type: 'UPDATE_CURRENT_SCORE',
        payload: this.state.score,
      });
    });
  };

  handleSubmitScore = () => {
    const { jwt } = localStorage;
    const { score, seletedCategory } = this.state;
    if (score) {
      this.updateUserScore({ score, category: seletedCategory }, jwt);
      this.resetCounter();
      window.scroll('scrollY', 0);
    }
  };

  handleScroll = () => {
    var height = document.querySelector('.notification').clientHeight;
    window.scroll('scrollY', window.scrollY + height + 40);
  };

  footer = () => {
    return (
      <div className="notification">
        <div className="container">
          <div className="notification is-light is-success">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button className="button is-text">
                <h3 className="title is-3">Quiz end...!</h3>
              </button>
              <div>
                <button
                  className="button is-warning"
                  onClick={() => {
                    this.handleSubmitScore();
                  }}
                >
                  Submit score
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { quiz, user } = this.props;
    const { filteredQuiz, isAnswered } = this.state;

    return (
      <div
        className=""
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <aside style={{ padding: '30px' }}>
          <ul>
            {quiz && quiz.category
              ? quiz.category.map((val) => {
                  return (
                    <li
                      key={val}
                      className="title is-5"
                      style={{ cursor: 'pointer', textTransform: 'capitalize' }}
                      onClick={() => this.quizCategoryFilter(val)}
                    >
                      {val}
                    </li>
                  );
                })
              : ''}
          </ul>
        </aside>
        <div className="container">
          {filteredQuiz && filteredQuiz.length
            ? filteredQuiz.map((quiz, index) => {
                return (
                  <div className="container" key={index}>
                    <div className="container">
                      <div style={{ margin: '40px 0' }}>
                        <QuizCard
                          quiz={quiz}
                          handleClick={this.handleClick}
                          user={user.user}
                          handleDeleteQuiz={this.handleDeleteQuiz}
                          resetCounter={this.resetCounter}
                          isAnswered={isAnswered}
                          quizCategoryFilter={this.quizCategoryFilter}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            : quiz && quiz.quiz && user && user.user
            ? quiz.quiz.map((question, index) => {
                return (
                  <div className="container" key={index}>
                    <div style={{ margin: '40px 0' }}>
                      <QuizCard
                        quiz={question}
                        handleClick={this.handleClick}
                        user={user.user}
                        handleDeleteQuiz={this.handleDeleteQuiz}
                        resetCounter={this.resetCounter}
                        isAnswered={isAnswered}
                        quizCategoryFilter={this.quizCategoryFilter}
                      />
                    </div>
                  </div>
                );
              })
            : 'no quiz found...'}
          {this.footer()}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ListQuiz);
