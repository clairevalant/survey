// Back & Next button navigation
import React from 'react';

function Navigation(props) {
    const currentNum = props.currentNum;
    const numQuestions = props.numQuestions;
    const disableNext = props.disableNext[currentNum];

    return (
      <div className="navigation">
        {/* disable the back button for the first question */}
            {currentNum === 1 ? null :
            <button
                type="button"
                className="back"
                onClick={() => { props.click(-1)}}>Back</button>
            }
        {/* if the current question is the last question, display the Submit button */}
        {currentNum === numQuestions ?
            <input
                id="submit"
                type="submit"
                value="Submit"
                className="submit"
                disabled={disableNext ? true : false} /> :
            <button
                // if the current question is unanswered, disable the next button
                disabled={disableNext ? true : false}
                type="button"
                className="next"
                onClick={() => {props.click(1)}}>Next</button>
        }
      </div>
    );
}

export default Navigation;