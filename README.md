# 🌍 GeoTracker — NASA EONET

Tracking de eventos geológicos e naturais em tempo real usando a API NASA EONET v3.

## Funcionalidades

- 🗺️ Mapa interativo com Leaflet (mapa escuro CartoDB)
- 🔥 Fogos, 🌀 Tempestades, 🌋 Vulcões, 🫨 Terramotos, 🌊 Cheias, e mais
- 🎛️ Filtros por estado (ativo/encerrado), período (7–90 dias), categoria
- 📋 Painel de detalhe com histórico de posições, magnitude, fontes
- 🌙 Dark/Light mode
- 🔄 Atualização manual dos dados

## Arrancar

```bash
npm install
npm run dev
```

Acede em `http://localhost:5173`

## Build para produção

```bash
npm run build
# pasta /dist pronta para deploy (Vercel, Netlify, etc.)
```

## Deploy no Vercel

```bash
npm i -g vercel
vercel --prod
```

## API

Usa a [NASA EONET v3](https://eonet.gsfc.nasa.gov/docs/v3):
- `GET /api/v3/events/geojson` — eventos em formato GeoJSON
- `GET /api/v3/categories` — lista de categorias
- `GET /api/v3/events/:id` — detalhe de um evento

Não requer autenticação.

## Estrutura

```
src/
├── lib/
│   ├── eonet.js           # funções de fetch à API
│   └── categoryConfig.js  # cores e labels por categoria
├── hooks/
│   ├── useEvents.js       # estado + fetch dos eventos
│   └── useTheme.js        # dark/light mode
└── components/
    ├── Header.jsx          # barra de topo
    ├── Sidebar.jsx         # filtros + categorias
    ├── MapView.jsx         # mapa Leaflet
    └── EventDetail.jsx     # painel de detalhe
```
