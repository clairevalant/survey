// Question and Answers
import React, {useState, useEffect, Fragment} from 'react';
import firebase from '../firebase';
import Answers from './Answers';
import Question from './Question';
import Navigation from './Navigation';
import ProgressBar from './ProgressBar';

function QandA (props) {
    const [currentNum, setCurrentNum] = useState(1);
    const [questions, setQuestions] = useState({});
    const [selections, setSelections] = useState({});
    const [disableNext, setDisableNext] = useState({});
    const [numQuestions, setNumQuestions] = useState(0);

    // use useEffect hook (in place of componentDidMount in a class component) to grab questions from the database
    // pass in an empty array so useEffect only runs on first render (it doesn't depend on anything)
    useEffect(() => {
        // database reference
        const dbRef = firebase.database().ref();

        dbRef.on("value", response => {
            // res is returned as an array of objects
            const res = response.val().questions;
            const setupSelections = {};
            const setupDisableNext = {};
            const numQuestions = Object.keys(res).length;

            // instantiating the selections & disableNext objects
           res.forEach((el, i) => {
               setupSelections[i] = [];
               setupDisableNext[i] = true;
           })

            // add results to state
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

    // on click of available answers
    function handleInputClick(event) {
        let newDisableNext;
        let newSelections = selections[currentNum];
        const multiple = questions[currentNum].multiple;
        const selectedAnswer = event.target.htmlFor;

        // if multiple answers are allowed
        if(multiple && typeof selectedAnswer !== undefined) {
            // and if the selected answer does not already exist in the answer array; or the array is empty
            if (newSelections.indexOf(selectedAnswer) === -1 || newSelections === []) {
                // add the selected answer to the selections array and enable the Next button
                newSelections.push(selectedAnswer);
                newDisableNext = false;
            } else {
                // else remove the answer from the array
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

    // function onKeydown(event) {

    // }

    // push answers to a node in the database called submissions
    
    function handleSubmit(event) {
        event.preventDefault();
        const dbRef = firebase.database().ref("submissions");
        dbRef.push(selections);
        // update state in App.js
        props.submit();
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
            {/* render questions once returned from Firebase query */}
            {currentNum && questions[currentNum] && selections[currentNum] ? 
                <Fragment>
                    <Question
                        currentNum={currentNum}
                        currentQ={questions[currentNum]}
                        multiple={questions[currentNum].multiple} />
                    <Answers
                        currentNum={currentNum}
                        selections={selections}
                        // keydown={onKeydown}
                        click={handleInputClick}
                        multiple={questions[currentNum].multiple}
                        currentQAnswers={questions[currentNum].answers} />
                    <Navigation
                        currentNum={currentNum}
                        selections={selections}
                        disableNext={disableNext}
                        numQuestions={numQuestions}
                        click={handleNavigationClick} />
             </Fragment>
                : null}
            </form>
            <ProgressBar
                currentNum={currentNum}
                numQuestions={numQuestions} />
        </Fragment>
    );
}

export default QandA;