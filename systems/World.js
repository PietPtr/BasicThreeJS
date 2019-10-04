

class World {
    constructor() {
        if (!World.instance) {
            this.gameloops = {
                'default': new Gameloop()
            }

            this.activeLoop = 'default';
            this.animationFrameID = undefined;

            this.scenes = {};
            this.activeScene = "world";

            this.clock = new Clock(2800000000000);

            World.instance = this;
        }

        return World.instance;
    }

    start() {
        this.addScene(new THREE.Scene(), 'world');
        this.switchScene('world');

        this.scenes['world'].updateMatrixWorld(true);

        if (DEBUG_LIGHTS) {
            let light = new THREE.AmbientLight( 0x666666 );
            this.scenes['world'].add( light );
        }

        for (let loop in this.gameloops) {
            this.gameloops[loop].init();
        }

        this.switchTo(this.activeLoop)

        // ---- set up all world objects here ----

        this.sunlight = new THREE.DirectionalLight( 0xffffff, 1 );
        this.sunlight.position.set(10, 0, 0);
        this.sunlight.target.position.set(0, 0, 0);
        this.scenes['world'].add(this.sunlight.target);
        this.scenes['world'].add(this.sunlight);

        var geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 64 );
        var material = new THREE.MeshPhongMaterial( { color: 0xff6400 } );
        var torusKnot = new THREE.Mesh( geometry, material );
        this.scenes['world'].add( torusKnot );

        // ---------------------------------------

        var lastTimeMsec = null

        let animate = (nowMsec) => {
            this.animationFrameID = requestAnimationFrame(animate);

            lastTimeMsec = lastTimeMsec || nowMsec-1000/60;
            var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
            lastTimeMsec = nowMsec;

            this.onFrame(deltaMsec / 1000, nowMsec / 1000)
            this.gameloops[this.activeLoop].onFrame(deltaMsec / 1000, nowMsec / 1000);

        };
        this.animationFrameID = requestAnimationFrame(animate);

    }

    switchTo(loop) {
        if (this.activeLoop) {
            this.gameloops[this.activeLoop].stop();
        }

        this.activeLoop = loop;

        this.gameloops[this.activeLoop].start();
    }

    switchScene(sceneName) {
        this.activeScene = sceneName;
    }

    addScene(scene, name) {
        this.scenes[name] = scene;
    }

    getScene(name) {
        return this.scenes[name];
    }

    scene() {
        return this.scenes[this.activeScene];
    }

    onFrame(dt, time) {
        this.clock.tick(dt);
    }


}
