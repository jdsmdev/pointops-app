import { useState } from 'react'
import PokerCard from './PokerCard'
import ParticipantList from './ParticipantList'
import VoteResults from './VoteResults'
import styles from './VotingScreen.module.css'

const CARD_VALUES = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕']

export default function VotingScreen({
  currentUser,
  participants,
  revealed,
  roundNumber,
  onVote,
  onReveal,
  onNewRound,
  onAddParticipant,
  onRemoveParticipant,
}) {
  const [newName, setNewName] = useState('')
  const [addError, setAddError] = useState('')

  const currentParticipant = participants.find((p) => p.id === currentUser.id)
  const myVote = currentParticipant?.vote ?? null

  const allVoted = participants.length > 0 && participants.every((p) => p.vote !== null)
  const anyVoted = participants.some((p) => p.vote !== null)

  function handleAddParticipant(e) {
    e.preventDefault()
    const trimmed = newName.trim()
    if (!trimmed) {
      setAddError('Name cannot be empty.')
      return
    }
    if (participants.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) {
      setAddError('A participant with that name already exists.')
      return
    }
    onAddParticipant(trimmed)
    setNewName('')
    setAddError('')
  }

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>🃏</span>
          <span className={styles.appName}>PointOps</span>
        </div>
        <div className={styles.roundBadge}>Round {roundNumber}</div>
        <div className={styles.headerRight}>
          <span className={styles.userName}>👤 {currentUser.name}</span>
        </div>
      </header>

      <main className={styles.main}>
        {/* Left column: participants */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Participants</h2>
          <ParticipantList
            participants={participants}
            revealed={revealed}
            currentUserId={currentUser.id}
          />

          {!revealed && (
            <form onSubmit={handleAddParticipant} className={styles.addForm}>
              <label className={styles.addLabel}>Add participant</label>
              <div className={styles.addRow}>
                <input
                  type="text"
                  className={styles.addInput}
                  placeholder="Name"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value)
                    setAddError('')
                  }}
                  maxLength={40}
                />
                <button type="submit" className={styles.addButton}>
                  +
                </button>
              </div>
              {addError && <p className={styles.addError}>{addError}</p>}
            </form>
          )}

          {!revealed && participants.length > 1 && (
            <div className={styles.removeSection}>
              {participants
                .filter((p) => p.id !== currentUser.id)
                .map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={styles.removeButton}
                    onClick={() => onRemoveParticipant(p.id)}
                    aria-label={`Remove ${p.name}`}
                  >
                    Remove {p.name}
                  </button>
                ))}
            </div>
          )}
        </aside>

        {/* Right column: voting area */}
        <section className={styles.votingArea}>
          {!revealed ? (
            <>
              <h2 className={styles.votingTitle}>
                {myVote !== null
                  ? `Your vote: ${myVote} — change it if you like`
                  : 'Pick your estimate'}
              </h2>
              <p className={styles.votingHint}>
                Select a card to cast your vote. Votes stay hidden until revealed.
              </p>
              <div className={styles.cardDeck}>
                {CARD_VALUES.map((val) => (
                  <PokerCard
                    key={val}
                    value={val}
                    selected={myVote === val}
                    onClick={() => onVote(val)}
                  />
                ))}
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.revealButton}
                  onClick={onReveal}
                  disabled={!anyVoted}
                  title={!anyVoted ? 'At least one vote is needed to reveal' : ''}
                >
                  Reveal Votes
                </button>
              </div>
            </>
          ) : (
            <>
              <VoteResults participants={participants} />
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.newRoundButton}
                  onClick={onNewRound}
                >
                  New Round
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      {allVoted && !revealed && (
        <div className={styles.allVotedBanner}>
          ✅ All participants have voted — ready to reveal!
        </div>
      )}
    </div>
  )
}
