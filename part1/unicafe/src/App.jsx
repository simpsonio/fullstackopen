import { useState } from 'react'

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) return <div>No feedback given</div>

  return (
    <table>
        <tbody>
      <StatisticsLine text={"good"} value={props.good}/>
      <StatisticsLine text={"neutral"} value={props.neutral}/>
      <StatisticsLine text={"bad"} value={props.bad}/>
      <StatisticsLine text={"all"} value={props.all}/>
      <StatisticsLine text={"average"} value={props.average}/>
      <StatisticsLine text={"positive"} value={props.positive}/>
      </tbody>
    </table>
  )
}

const Button = (props) => (
  <button onClick = {props.onClick}>
    {props.text}
  </button>
)

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={"give feedback"}/>
      <Button text={"good"} onClick={() => setGood(good + 1)}/>
      <Button text={"neutral"} onClick={() => setNeutral(neutral + 1)}/>
      <Button text={"bad"} onClick={() => setBad(bad + 1)}/>
      <Header text={"statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad} all={good + neutral + bad} 
        average={(good - bad) / (good + neutral + bad)} positive={(good / (good + neutral + bad))*100 + "%"}
      />
    </div>
  )
}

export default App