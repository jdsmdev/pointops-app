import { useState } from 'react'
import JoinScreen from './components/JoinScreen'
import VotingScreen from './components/VotingScreen'
import './App.css'

let nextId = 1
function makeId() {
  return nextId++
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [participants, setParticipants] = useState([])
  const [revealed, setRevealed] = useState(false)
  const [roundNumber, setRoundNumber] = useState(1)

  function handleJoin(name) {
    const user = { id: makeId(), name }
    setCurrentUser(user)
    setParticipants([{ ...user, vote: null }])
  }

  function handleVote(value) {
    if (revealed) return
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === currentUser.id ? { ...p, vote: p.vote === value ? null : value } : p
      )
    )
  }

  function handleReveal() {
    setRevealed(true)
  }

  function handleNewRound() {
    setRevealed(false)
    setRoundNumber((n) => n + 1)
    setParticipants((prev) => prev.map((p) => ({ ...p, vote: null })))
  }

  function handleAddParticipant(name) {
    setParticipants((prev) => [...prev, { id: makeId(), name, vote: null }])
  }

  function handleRemoveParticipant(id) {
    setParticipants((prev) => prev.filter((p) => p.id !== id))
  }

  if (!currentUser) {
    return <JoinScreen onJoin={handleJoin} />
  }

  return (
    <VotingScreen
      currentUser={currentUser}
      participants={participants}
      revealed={revealed}
      roundNumber={roundNumber}
      onVote={handleVote}
      onReveal={handleReveal}
      onNewRound={handleNewRound}
      onAddParticipant={handleAddParticipant}
      onRemoveParticipant={handleRemoveParticipant}
    />
  )
}
