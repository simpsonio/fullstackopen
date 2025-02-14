import { useState } from 'react'

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Statistics = ({text, number}) => {
  return  <div>{text} {number}</div>
}

const Button = (props) => (
  <button onClick = {props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
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
      <Statistics text={"good"} number={good}/>
      <Statistics text={"neutral"} number={neutral}/> 
      <Statistics text={"bad"} number={bad}/>
    </div>
  )
}

export default App