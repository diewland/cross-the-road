// append dialog
var dialog_tpl = `
<style type='text/css'>
  .intro-overlay {
    z-index: 1;
    position: absolute;
    top: 20px;
    left: 20px;
    max-width: 280px;
    box-sizing: border-box;
    padding: 1.5em;
    color: #FFF;
    background: #222;
    font-family: Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif;
  }
  .intro-overlay-link {
    display: inline-block;
    float: right;
    padding: 0.3em 1em 0.35em;
    margin-top: 1em;
    text-decoration: none;
    color: #fff;
    background: #333;
  }
  .intro-overlay-link:hover { background: #444; }
  @media screen and (min-width: 550px) {
    .intro-overlay { max-width: 450px; }
  }
</style>
<div class="intro-overlay" style="display: block;">
  <p>Move around with WASD keys, ←↑→↓, or a USB gamepad.</p>
  <p>Pair code: “<span data-bind="pairCode"></span>”</p>
  <div><a href="javascript:void(0)" class="intro-overlay-link">Got it!</a></div>
</div>`;
document.querySelector('.proxy-control').innerHTML += dialog_tpl;

// initialize script
var scene = document.querySelector('a-scene'),
    proxyUrl = 'https://proxy-controls.donmccurdy.com'; //location.protocol + '//' + location.host;
scene.setAttribute('proxy-controls', {proxyUrl: proxyUrl, enableOverlay: false});
scene.addEventListener('proxycontrols.paircode', function (e) {
  var pairCode = e.detail.pairCode,
      overlay = document.querySelector('.intro-overlay'),
      overlayLink = document.querySelector('.intro-overlay-link');
  overlay.querySelector('[data-bind=pairCode]').textContent = pairCode;
  overlay.style.display = '';
  overlayLink.addEventListener('click', function () { overlay.remove(); });
});

// add restart button
document.querySelector('a-scene').addEventListener('gamepadbuttondown', function (e) {
  console.log(e.detail.index);
  if(e.detail.index == 2){ // button 3
    e.target.setAttribute('position', '0 2 0');
  }
});
