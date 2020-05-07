
class SoundController {
    constructor(_) {
        this._ = _;
        _.soundFormats('mp3', 'ogg');
        this.cursorFireSound    = _.loadSound('/assets/sounds/laser-beam.mp3');
        this.cursorDamageSound  = _.loadSound('/assets/sounds/cursor-damage.mp3');
        this.cursorLootSound    = _.loadSound('/assets/sounds/cursor-loot.mp3');
        this.asteroidSpawnSound = _.loadSound('/assets/sounds/asteroid-spawn.mp3');
        this.asteroidCrashSound = _.loadSound('/assets/sounds/asteroid-explode.mp3');
    }

    
    soundInit() {
        // CURSOR LASER SOUND
        this.cursorFireSound.amp(0.5);
        // CURSOR DAMAGE
        this.cursorDamageSound.amp(0.1);
        // CURSOR LOOT
        this.cursorLootSound.amp(0.33);
        // ASTEROID SPAWN
        this.asteroidSpawnSound.amp(1);
        // ASTEROID CRASH
        this.asteroidCrashSound.amp(0.5);
    }

    soundMute() {
        // CURSOR LASER SOUND
        this.cursorFireSound.amp(0);
        // CURSOR DAMAGE
        this.cursorDamageSound.amp(0);
        // CURSOR LOOT
        this.cursorLootSound.amp(0);
        // ASTEROID SPAWN
        this.asteroidSpawnSound.amp(0);
        // ASTEROID CRASH
        this.asteroidCrashSound.amp(0);
    }
}

export default SoundController;
