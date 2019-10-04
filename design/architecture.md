# Architecture

Make a class for the main gameplay loop, for setting up and loading textures?

Then make (singleton) classes for all gameplay loops:
    - In world exploration
    - Battling
    - Rendezvous
    - Docking
These should contain methods to setup their scenes.
There should be a master class handling gamestate changes


## Components necessary
### x Content loader
Content loader which can load all models and textures and set the correct properties and provide access to them.

### x Scene switcher
We have to be able to switch or overlay 2D canvases quite often, so we have to be able to switch nicely.

The gameloop can now receive keypresses by adding itself to the list of listeners of the controls. This should be enforced by an interface/inheritance. Same goes for the update method;

### x Interactables


### x Text display system
We want the ship and characters to be able to talk, since voice acting is too expensive we'll use a text display system similar to pokemon. The system will display a box along the bottom with the text streaming into view at a set speed. Pressing A allows the player to advance through the text.

This system is probably easiest and fastest to implement in HTML/CSS as an overlay.

### Enriched Text Display system
We want full scripting options for the text displays. This means that text scripts will be defined in the spacecraft definition as anonymous javascript functions. We will need several special methods so we can easily create a script for interacting with ingame objects/people, use variables (for e.g. names), and set flags.

- text(string):

- lookAt(object):

- fadeToBlack():

- fadeToWorld():

- choice(text, choices):

- yesno(text):

### Script triggers
Currently the only way to trigger scripts is to press A on an interactable. We need several other triggers that scripts can hook themselves on.

- onDock(): for spacecraft

- onLeave(): for hitboxes

- onEnter(): for hitboxes

### x Path navigation
We restrict the player movement by providing set paths along which they can advance. These paths are directed graphs (list of nodes with coords, list of edges e as arrays (e[0] -> e[1])) defined in the spacecraft definition format. Allow the player to rotate in two angles with the right stick, and advance along the path with the left stick. When arriving at a junction we move along the path that has the closest angle to where the player is looking at.

### Spacecraft control UI
The UI consists of 3 windows, the data window with the maneuver planner, the map view, and the other monitor. With the gamepad bumpers the player can switch between which window is focused.

Manouver planner focus:

With the dpad/joystick the player can move over the screen of the maneuver planner. Hovering over the arrow and using the joypad the player can quickly increase or decrease the values, and hovering over a single character the player can exercise better precision over the manouver nodes.

Other monitor focus:
Contains access to the distance monitor (sinusoidal graph of ship and target distances).
Also has target selector, which is a list of all known targets (unlocks through the game), going through them the orbit shows on the map screen and pressing A sets the target.
Radio: for communication with nearby ships, or something, i dont know.
Time acceleration: simple arrows for setting the time speed. Also allows choosing a time and going there.

### x Actual ship control
The ship can be controlled when in the ship UI. There should be a clear visual cue when you are actually controlling the ship, and what systems are firing (and at what setting). These can be shown in the map/cam view.

Press START to activate ship control. Press BACK to go back to the regular menu control.
D-Pad: throttle control, up/down for increase, left/right for min/max resp.
Left stick: up/down for pitch, left/right for yaw | up/down for up and down, left/right for left and right
Triggers: roll | forward/backward
Switch translate/rotate controls with Y.

### x NAV Vectors
The nav ball is replaced by navigation vectors. Align with these to burn in the correct direction. Works very well.

### x Docking UI
There is a docking camera in the SpacecraftControl view on the big monitor.

### x Spacecraft Manager
There should be a way to retrieve data from all spacecrafts and their orbits. This manager will be responsible for updating the spacecraft and for getting any information about any craft.

### Docking
When the player craft gets close enough to another spacecraft, the docking ports should start checking for whether we are docking. The docking ships port walks through all other ports and checks if they are facing in the opposite direction with a maximum angle difference of some degrees, and if the distance is small enough. If these requirements are satisfied the craft will dock to the player craft.

When docking we set the player craft orbit to the other crafts orbit. Then we add the other craft as a child of the player mesh at the correct position, and we open the ports.

### Hitboxes
All ships should have defined areas where the player can be in. We want to define these by defining an array of boxes. The player should at all times be inside one of these boxes. An open docking port can add another allowed box to the list.

### Stationkeeping
Since the stations are on rails anyway, we can give them custom update scripts. Define them in SDF as an anonymous function and it will be called at the end of the update function. 

## Spacecraft Definition Format
As a game designer, I want to be able to define spacecraft in an application manner, by delivering a model made with MagicaVoxel and a json structure containing content.
```
spacecraft: {
    model: "station"
    ports: [{
        position: [0, 0, 10],
        rotation: [0, 0, 180],
        name: "Aft port"
    }]
    interactables: [{
        model: "pilot",
        script:
            "if (flags['HAS_COMPLETED']) {
                return "Thank you for completing the quest."
            } else {
                return "Can you fetch this?"
            }"
        position: [0, 5, 0],
        rotation: [0, 180, 0],
        hitboxes: [
            { center: (0, 0, 0), width: 0.5, height: 1.8, depth: 0.5 }
        ]
    }]
}
```

## Model tag
Defines the model of the defined spacecraft. We assume this is always a .obj.

## interactables tag
Define a list of interactable objects. These objects allow the execution of scripts when the player looks at them and presses a, and will show a prompt when the player does so.

### Script property
return this text value when talking to this character. The script will be run in such an environment that it has access to the bag of the player, and a global flag dictionairy.
