import styles from './VoteResults.module.css'

function getMode(values) {
  const freq = {}
  values.forEach((v) => {
    freq[v] = (freq[v] || 0) + 1
  })
  let maxCount = 0
  let mode = null
  Object.entries(freq).forEach(([val, count]) => {
    if (count > maxCount) {
      maxCount = count
      mode = val
    }
  })
  return mode
}

function isNumeric(val) {
  return val !== '?' && val !== '☕'
}

export default function VoteResults({ participants }) {
  const voted = participants.filter((p) => p.vote !== null)
  const numericVotes = voted
    .filter((p) => isNumeric(p.vote))
    .map((p) => Number(p.vote))

  const average =
    numericVotes.length > 0
      ? (numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length).toFixed(1)
      : null

  const allVotes = voted.map((p) => p.vote)
  const mode = allVotes.length > 0 ? getMode(allVotes) : null

  const allAgree =
    voted.length > 1 && new Set(allVotes).size === 1

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Results</h2>

      {allAgree && (
        <div className={styles.consensus}>
          🎉 Everyone agreed on <strong>{allVotes[0]}</strong>!
        </div>
      )}

      <div className={styles.stats}>
        {average !== null && (
          <div className={styles.stat}>
            <span className={styles.statValue}>{average}</span>
            <span className={styles.statLabel}>Average</span>
          </div>
        )}
        {mode !== null && (
          <div className={styles.stat}>
            <span className={styles.statValue}>{mode}</span>
            <span className={styles.statLabel}>Most Common</span>
          </div>
        )}
        <div className={styles.stat}>
          <span className={styles.statValue}>{voted.length}</span>
          <span className={styles.statLabel}>Votes</span>
        </div>
      </div>

      <div className={styles.breakdown}>
        {voted.map((p) => (
          <div key={p.id} className={styles.row}>
            <span className={styles.pName}>{p.name}</span>
            <span className={styles.pVote}>{p.vote}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
