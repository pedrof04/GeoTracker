import { Filter } from 'lucide-react';
import { getCategoryConfig } from '../lib/categoryConfig.js';
import styles from './Sidebar.module.css';

const DAYS_OPTIONS = [7, 14, 30, 60, 90];
const STATUS_OPTIONS = [
  { value: 'open',   label: 'Ativos' },
  { value: 'closed', label: 'Encerrados' },
  { value: 'all',    label: 'Todos' },
];

export function Sidebar({ categories, filters, onFiltersChange, events }) {
  const countByCategory = events.reduce((acc, e) => {
    const catId = e.properties?.categories?.[0]?.id;
    if (catId) acc[catId] = (acc[catId] || 0) + 1;
    return acc;
  }, {});

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <Filter size={12} /> Filtros
        </h3>

        <label className={styles.label}>Estado</label>
        <div className={styles.pills}>
          {STATUS_OPTIONS.map(o => (
            <button
              key={o.value}
              className={`${styles.pill} ${filters.status === o.value ? styles.pillActive : ''}`}
              onClick={() => onFiltersChange({ ...filters, status: o.value })}
            >
              {o.label}
            </button>
          ))}
        </div>

        <label className={styles.label}>Período</label>
        <div className={styles.pills}>
          {DAYS_OPTIONS.map(d => (
            <button
              key={d}
              className={`${styles.pill} ${filters.days === d ? styles.pillActive : ''}`}
              onClick={() => onFiltersChange({ ...filters, days: d })}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Categorias</h3>

        <button
          className={`${styles.catRow} ${!filters.category ? styles.catActive : ''}`}
          onClick={() => onFiltersChange({ ...filters, category: '' })}
        >
          <span className={styles.catDot} style={{ background: 'var(--color-text-faint)' }} />
          <span className={styles.catLabel}>Todas</span>
          <span className={styles.catCount}>{events.length}</span>
        </button>

        {categories.map(cat => {
          const cfg = getCategoryConfig(cat.id);
          const count = countByCategory[cat.id];
          return (
            <button
              key={cat.id}
              className={`${styles.catRow} ${filters.category === cat.id ? styles.catActive : ''}`}
              onClick={() => onFiltersChange({ ...filters, category: filters.category === cat.id ? '' : cat.id })}
            >
              <span className={styles.catDot} style={{ background: cfg.color }} />
              <span className={styles.catLabel}>{cfg.label}</span>
              {count ? <span className={styles.catCount}>{count}</span> : null}
            </button>
          );
        })}
      </div>

      <div className={styles.footer}>
        <span>NASA EONET v3</span>
      </div>
    </aside>
  );
}
