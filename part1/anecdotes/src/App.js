import React, { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const ShowAnecdote = ({ anecdote }) => <div>{anecdote}</div>

const ShowVotes = ({votes}) => {
  return (
    <div>
      has {votes} votes
    </div>
  )
}

const ShowMostVote = ({votes, anecdotes}) => {
  let vote = votes[0]
  let anecdote = anecdotes[0]
  for (let i = 1; i < votes.length; i++) {
    if (votes[i] > vote) {
      vote = votes[i]
      anecdote = anecdotes[i]
    }
  }
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdote}<br />
      has {vote} votes</p>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <ShowAnecdote anecdote={anecdotes[selected]} />
      <ShowVotes votes={votes[selected]} />
      <p>
        <Button text='vote' onClick={vote} />
        <Button text='next anecdote' onClick={randomAnecdote} />
      </p>
      <ShowMostVote votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App