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
    const [selections, setSelections] = useState({});
    const [disableNext, setDisableNext] = useState({});
    const [numQuestions, setNumQuestions] = useState(0);

    // use Effect hook in place of componentDidMount to grab questions from the database
    // pass in an empty array so useEffect only runs on first render (it doesn't depend on anything)
    useEffect(() => {
        // database reference
        const dbRef = firebase.database().ref();

        dbRef.on("value", response => {
            const res = response.val().questions;
            const setupSelections = {};
            const setupDisableNext = {};
            const numQuestions = Object.keys(res).length;

            // instantiating the selections object
           for (const i in res) {
               setupSelections[i] = [];
               setupDisableNext[i] = true;
           }

            // add question objects to state
            setQuestions(res);
            setNumQuestions(numQuestions);
            setSelections(setupSelections);
            setDisableNext(setupDisableNext);
        });
    }, []);

    // change the current question number according to the correct direction (passed in as a number)
    function handleNavigationClick(direction) {
        const nextVisible = currentNum + direction;
        setCurrentNum(nextVisible);
    };

    function handleInputClick(event) {
        let newSelections = selections[currentNum];
        let newDisableNext;
        const currentQ = questions[currentNum];
        const selectedAnswer = event.target.htmlFor;

        // if multiple answers are allowed
        if(currentQ.multiple && typeof selectedAnswer !== undefined) {
            // add all answers to corresponding selections array
            if (newSelections.indexOf(selectedAnswer) === -1 || newSelections === []) {
                newSelections.push(selectedAnswer);
                newDisableNext = false;
            } else {
                const location = newSelections.indexOf(selectedAnswer);
                newSelections.splice(location, 1);
                newDisableNext = newSelections.length === 0 ? true : false;
            }
        } else {
            // else add only the single selection
            newSelections = selectedAnswer;
            newDisableNext = false;
        }

        // set state
        setSelections({
            ...selections,
            [currentNum]:newSelections
        });
        setDisableNext({
            ...disableNext,
            [currentNum]: newDisableNext
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        const dbRef = firebase.database().ref();
        dbRef.push(selections);

        props.submit();
    }

    return (
      <form onSubmit={handleSubmit}>
      {/* render questions once returned from Firebase query */}
      {currentNum && questions[currentNum] && selections[currentNum] ? 
        <div className={`card card${currentNum}`}>
            <Question
                currentNum={currentNum}
                currentQ={questions[currentNum]} />
            <Answers
                currentNum={currentNum}
                selections={selections}
                click={handleInputClick}
                multiple={questions[currentNum].multiple}
                currentQAnswers={questions[currentNum].answers} />
            <Navigation
                currentNum={currentNum}
                selections={selections}
                disableNext={disableNext}
                numQuestions={numQuestions}
                click={handleNavigationClick} />
            <ProgressBar
                currentNum={currentNum} 
                numQuestions={numQuestions} />
        </div>
        : null}
      </form>
    );
}

export default QandA;