import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCreateQuiz } from "../actions";
import { BASE_URL } from "../../static";

class CreateQuiz extends Component {
  state = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    category: "",
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleQuestionSubmit = () => {
    const { jwt } = localStorage;
    const { question, option1, option2, option3, option4, answer, category } =
      this.state;

    if (
      jwt &&
      question &&
      option1 &&
      option2 &&
      option3 &&
      option4 &&
      answer &&
      category
    ) {
      const quiz = { ...this.state, answer: answer.toLowerCase() };
      this.props.dispatch(
        handleCreateQuiz(BASE_URL + "/quizzes", jwt, quiz, this.props.history),
      );
    }
  };

  render() {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      category,
      errorMsg,
      successMsg,
    } = this.state;

    return (
      <div style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="notification">
            <label className="label" style={{ textAlign: "center" }}>
              {successMsg || errorMsg || ""}
            </label>
            <div className="field">
              <label className="label">Question</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="question"
                  placeholder="e.g What does ISRO stands for?"
                  required
                  value={question}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="category"
                  placeholder="e.g What does ISRO stands for?"
                  required
                  value={category}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Option 1</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="option1"
                  value={option1}
                  required
                  onChange={this.handleInputChange}
                  placeholder="e.g. Indian Space Reserch Organization"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Option 2</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="option2"
                  value={option2}
                  required
                  onChange={this.handleInputChange}
                  placeholder="e.g. Indian Space Reserch Organization"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Option 3</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="option3"
                  value={option3}
                  required
                  onChange={this.handleInputChange}
                  placeholder="e.g. Indian Space Reserch Organization"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Option 4</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="option4"
                  value={option4}
                  required
                  onChange={this.handleInputChange}
                  placeholder="e.g. Indian Space Reserch Organization"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Answer</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="answer"
                  value={answer}
                  required
                  onChange={this.handleInputChange}
                  placeholder="e.g. option 1"
                />
              </div>
            </div>

            <div className="control">
              <button
                className="button is-primary"
                onClick={this.handleQuestionSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(CreateQuiz);
