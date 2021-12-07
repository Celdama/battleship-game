import game from './modules/game';

if (module.hot) {
  module.hot.accept(() => {
    window.location.reload();
  });
}

const { gameLoop } = game;

gameLoop();
