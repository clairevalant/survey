import React from 'react';

function Question(props) {

    return (
        <h2>{props.currentNum + ". " + props.currentQ.question}</h2>
    );
};

export default Question;