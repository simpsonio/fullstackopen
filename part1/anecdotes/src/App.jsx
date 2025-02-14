import { useState } from 'react'

const Button = (props) => (
  <button onClick = {props.onClick}>
    {props.text}
  </button>
)

const Anecdote = (props) => {
  return (
    <div>
      {props.text}{<br/>}
      has {props.votes} votes
    </div>
  )
}

const Header = ({ header }) => <h1>{header}</h1>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  //find the index of anecdote with most votes
  const mostVotesIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Header header={"Anecdote of the day"}/>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={() => setVotes(votes.with(selected, votes[selected] + 1))} text={"Vote"}/>
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text={"Next anecdote"}/>
      <Header header={"Anecdote with the most votes"}/>
      <Anecdote text={anecdotes[mostVotesIndex]} votes={votes[mostVotesIndex]} />
    </div>
  )
}

export default App