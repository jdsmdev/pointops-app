import { useState } from 'react'
import styles from './JoinScreen.module.css'

export default function JoinScreen({ onJoin }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Please enter your name.')
      return
    }
    onJoin(trimmed)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>🃏</div>
        <h1 className={styles.title}>PointOps</h1>
        <p className={styles.subtitle}>Planning Poker for agile teams</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="name" className={styles.label}>
            Your name
          </label>
          <input
            id="name"
            type="text"
            className={styles.input}
            placeholder="e.g. Alice"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            autoFocus
            maxLength={40}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Start Session
          </button>
        </form>
      </div>
    </div>
  )
}
