import React, {useState} from 'react';
import QandA from './QandA'
import ThankYou from './ThankYou';
import '../style.scss';

function App() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="App">
      <h1>Survey</h1>
      {/* if the form has been submitted, render thank you message */}
      {submitted ? (
        <ThankYou />
      ) : (
        // else render question sequence
        <QandA submit={() => setSubmitted(true)} />
      )}
    </div>
  );
}

export default App;