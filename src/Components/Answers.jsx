import React, { Fragment } from "react";

function Answers(props) {
    const number = props.currentNum;
    const multiple = props.multiple;
    const selections = props.selections;
    const answers = Object.entries(props.currentQAnswers);

  return (
    <Fragment>
        <p className="instruction">{multiple ? "Select all that apply." :"Select one."}</p>
        {
            answers.map(a => {
                return (
                  <Fragment key={a[0]}>
                    <input
                      id={a[0]}
                      value={a[0]}
                      className="visuallyhidden"
                      name={`Question ${number}`}
                      onClick={props.click}
                      type={multiple ? "checkbox" : "radio"}
                    />
                    <label
                      htmlFor={a[0]}
                      onClick={props.click}
                      data-question-number={number}
                    //   data-selected={multiple === "true" ? (props.selections.indexOf(a[0]) !== -1 ? "true" : "false") : (props.selections === a[0] ? "true" : "false")}
                      data-selected="false"
                    >
                      {a[1]}
                    </label>
                  </Fragment>
                );
            })
        }
    </Fragment>
  );
}

export default Answers;