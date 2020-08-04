import React from 'react';

function Question(props) {
    const instruction = props.multiple ? " Select all that apply." : " Select one.";

    return (
        <h2 className="question">{props.currentNum + ". " + props.currentQ.question + instruction}</h2>
    );
};

export default Question;