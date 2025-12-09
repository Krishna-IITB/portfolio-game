

// import Phaser from 'phaser';

// // ✅ IMPORT ALL SCENES
// import BootScene from './scenes/BootScene';
// import Level1Scene from './scenes/Level1Scene';
// import Level1HobbiesScene from './scenes/Level1HobbiesScene';
// import Level1LibraryScene from './scenes/Level1LibraryScene';
// import Level2Scene from './scenes/Level2Scene';
// import Level3Scene from './scenes/Level3Scene';

// let game = null;

// const config = {
//   type: Phaser.AUTO,
//   width: 1280,
//   height: 720,
//   backgroundColor: '#1a1a2e',
//   scale: {
//     mode: Phaser.Scale.FIT,
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//     width: 1280,
//     height: 720
//   },
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 800 },
//       debug: false
//     }
//   },
//   scene: [
//     BootScene,
//     Level1Scene,
//     Level1HobbiesScene,
//     Level1LibraryScene,
//     Level2Scene,
//     Level3Scene
//   ]
// };

// export function initGame(parentId = 'phaser-container') {
//   // 🚨 CRITICAL: Destroy existing game FIRST (fixes hot reload + duplicate scenes)
//   if (game) {
//     console.log('🔄 Destroying existing game instance...');
//     game.destroy(true);
//     game = null;
//   }

//   // Merge parent div ID into config
//   const gameConfig = {
//     ...config,
//     parent: parentId
//   };

//   // Create NEW Phaser Game instance
//   game = new Phaser.Game(gameConfig);
  
//   console.log('✅ Phaser Game Initialized Successfully');
//   console.log('🎮 Scenes loaded:', game.scene.scenes.map(s => s.scene.key));
  
//   return game;
// }

// export function destroyGame() {
//   if (game) {
//     console.log('🗑️ Destroying Phaser Game...');
//     game.destroy(true);
//     game = null;
//   }
// }

// // Export game instance for global access
// export default game;



// import Phaser from 'phaser';

// // ✅ IMPORT ALL SCENES (INCLUDING PRELOAD!)
// import BootScene from './scenes/BootScene';
// import PreloadScene from './scenes/PreloadScene';
// import Level1Scene from './scenes/Level1Scene';
// import Level1HobbiesScene from './scenes/Level1HobbiesScene';
// import Level1LibraryScene from './scenes/Level1LibraryScene';
// import Level2Scene from './scenes/Level2Scene';
// import Level3Scene from './scenes/Level3Scene';

// let game = null;

// const config = {
//   type: Phaser.AUTO,
//   width: 1280,
//   height: 720,
//   backgroundColor: '#1a1a2e',
//   scale: {
//     mode: Phaser.Scale.FIT,
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//     width: 1280,
//     height: 720
//   },
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 800 },
//       debug: false
//     }
//   },
//   scene: [
//     BootScene,
//     PreloadScene,
//     Level1Scene,
//     Level1HobbiesScene,
//     Level1LibraryScene,
//     Level2Scene,
//     Level3Scene
//   ]
// };

// export function initGame(parentId = 'phaser-container') {
//   if (game) {
//     console.log('🔄 Destroying existing game instance...');
//     game.destroy(true);
//     game = null;
//   }

//   const gameConfig = {
//     ...config,
//     parent: parentId
//   };

//   game = new Phaser.Game(gameConfig);
  
//   console.log('✅ Phaser Game Initialized Successfully');
  
//   // 🎮 SETUP GLOBAL FORWARD/BACK MOVEMENT SYSTEM
//   setupGlobalMovementSystem(game);
  
//   return game;
// }

// // 🎮 GLOBAL MOVEMENT SYSTEM (Works in ALL scenes)
// function setupGlobalMovementSystem(gameInstance) {
//   // Helper function to get player object
//   const getPlayer = (scene) => {
//     if (!scene || !scene.player) return null;
    
//     // Player could be:
//     // 1. Direct Phaser sprite with body (your current setup)
//     // 2. Entity class with .sprite property
//     // 3. Just check if it has body property
    
//     return scene.player;
//   };

