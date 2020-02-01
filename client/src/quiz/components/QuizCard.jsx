import React from 'react';
import { Link } from 'react-router-dom';

import { FaRegEdit } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';

export default function QuizCard(props) {
  const {
    quiz,
    user,
    handleClick,
    resetCounter,
    isAnswered,
    handleDeleteQuiz,
    submitScore,
    quizCategoryFilter
  } = props;

  return (
    <div className='container'>
      <div className='notification'>
        {quiz ? (
          <div className='container'>
            <div>
              {user && user.isAdmin ? (
                <div
                  className=''
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <Link to={`/quizzes/${quiz._id}/edit`}>
                    <span>
                      <FaRegEdit
                        color='green'
                        fontSize='20px'
                        cursor='pointer'
                      />
                    </span>
                  </Link>

                  <span style={{ marginLeft: '20px' }}>
                    <TiDelete
                      color='red'
                      fontSize='30px'
                      cursor='pointer'
                      onClick={() => handleDeleteQuiz(quiz._id)}
                    />
                  </span>
                </div>
              ) : (
                ''
              )}

              <div className='notification is-link'>
                <h3 className='title is-3'>{quiz.question}</h3>
              </div>
            </div>
            <div
              style={{
                padding: '20px 0'
              }}
            >
              <div
                id={quiz._id}
                style={isAnswered ? { pointerEvents: 'none' } : {}}
                className={`btn notification is-primary ${
                  isAnswered && 'option1' === quiz.answer
                    ? 'is-success'
                    : isAnswered && 'option1' !== quiz.answer
                    ? 'is-danger'
                    : ''
                }`}
                onClick={() => handleClick('option1', quiz)}
              >
                <h4 className='title is-5'>{quiz.option1}</h4>
              </div>
              <div
                id={quiz._id}
                className={`btn notification is-primary ${
                  isAnswered && 'option2' === quiz.answer
                    ? 'is-success'
                    : isAnswered && 'option2' !== quiz.answer
                    ? 'is-danger'
                    : ''
                }`}
                style={isAnswered ? { pointerEvents: 'none' } : {}}
                onClick={() => handleClick('option2', quiz)}
              >
                <h4 className='title is-5'>{quiz.option2}</h4>
              </div>
              <div
                id={quiz._id}
                className={`btn notification is-primary ${
                  isAnswered && 'option3' === quiz.answer
                    ? 'is-success'
                    : isAnswered && 'option3' !== quiz.answer
                    ? 'is-danger'
                    : ''
                }`}
                style={isAnswered ? { pointerEvents: 'none' } : {}}
                onClick={() => handleClick('option3', quiz)}
              >
                <h4 className='title is-5'>{quiz.option3}</h4>
              </div>
              <div
                id={quiz._id}
                className={`btn notification is-primary ${
                  isAnswered && 'option4' === quiz.answer
                    ? 'is-success'
                    : isAnswered && 'option4' !== quiz.answer
                    ? 'is-danger'
                    : ''
                }`}
                style={isAnswered ? { pointerEvents: 'none' } : {}}
                onClick={() => handleClick('option4', quiz)}
              >
                <h4 className='title is-5'>{quiz.option4}</h4>
              </div>
            </div>
          </div>
        ) : (
          <div className='container'>
            <div className='notification is-danger is-light'>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <button className='button is-text'>
                  <h3 className='title is-3'>Quiz end...!</h3>
                </button>
                <div>
                  <button
                    className='button is-warning'
                    onClick={() => {
                      submitScore();
                    }}
                  >
                    Submit score
                  </button>
                  <span style={{ margin: '0 20px' }}></span>
                  <button className='button is-light' onClick={resetCounter}>
                    Play again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
