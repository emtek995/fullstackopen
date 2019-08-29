import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => {
    return (
        <>
        <td>{text}</td>
        <td>{value}</td>
        </>
    )
}

const Statistics = ({good, neutral, bad}) => {
    
    const totalClicks = () => good + neutral + bad

    const averageClicks = () => {
        var total = totalClicks()
        if (total === 0)
            return 0
        return (good - bad) / total
    }

    const positiveClicks = () => {
        var total = totalClicks()
        if (total === 0)
            return 0
        return (good / total * 100) + " %"
    }

    if (totalClicks() !== 0) {
        return (
            <div>
                <table>
                    <tbody>
                        <tr><Statistic text="good" value={good}/></tr>
                        <tr><Statistic text="neutral" value={neutral}/></tr>
                        <tr><Statistic text="bad" value={bad}/></tr>
                        <tr><Statistic text="all" value={totalClicks()}/></tr>
                        <tr><Statistic text="average" value={averageClicks()}/></tr>
                        <tr><Statistic text="positive" value={positiveClicks()}/></tr>
                    </tbody>
                </table>
            </div>
        )
    }

    return (<div>No feedback given</div>)
}

const App = () => {
    const [totals, setTotals] = useState({
        good: 0, neutral: 0, bad: 0
    })

    const updateTotals = (feedback) => {
        switch (feedback) {
            case "good": return setTotals({...totals, good: totals.good + 1})
            case "neutral": return setTotals({...totals, neutral: totals.neutral + 1})
            case "bad": return setTotals({...totals, bad: totals.bad + 1})
            default:
        }
    }
    
    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={() => updateTotals("good")} text="good" />
            <Button onClick={() => updateTotals("neutral")} text="neutral" />
            <Button onClick={() => updateTotals("bad")} text="bad" />
            <h1>statistics</h1>
            <Statistics good={totals.good} neutral={totals.neutral} bad={totals.bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));