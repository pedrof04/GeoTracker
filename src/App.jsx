import { useState } from 'react';
import { useTheme } from './hooks/useTheme.js';
import { useEvents } from './hooks/useEvents.js';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { MapView } from './components/MapView.jsx';
import { EventDetail } from './components/EventDetail.jsx';
import styles from './App.module.css';

const DEFAULT_FILTERS = { status: 'open', days: 30, category: '' };

export default function App() {
  const { theme, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState(null);
  const { events, categories, loading, error, refetch, lastUpdated } = useEvents(filters);

  const handleSelect = (id) => setSelectedId(prev => prev === id ? null : id);

  return (
    <div className={styles.root}>
      <Header
        theme={theme}
        onToggleTheme={toggle}
        onRefresh={refetch}
        loading={loading}
        lastUpdated={lastUpdated}
        eventCount={events.length}
        onToggleSidebar={() => setSidebarOpen(s => !s)}
        sidebarOpen={sidebarOpen}
      />
      <div className={styles.body}>
        <Sidebar
          categories={categories}
          filters={filters}
          onFiltersChange={f => { setFilters(f); setSelectedId(null); }}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          events={events}
        />
        {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}
        <main className={styles.main}>
          {error && (
            <div className={styles.errorBanner}>⚠️ {error}</div>
          )}
          {loading && (
            <div className={styles.loadingPill}>A carregar…</div>
          )}
          <MapView
            events={events}
            selectedId={selectedId}
            onSelectEvent={handleSelect}
            theme={theme}
          />
        </main>
        {selectedId && (
          <EventDetail eventId={selectedId} onClose={() => setSelectedId(null)} />
        )}
      </div>
    </div>
  );
}
