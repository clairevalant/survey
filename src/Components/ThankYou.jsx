// Thank you message to be displayed upon form submission
import React from 'react';

const ThankYou = function (props) {
    return (
      <div className={"thankyou"}>
        <h2>
          Thank you for completing this survey! <span role="img" aria-label="Party party.">🥳</span>
        </h2>
      </div>
    );
}

export default ThankYou;