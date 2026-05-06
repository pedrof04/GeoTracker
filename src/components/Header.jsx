import { Sun, Moon, RefreshCw, Globe } from 'lucide-react';
import styles from './Header.module.css';

export function Header({ theme, onToggleTheme, onRefresh, loading, lastUpdated, eventCount }) {
  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
    : '—';

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="GeoTracker logo">
          <circle cx="16" cy="16" r="14" fill="var(--color-primary)" opacity="0.15"/>
          <circle cx="16" cy="16" r="14" stroke="var(--color-primary)" strokeWidth="1.5" fill="none"/>
          <ellipse cx="16" cy="16" rx="6" ry="14" stroke="var(--color-primary)" strokeWidth="1" fill="none"/>
          <line x1="2" y1="16" x2="30" y2="16" stroke="var(--color-primary)" strokeWidth="1"/>
          <circle cx="16" cy="16" r="2.5" fill="var(--color-primary)"/>
        </svg>
        <div>
          <span className={styles.title}>GeoTracker</span>
          <span className={styles.subtitle}>NASA EONET</span>
        </div>
      </div>

      <div className={styles.stats}>
        <span className={styles.stat}>
          <span className={styles.statValue}>{eventCount}</span>
          <span className={styles.statLabel}>eventos</span>
        </span>
        <span className={styles.separator} />
        <span className={styles.stat}>
          <span className={styles.statLabel}>atualizado</span>
          <span className={styles.statValue}>{timeStr}</span>
        </span>
      </div>

      <div className={styles.actions}>
        <button
          onClick={onRefresh}
          disabled={loading}
          className={styles.iconBtn}
          aria-label="Atualizar dados"
          title="Atualizar"
        >
          <RefreshCw size={16} className={loading ? styles.spin : ''} />
        </button>
        <button
          onClick={onToggleTheme}
          className={styles.iconBtn}
          aria-label={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
          title="Mudar tema"
          data-theme-toggle
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
