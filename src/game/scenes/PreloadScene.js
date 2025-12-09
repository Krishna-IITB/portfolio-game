// // REPLACE ENTIRE src/game/scenes/PreloadScene.js
// import Phaser from 'phaser';

// export default class PreloadScene extends Phaser.Scene {
//   constructor() {
//     super('PreloadScene');
//   }

//   preload() {
//     const { width, height } = this.cameras.main;

//     // LOADING BAR UI
//     const progressBox = this.add.graphics();
//     const progressBar = this.add.graphics();

//     progressBox.fillStyle(0x222222, 0.8);
//     progressBox.fillRect(width / 4, height / 2, width / 2, 30);

//     const loadingText = this.add
//       .text(width / 2, height / 2 - 40, 'Loading...', {
//         fontSize: '24px',
//         color: '#ffffff'
//       })
//       .setOrigin(0.5);

//     this.load.on('progress', value => {
//       progressBar.clear();
//       progressBar.fillStyle(0x22c55e, 1);
//       progressBar.fillRect(
//         width / 4 + 5,
//         height / 2 + 5,
//         (width / 2 - 10) * value,
//         20
//       );
//     });

//     this.load.on('complete', () => {
//       progressBar.destroy();
//       progressBox.destroy();
//       loadingText.destroy();
//       this.scene.start('Level1Scene');
//     });

//     // BACKGROUNDS
//     this.load.image('bg', '/assets/backgrounds/bg.png');
//     this.load.image('level1-hobbies-room', '/assets/backgrounds/level1-hobbies-room.png');
//     this.load.image('level1-library', '/assets/backgrounds/level1-library.png');
//     this.load.image('level2-satellite', '/assets/backgrounds/level2-satellite.png');
//     this.load.image('level3-security', '/assets/backgrounds/level3-security.png');
//     this.load.image('level4-server', '/assets/backgrounds/level4-server.png');
//     this.load.image('level5-code-editor', '/assets/backgrounds/level5-code-editor.png'); // ✅ ADDED

//     // HOBBY OBJECTS
//     this.load.image('gaming-setup', '/assets/objects/interactive/gaming-controller.png');
//     this.load.image('hobby-anime', '/assets/objects/hobbies/hobby-anime.png');
//     this.load.image('hobby-gym', '/assets/objects/hobbies/hobby-gym.png');
//     this.load.image('hobby-laptop', '/assets/objects/hobbies/hobby-laptop-code.png');
//     this.load.image('hobby-manga', '/assets/objects/hobbies/hobby-manga.png');

//     // PLATFORMS
//     this.load.image('ground-tile', '/assets/platforms/ground-tile.png');
//     this.load.image('platform-basic', '/assets/platforms/platform-basic.png');
//     this.load.image('platform-metal', '/assets/platforms/platform-metal.png');
//     this.load.image('platform-cloud', '/assets/platforms/platform-cloud.png'); // ✅ ADDED

//     // INTERACTIVE OBJECTS
//     this.load.image('signboard-welcome', '/assets/objects/interactive/signboard-welcome.png');
//     this.load.image('npc-professor', '/assets/characters/npcs/npc-professor.png');
//     this.load.image('npc-leader', '/assets/characters/npcs/npc-leader.png');
//     this.load.image('door-hobbies', '/assets/objects/interactive/door-hobbies.png');
//     this.load.image('door-library', '/assets/objects/interactive/door_closed.png');
//     this.load.image('info-kiosk', '/assets/objects/interactive/info-kiosk.png');
//     this.load.image('door-large', '/assets/objects/interactive/door_large.png');
//     this.load.image('door-standard', '/assets/objects/interactive/door_closed.png');
//     this.load.image('computer-desk', '/assets/objects/interactive/computer-desk.png'); // ✅ ADDED (for Level 5)

//     // LEVEL 2 - SATELLITE
//     this.load.image('satellite-dish', '/assets/objects/interactive/satellite-dish.png');

