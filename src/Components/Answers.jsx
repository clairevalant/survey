import React, { Fragment } from "react";

function Answers(props) {
    const multiple = props.multiple;
    const currentNum = props.currentNum;
    const selections = props.selections[currentNum];
    const answers = Object.entries(props.currentQAnswers); // create an array of arrays of the answers so as to map through them

  return (
    <div className="answers">
        {
            answers.map(a => {
                return (
                  <Fragment key={currentNum + a[0]}>
                    <input
                        id={a[0]}
                        value={a[0]}
                        tabIndex="-1"
                        className="visuallyHidden"
                        name={`Question ${currentNum}`}
                        type={multiple ? "checkbox" : "radio"}
                    />
                    <label
                        tabIndex="0"
                        role="button"
                        htmlFor={a[0]}
                        onClick={props.click}
                        // onKeyDown={props.keydown}
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