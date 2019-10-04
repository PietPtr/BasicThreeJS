let seed = Math.random() * 51413;

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function loadMTL(name) {
    return new Promise(resolve => {
        let loader = new THREE.MTLLoader();
        let path = name.split("/");
        path.pop();
        let folder = path.join("/") + "/";

        loader.setTexturePath('/resources/models/obj/' + folder);
        loader.setPath('/resources/models/obj/');

        return loader.load(name + '.mtl', resolve);
    })
}

function loadOBJ(name, materials) {
    return new Promise(resolve => {
        let loader = new THREE.OBJLoader();
        loader.setMaterials(materials);
        loader.setPath('/resources/models/obj/');

        return loader.load(name + '.obj', resolve);
    })
}

function loadModel(name) {
    let mtlPromise = loadMTL(name).then(materials => {
        return materials;
    });

    let objPromise = mtlPromise.then(materials => {
        return loadOBJ(name, materials);
    });

    return objPromise
}

function loadTexture(name) {
    return new Promise(resolve => {
        new THREE.TextureLoader().load("/resources/textures/" + name, resolve);
    });
}

function loadFont(name) {
    return new Promise(resolve => {
        new THREE.FontLoader().load("/resources/fonts/" + name + ".typeface.json", resolve);
    })
}

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

function acos(value) {
    if (value > 1) {
        value = 1;
    }
    let result = Math.acos(value);
    if (isNaN(result)) {
        throw 'acos(' + value + ') returns NaN!';
    } else {
        return result;
    }
}


function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    return minIndex;
}

function secsToText(secs) {
    if (secs < 1) {
        return Math.round(secs * 1000) + ' ms'
    } else if (secs < 60) {
        return Math.round(secs) + ' s';
    } else if (secs < 60 * 60) {
        return Math.round(secs / 60) + ' mins';
    } else if (secs < 60 * 60 * 24) {
        return Math.round(secs / 60 / 60) + ' hrs';
    } else {
        return Math.round(secs / 60 / 60 / 24) + ' days';
    }

}



function save(name) {
    let saves = JSON.parse(localStorage.getItem('saves'));
    if (!saves) {
        saves = {};
    }

    data = {
        spacecraft: spacecraft.makeJSON(),
        clock: clock.makeJSON()
    }

    saves[name] = data;

    console.log(name, saves);

    localStorage.setItem('saves', JSON.stringify(saves));
}

function saveFiles() {
    return JSON.parse(localStorage.getItem('saves'));
}

function load(name) {
    data = JSON.parse(localStorage.getItem('saves'))[name];

    console.log(data);

    for (let name in data.spacecraft) {
        spacecraft.spacecraft[name].fromJSON(data.spacecraft[name])
    }

    clock.fromJSON(data.clock);
}

function getValueFromId(id) {
    return document.getElementById(id).value;
}

function getFloatFromId(id) {
    let result = parseFloat(getValueFromId(id));
    if (!result) {
        return 0;
    }
    return result;
}
