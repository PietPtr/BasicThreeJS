
const DEADZONE = 0.3;
const PATHS = false;
const SPEED = 1;
const ROTATION_SPEED = 0.9;
const MAP_ROTATION_SPEED = 1.5;
const OUTSIDE_ROTATION_SPEED = 2;
const HITDIST = 1.1;

let SHOW_HITBOXES = false;
const DEBUG_LIGHTS = true;

const SCROLLSPEED = 40;
const TO_RAD = Math.PI/180;
const TO_DEG = 180 / Math.PI;
const G = 6.67408e-11;
const USE_LINE_MAP = false;
const MARS_RADIUS = 3389500;
const CROSSHAIR = false;
const ZOOM_FACTOR = 1.05;
const FOV_SCALE_FACTOR = 1.01;
const MAX_DOCK_FOV = 135;
const MIN_DOCK_FOV = 10;
const DELTA_THROTTLE = 1;

const CRAFT_COLOR = 0xffffff;
const PLAYER_COLOR = 0x00ff00;
const TARGET_COLOR = 0x00ffff;

const MARKER_SCALE = 0.02;

const TIMESPAN_ZOOM_FACTOR = 1.04;

const MAX_DOCK_ANGLE = 5 * TO_RAD;
const MAX_DOCK_DISTANCE = 0.09;

const NAV_ARROW_LENGTH = 16;
const SMALL_NAV_ARROW_LENGTH = 12;

const FAR_CAMERA_DISTANCE = 10000000000;

const SMALLEST_ROTRATE = 0.0001;

// Button indices
const A_BTN = 0;
const B_BTN = 1;
const X_BTN = 2;
const Y_BTN = 3;
const LB_BTN = 4;
const RB_BTN = 5;
const LT_BTN = 6;
const RT_BTN = 7;
const BACK_BTN = 8;
const START_BTN = 9;
const LS_BTN = 10;
const RS_BTN = 11;
const UP_BTN = 12;
const DOWN_BTN = 13;
const LEFT_BTN = 14;
const RIGHT_BTN = 15;
const MAIN_BTN = 16;
const LS_RIGHT = 17;
const LS_LEFT = 18;
const LS_DOWN = 19;
const LS_UP = 20;
const RS_RIGHT = 21;
const RS_LEFT = 22;
const RS_DOWN = 23;
const RS_UP = 24;

const LEFT_HORIZONTAL_AXIS = 0;
const LEFT_VERTICAL_AXIS = 1;
const RIGHT_HORIZONTAL_AXIS = 2;
const RIGHT_VERTICAL_AXIS = 3;
