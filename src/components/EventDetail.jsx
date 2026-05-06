import { useEffect, useState } from 'react';
import { X, ExternalLink, MapPin, Calendar, Tag } from 'lucide-react';
import { fetchEventDetail } from '../lib/eonet.js';
import { getCategoryConfig } from '../lib/categoryConfig.js';
import styles from './EventDetail.module.css';

export function EventDetail({ eventId, onClose }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    setEvent(null);
    fetchEventDetail(eventId)
      .then(setEvent)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [eventId]);

  const cfg = event ? getCategoryConfig(event.categories?.[0]?.id) : null;
  const isClosed = !!event?.closed;
  const firstDate = event?.geometry?.[0]?.date;
  const lastDate = event?.geometry?.[event.geometry.length - 1]?.date;

  return (
    <aside className={`${styles.panel} fade-in`}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>Detalhe</span>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar painel">
          <X size={15} />
        </button>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.skeletons}>
            {[90, 60, 100, 75, 50].map((w, i) => (
              <div key={i} className="skeleton" style={{ height: 13, width: `${w}%`, marginBottom: 10 }} />
            ))}
          </div>
        ) : event ? (
          <>
            <div className={styles.badge} style={{ color: cfg.color, background: `${cfg.color}1a` }}>
              <span>{cfg.icon}</span> {cfg.label}
            </div>

            <h2 className={styles.title}>{event.title}</h2>

            {event.description && (
              <p className={styles.desc}>{event.description}</p>
            )}

            <div className={styles.statusRow}>
              <span
                className={styles.statusDot}
                style={{ background: isClosed ? 'var(--color-text-faint)' : 'var(--color-success)' }}
              />
              <span style={{ color: isClosed ? 'var(--color-text-muted)' : 'var(--color-success)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                {isClosed ? 'Encerrado' : 'Ativo'}
              </span>
              {isClosed && (
                <span className={styles.closedDate}>
                  {new Date(event.closed).toLocaleDateString('pt-PT')}
                </span>
              )}
            </div>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <Calendar size={12} />
                <span>Início</span>
                <strong>{firstDate ? new Date(firstDate).toLocaleDateString('pt-PT') : '—'}</strong>
              </div>
              {event.geometry?.length > 1 && (
                <div className={styles.metaItem}>
                  <Calendar size={12} />
                  <span>Último registo</span>
                  <strong>{lastDate ? new Date(lastDate).toLocaleDateString('pt-PT') : '—'}</strong>
                </div>
              )}
              <div className={styles.metaItem}>
                <MapPin size={12} />
                <span>Registos</span>
                <strong>{event.geometry?.length ?? 0}</strong>
              </div>
            </div>

            {event.geometry?.some(g => g.magnitudeValue) && (
              <div className={styles.section}>
                <div className={styles.sectionLabel}><Tag size={11} /> Magnitude</div>
                <div className={styles.magnitudeBox} style={{ borderColor: cfg.color }}>
                  <span className={styles.magnitudeValue} style={{ color: cfg.color }}>
                    {event.geometry.find(g => g.magnitudeValue)?.magnitudeValue}
                  </span>
                  <span className={styles.magnitudeUnit}>
                    {event.geometry.find(g => g.magnitudeUnit)?.magnitudeUnit}
                  </span>
                </div>
              </div>
            )}

            {event.sources?.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionLabel}><ExternalLink size={11} /> Fontes</div>
                <div className={styles.sources}>
                  {event.sources.map(s => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceLink}
                    >
                      {s.id} <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {event.geometry?.length > 1 && (
              <div className={styles.section}>
                <div className={styles.sectionLabel}><MapPin size={11} /> Histórico de posições</div>
                <div className={styles.timeline}>
                  {event.geometry.slice(0, 10).map((g, i) => (
                    <div key={i} className={styles.timelineRow}>
                      <span className={styles.timelineDot} style={{ background: cfg.color }} />
                      <span className={styles.timelineDate}>
                        {new Date(g.date).toLocaleDateString('pt-PT')}
                      </span>
                      {g.magnitudeValue && (
                        <span className={styles.timelineMag} style={{ color: cfg.color }}>
                          {g.magnitudeValue} {g.magnitudeUnit}
                        </span>
                      )}
                    </div>
                  ))}
                  {event.geometry.length > 10 && (
                    <div className={styles.timelineMore}>
                      +{event.geometry.length - 10} mais registos
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className={styles.empty}>Evento não encontrado.</p>
        )}
      </div>
    </aside>
  );
}
