import React, {useState} from 'react';
import ThankYou from './ThankYou';
import QandA from './QandA'
import '../style.scss';

function App() {
  const [submitted, setSubmitted] = useState(false);

  function updateSubmit() {
    setSubmitted(true);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Survey</h1>
        {/* if the form has been submitted, render thank you message */}
        {submitted ? (
          <ThankYou />
        ) : (
          // else render question sequence
          <QandA submit={updateSubmit} />
        )}
      </div>
    </div>
  );
}

export default App;