//     // LEVEL 3 - AI GUARD
//     this.load.image('cctv-head', '/assets/objects/interactive/cctv-camera.png');
//     this.load.image('pc-terminal', '/assets/objects/interactive/computer-desk.png');
//     this.load.image('icon-deepface', '/assets/skills/ml/opencv.png');
//     this.load.image('icon-llama', '/assets/skills/ml/pytorch.png');
//     this.load.image('icon-telegram', '/assets/skills/systems/github.png');

//     // LEVEL 4 - URL SHORTENER
//     this.load.image('server-rack', '/assets/objects/interactive/server-rack.png');
//     this.load.image('qr-code', '/assets/objects/interactive/qr-code.png');
//     this.load.image('icon-nodejs', '/assets/skills/backend/nodedotjs.png');
//     this.load.image('icon-mongodb', '/assets/skills/backend/mongodb.png');
//     this.load.image('icon-redis', '/assets/skills/backend/redis.png');
//     this.load.image('icon-docker', '/assets/skills/systems/docker.png');


//         // LEVEL 6 - URL SHORTENER
// this.load.image('level6-network', '/assets/backgrounds/level6-network.png');


// // LEVEL 7 - RISC PROCESSOR
// this.load.image('level7-circuit', '/assets/backgrounds/level7-circuit.png');
// this.load.image('chip-processor', '/assets/objects/interactive/chip-processor.png');



//     // LIBRARY OBJECTS
//     this.load.image('bookshelf', '/assets/objects/interactive/bookshelf.png');
//     this.load.image('certificate-frame', '/assets/objects/interactive/certificate-frame.png');
//     this.load.image('book-ee709', '/assets/objects/coursework/book-ee709.png');
//     this.load.image('book-ee782', '/assets/objects/coursework/book-ee782.png');
//     this.load.image('book-ds303', '/assets/objects/coursework/book-DS303.png');
//     this.load.image('book-cs213', '/assets/objects/coursework/book-CS213.png');

//     // COLLECTIBLES
//     this.load.image('star-gold', '/assets/collectibles/stars/star-gold.png');
//     this.load.image('star-rainbow', '/assets/collectibles/stars/star-rainbow.png');

//     // TECH ICONS
//     // Frontend
//     this.load.image('icon-react', '/assets/skills/frontend/react.png');
//     this.load.image('icon-angular', '/assets/skills/frontend/angular.png');
//     this.load.image('icon-vue', '/assets/skills/frontend/vuedotjs.png');
//     this.load.image('icon-tailwind', '/assets/skills/frontend/tailwindcss.png');
//     this.load.image('icon-html', '/assets/skills/frontend/html5.png');
//     this.load.image('icon-css', '/assets/skills/frontend/css.svg.png');
//     this.load.image('icon-javascript', '/assets/skills/frontend/javascript.png');
//     this.load.image('icon-bootstrap', '/assets/skills/frontend/bootstrap.png');

//     // ML
//     this.load.image('icon-python', '/assets/skills/ml/python.png');
//     this.load.image('icon-pytorch', '/assets/skills/ml/pytorch.png');
//     this.load.image('icon-tensorflow', '/assets/skills/ml/tensorflow.png');
//     this.load.image('icon-opencv', '/assets/skills/ml/opencv.png');
//     this.load.image('icon-numpy', '/assets/skills/ml/numpy.png');
//     this.load.image('icon-pandas', '/assets/skills/ml/pandas.png');
//     this.load.image('icon-jupyter', '/assets/skills/ml/jupyter.png');
//     this.load.image('icon-scikit', '/assets/skills/ml/scikitlearn.png');

//     // Backend
//     this.load.image('icon-express', '/assets/skills/backend/express.png');
//     this.load.image('icon-mysql', '/assets/skills/backend/mysql.png');

//     // Systems
//     this.load.image('icon-linux', '/assets/skills/systems/linux.png');
//     this.load.image('icon-git', '/assets/skills/systems/git.png');
//     this.load.image('icon-github', '/assets/skills/systems/github.png');
//     this.load.image('icon-kubernetes', '/assets/skills/systems/kubernetes.png');
//     this.load.image('icon-nginx', '/assets/skills/systems/nginx.png');

