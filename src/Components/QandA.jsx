// Question and Answers
// separate out question and answers into individual components?
import React, {useState, useEffect} from 'react';
import firebase from '../firebase';
import Question from './Question';
import Answers from './Answers';
import Navigation from './Navigation';
import ProgressBar from './ProgressBar';

function QandA (props) {
    const [currentNum, setCurrentNum] = useState(1);
    const [questions, setQuestions] = useState({});
    // const [selections, setSelections] = useState({});
    const [numQuestions, setNumQuestions] = useState(0);

    // use Effect hook in place of componentDidMount to grab questions from the database
    // pass in an empty array so useEffect only runs on first render (it doesn't depend on anything)
    useEffect(() => {
        // database reference
        const dbRef = firebase.database().ref();

        dbRef.on("value", response => {
            const res = response.val().questions;
            // console.log("res", res)
            const numQuestions = Object.keys(res).length;

            // add question objects to state
            setQuestions(res);
            setNumQuestions(numQuestions);
        });
    }, []);

    // change the current question number according to the correct direction (passed in as a number)
    function handleNavigationClick(direction) {
        const nextVisible = currentNum + direction;
        setCurrentNum(nextVisible);
    };

    return (
      <form onSubmit={props.submit}>
        <div className={`card card${currentNum}`}>
          <h2>{currentNum}</h2>
          <Question currentNum={currentNum} currentQ={questions}/>
          <Answers currentQ={questions[currentNum]}/>
          <Navigation
                numQuestions={numQuestions}
                currentNum={currentNum}
                // selections={selections}
                click={handleNavigationClick} />
        <ProgressBar
                numQuestions={numQuestions}
                currentNum={currentNum} />
        </div>
      </form>
    );
}

export default QandA;