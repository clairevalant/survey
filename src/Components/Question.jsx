import React from 'react';

function Question(props) {
    const multiple = props.multiple;
    const currentNum = props.currentNum;
    const question = props.currentQ.question;
    const instruction = multiple ? " Select all that apply." : " Select one.";

    return (
        <h2 className="question">{currentNum + ". " + question + instruction}</h2>
    );
};

export default Question;