//   // Listen for moveForward event
//   gameInstance.registry.events.on('moveForward', () => {
//     const activeScenes = gameInstance.scene.getScenes(true);
//     if (activeScenes.length === 0) return;
    
//     const activeScene = activeScenes[0];
//     const player = getPlayer(activeScene);
    
//     if (player && player.body) {
//       player.setVelocityX(400);
//       if (player.setFlipX) player.setFlipX(false);
      
//       activeScene.time.delayedCall(400, () => {
//         if (player && player.body) {
//           player.setVelocityX(0);
//         }
//       });
//     }
//   });

//   // Listen for moveBackward event
//   gameInstance.registry.events.on('moveBackward', () => {
//     const activeScenes = gameInstance.scene.getScenes(true);
//     if (activeScenes.length === 0) return;
    
//     const activeScene = activeScenes[0];
//     const player = getPlayer(activeScene);
    
//     if (player && player.body) {
//       player.setVelocityX(-400);
//       if (player.setFlipX) player.setFlipX(true);
      
//       activeScene.time.delayedCall(400, () => {
//         if (player && player.body) {
//           player.setVelocityX(0);
//         }
//       });
//     }
//   });

//   // Listen for moveLeft event (mobile A button)
//   gameInstance.registry.events.on('moveLeft', () => {
//     const activeScenes = gameInstance.scene.getScenes(true);
//     if (activeScenes.length === 0) return;
    
//     const activeScene = activeScenes[0];
//     const player = getPlayer(activeScene);
    
//     if (player && player.body) {
//       player.setVelocityX(-250);
//       if (player.setFlipX) player.setFlipX(true);
      
//       activeScene.time.delayedCall(150, () => {
//         if (player && player.body) {
//           player.setVelocityX(0);
//         }
//       });
//     }
//   });

//   // Listen for moveRight event (mobile D button)
//   gameInstance.registry.events.on('moveRight', () => {
//     const activeScenes = gameInstance.scene.getScenes(true);
//     if (activeScenes.length === 0) return;
    
//     const activeScene = activeScenes[0];
//     const player = getPlayer(activeScene);
    
//     if (player && player.body) {
//       player.setVelocityX(250);
//       if (player.setFlipX) player.setFlipX(false);
      
//       activeScene.time.delayedCall(150, () => {
//         if (player && player.body) {
//           player.setVelocityX(0);
//         }
//       });
//     }
//   });

//   // Listen for jump event (mobile jump button)
//   gameInstance.registry.events.on('jump', () => {
//     const activeScenes = gameInstance.scene.getScenes(true);
//     if (activeScenes.length === 0) return;
    
//     const activeScene = activeScenes[0];
//     const player = getPlayer(activeScene);
    
//     if (player && player.body) {
//       if (player.body.blocked && player.body.blocked.down) {
//         player.setVelocityY(-600);
//       }
//     }
//   });

//   console.log('🎮 Global Movement System Initialized (Forward/Back/Left/Right/Jump)');
// }

// export function destroyGame() {
//   if (game) {
//     console.log('🗑️ Destroying Phaser Game...');
    
//     // Clean up event listeners
//     game.registry.events.off('moveForward');
//     game.registry.events.off('moveBackward');
//     game.registry.events.off('moveLeft');
//     game.registry.events.off('moveRight');
//     game.registry.events.off('jump');
    
//     game.destroy(true);
//     game = null;
//   }
// }

// // Export game instance for global access
// export default game;




import Phaser from 'phaser';

// ✅ ALL SCENES (including Skills!)
import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import Level1Scene from './scenes/Level1Scene';
import Level1HobbiesScene from './scenes/Level1HobbiesScene';
import Level1LibraryScene from './scenes/Level1LibraryScene';
import Level1SkillsScene from './scenes/Level1SkillsScene';  // ✅ NEW!
import Level2Scene from './scenes/Level2Scene';
import Level3Scene from './scenes/Level3Scene';
import Level4Scene from './scenes/Level4Scene';
import Level5Scene from './scenes/Level5Scene';
import Level6Scene from './scenes/Level6Scene';
import BossScene from './scenes/BossScene';


