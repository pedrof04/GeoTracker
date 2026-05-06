// Mapeamento de categoria → cor + ícone
export const CATEGORY_CONFIG = {
  wildfires:        { color: '#f07840', label: 'Fogos',        icon: '🔥' },
  severeStorms:     { color: '#5590d4', label: 'Tempestades',  icon: '🌀' },
  volcanoes:        { color: '#f06060', label: 'Vulcões',      icon: '🌋' },
  earthquakes:      { color: '#e0b840', label: 'Terramotos',   icon: '🫨' },
  floods:           { color: '#2fb5be', label: 'Cheias',       icon: '🌊' },
  landslides:       { color: '#a87fdf', label: 'Deslizamentos',icon: '⛰️' },
  seaLakeIce:       { color: '#a0c8d8', label: 'Gelo',         icon: '🧊' },
  drought:          { color: '#c09050', label: 'Seca',         icon: '☀️' },
  dustHaze:         { color: '#b8a070', label: 'Poeira',       icon: '🌫️' },
  manmade:          { color: '#8a9e98', label: 'Humanos',      icon: '🏭' },
  snow:             { color: '#c8dce4', label: 'Neve',         icon: '❄️' },
  waterColor:       { color: '#40a0a0', label: 'Água',         icon: '💧' },
  tempExtremes:     { color: '#d46868', label: 'Calor Extremo',icon: '🌡️' },
};

export function getCategoryConfig(categoryId) {
  return CATEGORY_CONFIG[categoryId] || { color: '#7a8a82', label: categoryId, icon: '📍' };
}

export function getCategoryColor(categoryId) {
  return getCategoryConfig(categoryId).color;
}
