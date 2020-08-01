import React, {useState, useEffect} from 'react'

function ProgressBar(props) {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const percentage = 100 * (parseInt(props.currentNum) / parseInt(props.numQuestions));
        setPercentage(percentage);
    }, [props])
  
    return(
        <div className="progressBar" aria-hidden="true">
            <p>{props.currentNum} / {props.numQuestions}</p>
            <div className="progress" aria-hidden="true" style={{width: percentage + "%"}}></div>
        </div>
    );
};

export default ProgressBar;