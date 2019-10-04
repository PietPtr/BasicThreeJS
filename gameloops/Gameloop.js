

class Gameloop {
    constructor() {

    }

    init() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setClearColor(new THREE.Color('#000000'), 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }, false);

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, FAR_CAMERA_DISTANCE);
        this.camera.position.set(0, 0, 40);
        this.controls = new THREE.OrbitControls(this.camera);
    }

    start() {

    }

    stop() {

    }

    onFrame(dt, time) {
        this.renderer.render( world.getScene('world'), this.camera );
    }

    updateKeys(axes, buttons, dt, pressed) {
    }
}
