import Game from '@/components/pages/Game';

export const routes = {
  game: {
    id: 'game',
    label: 'Game',
    path: '/',
    icon: 'Zap',
    component: Game
  }
};

export const routeArray = Object.values(routes);