let game = null;

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#1a1a2e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: [
    BootScene,
    PreloadScene,
    Level1Scene,
    Level1HobbiesScene,
    Level1LibraryScene,
    Level1SkillsScene,  // ✅ NEW SKILLS SCENE
    Level2Scene,
    Level3Scene,
    Level4Scene,
    Level5Scene,
    Level6Scene,
    BossScene
  ]
};

export function initGame(parentId = 'phaser-container') {
  if (game) {
    console.log('🔄 Destroying existing game instance...');
    game.destroy(true);
    game = null;
  }

  const gameConfig = {
    ...config,
    parent: parentId
  };

  game = new Phaser.Game(gameConfig);
  
  console.log('✅ Phaser Game Initialized Successfully');
  console.log('🎮 Scenes loaded:', game.scene.scenes.map(s => s.scene.key));
  
  // 🎮 GLOBAL MOVEMENT SYSTEM (works in ALL scenes automatically!)
  setupGlobalMovementSystem(game);
  
  return game;
}

// 🎮 GLOBAL MOVEMENT SYSTEM (Perfect - works everywhere!)
function setupGlobalMovementSystem(gameInstance) {
  const getPlayer = (scene) => {
    if (!scene || !scene.player) return null;
    // Handles both direct sprites AND Player entities
    return scene.player.sprite || scene.player;
  };

  // Forward (works in ALL scenes!)
  gameInstance.registry.events.on('moveForward', () => {
    const activeScenes = gameInstance.scene.getScenes(true);
    if (activeScenes.length === 0) return;
    
    const activeScene = activeScenes[0];
    const player = getPlayer(activeScene);
    
    if (player && player.body) {
      player.setVelocityX(400);
      if (player.setFlipX) player.setFlipX(false);
      
      activeScene.time.delayedCall(400, () => {
        if (player && player.body) player.setVelocityX(0);
      });
    }
  });

  // Backward
  gameInstance.registry.events.on('moveBackward', () => {
    const activeScenes = gameInstance.scene.getScenes(true);
    if (activeScenes.length === 0) return;
    
    const activeScene = activeScenes[0];
    const player = getPlayer(activeScene);
    
    if (player && player.body) {
      player.setVelocityX(-400);
      if (player.setFlipX) player.setFlipX(true);
      
      activeScene.time.delayedCall(400, () => {
        if (player && player.body) player.setVelocityX(0);
      });
    }
  });

  // Left (mobile A)
  gameInstance.registry.events.on('moveLeft', () => {
    const activeScenes = gameInstance.scene.getScenes(true);
    if (activeScenes.length === 0) return;
    
    const activeScene = activeScenes[0];
    const player = getPlayer(activeScene);
    
    if (player && player.body) {
      player.setVelocityX(-250);
      if (player.setFlipX) player.setFlipX(true);
      
      activeScene.time.delayedCall(150, () => {
        if (player && player.body) player.setVelocityX(0);
      });
    }
  });

  // Right (mobile D)
  gameInstance.registry.events.on('moveRight', () => {
    const activeScenes = gameInstance.scene.getScenes(true);
    if (activeScenes.length === 0) return;
    
    const activeScene = activeScenes[0];
    const player = getPlayer(activeScene);
    
    if (player && player.body) {
      player.setVelocityX(250);
      if (player.setFlipX) player.setFlipX(false);
      
      activeScene.time.delayedCall(150, () => {
        if (player && player.body) player.setVelocityX(0);
      });
    }
  });

  // Jump
  gameInstance.registry.events.on('jump', () => {
    const activeScenes = gameInstance.scene.getScenes(true);
    if (activeScenes.length === 0) return;
    
    const activeScene = activeScenes[0];
    const player = getPlayer(activeScene);
    
    if (player && player.body?.blocked?.down) {
      player.setVelocityY(-600);
    }
  });

  console.log('🎮 Global Movement System Initialized ✅');
}

export function destroyGame() {
  if (game) {
    console.log('🗑️ Destroying Phaser Game...');
    game.registry.events.off('moveForward');
    game.registry.events.off('moveBackward');
    game.registry.events.off('moveLeft');
    game.registry.events.off('moveRight');
    game.registry.events.off('jump');
    game.destroy(true);
    game = null;
  }
}

export default game;
