import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ListQuiz from '../../quiz/containers/ListQuiz.jsx';
import CreateQuiz from '../../quiz/components/CreateQuiz.jsx';
import EditQuiz from '../../quiz/components/EditQuiz.jsx';
import PlayQuiz from '../../quiz/components/PlayQuiz.jsx';
import ErrorPage from '../../app/componets/ErrorPage.jsx';
import Score from '../../score/components/Score.jsx';
import ShowPosts from '../../app/componets/ShowPosts.jsx';

export default class AdminRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={PlayQuiz} />
          <Route path="/quizzes/list-quiz" component={ListQuiz} />
          <Route path="/quizzes/create-quiz" component={CreateQuiz} />
          <Route path="/quizzes/:id/edit" component={EditQuiz} />
          <Route path="/users/score" component={Score} />
          <Route path="/posts" component={ShowPosts} />
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}