//     // PLAYER SPRITESHEET
//     this.load.spritesheet(
//       'krishna-idle',
//       '/assets/characters/krishna/krishna-idle.png',
//       {
//         frameWidth: 32,
//         frameHeight: 48
//       }
//     );
//   }

//   create() {}
// }




// REPLACE ENTIRE src/game/scenes/PreloadScene.js
import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    const { width, height } = this.cameras.main;

    // LOADING BAR UI
    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4, height / 2, width / 2, 30);

    const loadingText = this.add
      .text(width / 2, height / 2 - 40, 'Loading...', {
        fontSize: '24px',
        color: '#ffffff'
      })
      .setOrigin(0.5);

    this.load.on('progress', value => {
      progressBar.clear();
      progressBar.fillStyle(0x22c55e, 1);
      progressBar.fillRect(
        width / 4 + 5,
        height / 2 + 5,
        (width / 2 - 10) * value,
        20
      );
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      this.scene.start('Level1Scene');
    });

    // BACKGROUNDS
    this.load.image('bg', '/assets/backgrounds/bg.png');
    this.load.image('level1-hobbies-room', '/assets/backgrounds/level1-hobbies-room.png');
    this.load.image('level1-library', '/assets/backgrounds/level1-library.png');
    this.load.image('level2-satellite', '/assets/backgrounds/level2-satellite.png');
    this.load.image('level3-security', '/assets/backgrounds/level3-security.png');
    this.load.image('level4-server', '/assets/backgrounds/level4-server.png');
    // Level 5 uses level6-network as its background (IDS)
    this.load.image('level6-network', '/assets/backgrounds/level6-network.png');
    // Level 6 background (RISC)
    this.load.image('level7-circuit', '/assets/backgrounds/level7-circuit.png');

    // HOBBY OBJECTS
    this.load.image('gaming-setup', '/assets/objects/interactive/gaming-controller.png');
    this.load.image('hobby-anime', '/assets/objects/hobbies/hobby-anime.png');
    this.load.image('hobby-gym', '/assets/objects/hobbies/hobby-gym.png');
    this.load.image('hobby-laptop', '/assets/objects/hobbies/hobby-laptop-code.png');
    this.load.image('hobby-manga', '/assets/objects/hobbies/hobby-manga.png');

    // PLATFORMS
    this.load.image('ground-tile', '/assets/platforms/ground-tile.png');
    this.load.image('platform-basic', '/assets/platforms/platform-basic.png');
    this.load.image('platform-metal', '/assets/platforms/platform-metal.png');
    this.load.image('platform-cloud', '/assets/platforms/platform-cloud.png');

    // INTERACTIVE OBJECTS
    this.load.image('signboard-welcome', '/assets/objects/interactive/signboard-welcome.png');
    this.load.image('npc-professor', '/assets/characters/npcs/npc-professor.png');
    this.load.image('npc-leader', '/assets/characters/npcs/npc-leader.png');
    this.load.image('door-hobbies', '/assets/objects/interactive/door-hobbies.png');
    this.load.image('door-library', '/assets/objects/interactive/door_closed.png');
    this.load.image('info-kiosk', '/assets/objects/interactive/info-kiosk.png');
    this.load.image('door-large', '/assets/objects/interactive/door_large.png');
    this.load.image('door-standard', '/assets/objects/interactive/door_closed.png');
    this.load.image('computer-desk', '/assets/objects/interactive/computer-desk.png');

    // LEVEL 2 - SATELLITE
    this.load.image('satellite-dish', '/assets/objects/interactive/satellite-dish.png');

    // LEVEL 3 - AI GUARD
    this.load.image('cctv-head', '/assets/objects/interactive/cctv-camera.png');
    this.load.image('pc-terminal', '/assets/objects/interactive/computer-desk.png');
    this.load.image('icon-deepface', '/assets/skills/ml/opencv.png');
    this.load.image('icon-llama', '/assets/skills/ml/pytorch.png');
    this.load.image('icon-telegram', '/assets/skills/systems/github.png');

    // LEVEL 4 - URL SHORTENER
    this.load.image('server-rack', '/assets/objects/interactive/server-rack.png');
    this.load.image('qr-code', '/assets/objects/interactive/qr-code.png');
    this.load.image('icon-nodejs', '/assets/skills/backend/nodedotjs.png');
    this.load.image('icon-mongodb', '/assets/skills/backend/mongodb.png');
    this.load.image('icon-redis', '/assets/skills/backend/redis.png');
    this.load.image('icon-docker', '/assets/skills/systems/docker.png');

    // LEVEL 5 - IDS (NETWORK)
    this.load.image('network-router', '/assets/objects/interactive/network-router.png');

    // LEVEL 6 - RISC PROCESSOR
    this.load.image('chip-processor', '/assets/objects/interactive/chip-processor.png');

    // LIBRARY OBJECTS
    this.load.image('bookshelf', '/assets/objects/interactive/bookshelf.png');
    this.load.image('certificate-frame', '/assets/objects/interactive/certificate-frame.png');
    this.load.image('book-ee709', '/assets/objects/coursework/book-ee709.png');
    this.load.image('book-ee782', '/assets/objects/coursework/book-ee782.png');
    this.load.image('book-ds303', '/assets/objects/coursework/book-DS303.png');
    this.load.image('book-cs213', '/assets/objects/coursework/book-CS213.png');

    // COLLECTIBLES
    this.load.image('star-gold', '/assets/collectibles/stars/star-gold.png');
    this.load.image('star-rainbow', '/assets/collectibles/stars/star-rainbow.png');

    // TECH ICONS
    // Frontend
    this.load.image('icon-react', '/assets/skills/frontend/react.png');
    this.load.image('icon-angular', '/assets/skills/frontend/angular.png');
    this.load.image('icon-vue', '/assets/skills/frontend/vuedotjs.png');
    this.load.image('icon-tailwind', '/assets/skills/frontend/tailwindcss.png');
    this.load.image('icon-html', '/assets/skills/frontend/html5.png');
    this.load.image('icon-css', '/assets/skills/frontend/css.svg.png');
    this.load.image('icon-javascript', '/assets/skills/frontend/javascript.png');
    this.load.image('icon-bootstrap', '/assets/skills/frontend/bootstrap.png');

    // ML
    this.load.image('icon-python', '/assets/skills/ml/python.png');
    this.load.image('icon-pytorch', '/assets/skills/ml/pytorch.png');
    this.load.image('icon-tensorflow', '/assets/skills/ml/tensorflow.png');
    this.load.image('icon-opencv', '/assets/skills/ml/opencv.png');
    this.load.image('icon-numpy', '/assets/skills/ml/numpy.png');
    this.load.image('icon-pandas', '/assets/skills/ml/pandas.png');
    this.load.image('icon-jupyter', '/assets/skills/ml/jupyter.png');
    this.load.image('icon-scikit', '/assets/skills/ml/scikitlearn.png');

    // Backend
    this.load.image('icon-express', '/assets/skills/backend/express.png');
    this.load.image('icon-mysql', '/assets/skills/backend/mysql.png');

    // Systems
    this.load.image('icon-linux', '/assets/skills/systems/linux.png');
    this.load.image('icon-git', '/assets/skills/systems/git.png');
    this.load.image('icon-github', '/assets/skills/systems/github.png');
    this.load.image('icon-kubernetes', '/assets/skills/systems/kubernetes.png');
    this.load.image('icon-nginx', '/assets/skills/systems/nginx.png');

    // PLAYER SPRITESHEET
    this.load.spritesheet(
      'krishna-idle',
      '/assets/characters/krishna/krishna-idle.png',
      {
        frameWidth: 32,
        frameHeight: 48
      }
    );
  }

  create() {}
}
