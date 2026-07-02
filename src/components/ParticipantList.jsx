import styles from './ParticipantList.module.css'

export default function ParticipantList({ participants, revealed, currentUserId }) {
  return (
    <div className={styles.list}>
      {participants.map((p) => (
        <div
          key={p.id}
          className={[
            styles.participant,
            p.id === currentUserId ? styles.self : '',
          ]
            .join(' ')
            .trim()}
        >
          <div className={styles.avatar}>
            {p.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.info}>
            <span className={styles.name}>
              {p.name}
              {p.id === currentUserId && (
                <span className={styles.youBadge}> (you)</span>
              )}
            </span>
            <span className={styles.status}>
              {p.vote !== null ? 'Voted ✓' : 'Waiting…'}
            </span>
          </div>
          <div
            className={[
              styles.voteBox,
              p.vote !== null ? styles.hasVote : '',
              revealed ? styles.revealed : '',
            ]
              .join(' ')
              .trim()}
          >
            {revealed && p.vote !== null ? (
              <span className={styles.voteValue}>{p.vote}</span>
            ) : p.vote !== null ? (
              <span className={styles.faceDown}>🂠</span>
            ) : (
              <span className={styles.noVote}>–</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
