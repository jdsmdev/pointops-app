import styles from './PokerCard.module.css'

export default function PokerCard({ value, selected, onClick, disabled }) {
  return (
    <button
      type="button"
      className={[
        styles.card,
        selected ? styles.selected : '',
        disabled ? styles.disabled : '',
      ]
        .join(' ')
        .trim()}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Vote ${value}`}
    >
      <span className={styles.value}>{value}</span>
    </button>
  )
}
