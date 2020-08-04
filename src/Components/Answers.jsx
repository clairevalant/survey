import React, { Fragment } from "react";

function Answers(props) {
    const currentNum = props.currentNum;
    const multiple = props.multiple;
    const selections = props.selections[currentNum];
    const answers = Object.entries(props.currentQAnswers);

  return (
    <div className="answers">
        {
            answers.map(a => {
                return (
                  <Fragment key={a[0]}>
                    <input
                        id={a[0]}
                        value={a[0]}
                        className="visuallyHidden"
                        name={`Question ${currentNum}`}
                        type={multiple ? "checkbox" : "radio"}
                    />
                    <label
                        htmlFor={a[0]}
                        onClick={props.click}
                        className="slightlyRounded"
                        data-question-number={currentNum}
                        data-selected={multiple ?
                                        selections.indexOf(a[0]) >= 0 ? "true" : "false"
                                        : selections === a[0] ? "true" : "false"}

                    >
                      {a[1]}
                    </label>
                  </Fragment>
                );
            })
        }
    </div>
  );
}

export default Answers;