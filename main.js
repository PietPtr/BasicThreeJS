
const resources = new ResourceManager();
const resourcePromises = [resources.loadModels(), resources.loadTextures(), resources.loadFonts()];
let world = undefined;

Promise.all(resourcePromises).then(() => {
    world = new World();
    world.start();
});
