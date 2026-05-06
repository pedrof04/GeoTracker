<div align="center">

<img src="public/favicon.svg" width="64" height="64" alt="GeoTracker logo" />

# GeoTracker

**Tracking de eventos naturais em tempo real**

[![NASA EONET](https://img.shields.io/badge/Powered%20by-NASA%20EONET-0B3D91?style=flat-square&logo=nasa)](https://eonet.gsfc.nasa.gov)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vite.dev)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat-square&logo=leaflet)](https://leafletjs.com)

</div>

---

![screenshot placeholder](https://placehold.co/1200x600/0d0f0e/2fb5be?text=GeoTracker+Preview)

## Sobre

GeoTracker é uma web app que visualiza eventos geológicos e naturais em tempo real usando a API pública [NASA EONET v3](https://eonet.gsfc.nasa.gov/docs/v3). Os eventos — fogos, tempestades, vulcões, terramotos, cheias e mais — aparecem num mapa interativo com filtros, detalhe completo e histórico de posições.

## Funcionalidades

- 🗺️ Mapa interativo com estilo escuro (CARTO Dark Matter)
- 🔥 Suporte a 13+ categorias de eventos (fogos, vulcões, terramotos, cheias, tempestades...)
- 🎛️ Filtros por estado (ativo / encerrado), período (7–90 dias) e categoria
- 📋 Painel de detalhe com magnitude, fontes, datas e histórico de posições
- 🌙 Dark mode e Light mode
- 🔄 Atualização manual dos dados em tempo real

## Stack

| Camada    | Tecnologia                              |
| --------- | --------------------------------------- |
| Framework | React 18 + Vite 6                       |
| Mapa      | Leaflet + React-Leaflet                 |
| Dados     | NASA EONET API v3 (sem autenticação)    |
| Estilos   | CSS Modules + design system customizado |
| Icons     | Lucide React                            |
| Deploy    | Vercel                                  |

## Correr localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/teu-username/geotracker.git
cd geotracker

# 2. Instalar dependências
npm install

# 3. Arrancar o servidor de desenvolvimento
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) no browser.

## Build para produção

```bash
npm run build
```

A pasta `/dist` fica pronta para deploy em qualquer serviço de hosting estático (Vercel, Netlify, GitHub Pages).

## Estrutura do projeto

```
src/
├── lib/
│   ├── eonet.js            # funções de fetch à API NASA EONET
│   └── categoryConfig.js   # cores e labels por categoria de evento
├── hooks/
│   ├── useEvents.js        # estado global dos eventos
│   └── useTheme.js         # dark/light mode
└── components/
    ├── Header.jsx           # barra de topo com contador e controlos
    ├── Sidebar.jsx          # filtros e lista de categorias
    ├── MapView.jsx          # mapa Leaflet com markers e polígonos
    └── EventDetail.jsx      # painel lateral de detalhe do evento
```

## API

Usa a [NASA EONET v3](https://eonet.gsfc.nasa.gov/docs/v3) — **gratuita e sem autenticação**.

```
GET /api/v3/events/geojson   # eventos em formato GeoJSON
GET /api/v3/categories        # lista de categorias disponíveis
GET /api/v3/events/:id        # detalhe de um evento específico
```

## Licença

MIT — livre para usar, modificar e distribuir.

---

<div align="center">
  <sub>Dados fornecidos pela <a href="https://eonet.gsfc.nasa.gov">NASA EONET</a> · Mapa © <a href="https://carto.com">CARTO</a> © <a href="https://openstreetmap.org">OpenStreetMap</a></sub>
</div>
