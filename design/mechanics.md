# Mechanics

## World exploration
Walking around the world is more or less on rails, the player cannot see themselves and can float around the spacecraft in predetermined paths, in this way we don't have to implement weird collision detection or zero g movement. The player is free to move along the path, forward and backward, and rotate, since orientations can change quite a bit in zero g structures.

## Rendezvous
Split the rendezvous in 2 phases/interfaces. A plane change phase and an orbital synchronization phase.
- Manouver planner:
    Always in view. Allows user to exactly plan manouvers by setting the three vectors, and the time of the manouver exactly. The manouver node is then rendered in all views.
- Plane change:
    View of the two orbits straight on the ascending/descending node, with timer until the node is reached. Here the user can easily align the orbits. When the planes differ by a very small amount the ship can offer to correct it.
- Orbital synchronization:
    - Sinusoidal graph plotting the distance of the two objects over time. When hovering over a position here the relative speed will also be shown.
    - Top view of the two orbits
    Using the top view the user can approximately align the orbits inside their plane by planning and executing manouvers. After the orbits look the same, except higher/lower (for cating up or being caught up), the user can look at the sinusoidal graph to see when and how close the spacecraft will be.

    While in this UI, the ship can speed/slow time again for the player, since they are brainlinked.

## Docking
Docking is done via the ship view, so you can actually see the other ship and the planet etc. There are HUD elements though, like the selected docking port, relative speed, orientation, etc, that the ship projects into your vision.

When the player is happy with the planned rendezvous, the ship will go into docking mode a few minutes before the closest encounter. First the player must make sure the relative speed is small at the moment of closest approach. The ship will alarm the player about their relative speed, and the player will have a button to align the ship correctly to this vector. When the speed is zero the player can align the ship to the docking of the target. The port can be selected via a cycle through menu with the bumpers. Using the left stick the player can move up down left right, and with the triggers forward and backwards. At this point they may receive communications from the other ship. When the player is near the docking port, they can lock together and be docked.

## Battles
- 2D Interface
    - Showing the time of the battle in nanoseconds, at 30cm/ns light is easily visibly travelling at those timescales.
    - The ship itself, consisting of:
        - n rectangles
        - laser pods with directions and different powers
        - effectors? devices that can extend physical forcefields at the speed of light in certain directions
        - reverser field effectors
    - currently selected weapon

Interaction loop:
Player selects a weapon (bumpers) and sets it to either autofire (ABXY), fires it by hand (trigger), changes its direction (right stick), its field shape (right stick).

Player can rotate the ship (left stick) and toggle engines (left trigger)

Give the ship deterministic commands, e.g. when focussing a laser, press A to autofocus on the other ship.

This to land hits on the enemy ship, changing the color of rectangles until they are all red, or only the mind is red (mind is usually located in strategic positions)


After the battle, allow playback (maybe even in 3D) at near realtime speed.
