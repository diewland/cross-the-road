// config
var max_plate = 10;

// initialize
var scene       = document.querySelector('a-scene');
var player      = document.querySelector('#player');
var start_plate = document.querySelector('#start');
var goal_plate  = document.querySelector('#goal');

// functions
function create_wood_plate(position, speed){
  var el = document.createElement('a-box');
  el.setAttribute('class', 'wood-plate');
  el.setAttribute('color', '#804000');
  el.setAttribute('width', 4);
  el.setAttribute('height', 0.25);
  el.setAttribute('depth', 1);
  el.setAttribute('position', position);
  el.setAttribute('toggle-velocity', `axis: x; min: -10; max: 10; speed: ${speed}`);
  el.setAttribute('static-body', '');
  return el;
}

// render wood plate
var next_z = -3;
var next_speed = 1;
for(var i=1; i<=max_plate; i++){
  // add plate
  var o = create_wood_plate(`0 1 ${next_z}`, next_speed);
  scene.append(o);

  // update next plate properties
  next_z -= 1.5;
  next_speed += 1;
}

// update goal plate position
goal_pos = goal_plate.getAttribute('position');
goal_pos.z = next_z-3; // 4.5 unit from last wood plate
goal_plate.setAttribute('position', goal_pos);

// event
document.onkeydown = function (e) {
  e = e || window.event;
  switch (e.which || e.keyCode) {
    case 13 :
      // when press Enter, move back to start plate
      player.setAttribute('position', '0 2 0');
      break;
  }
}
