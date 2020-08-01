import React, {useState, useEffect} from 'react'

function ProgressBar(props) {
    const [percentage, setPercentage] = useState(0);
    console.log(props.currentNum, props.numQuestions)

    useEffect(() => {
        const percentage = 100 * (parseInt(props.currentNum) / parseInt(props.numQuestions));
        setPercentage(percentage);
    }, [])
  
    return(
        <div className="progressBar" aria-hidden="true">
            <div className="progress" aria-hidden="true" style={{width: percentage + "%"}}></div>
        </div>
    );
};

export default ProgressBar;