(function() {

var scene, camera, renderer, controls, clock;
var graph, material, mesh, line;

//dark gray, light gray
//var colors = [0x50514f, 0xf0f0f0, 0xcca2d2];
//rainbow color
var colors = [0x8012ed, 0xbf01bf, 0xed1280, 0xff4040, 0xed7f12, 0xbfbf01, 0x80ed12, 0x40ff40, 0x12ed7f, 0x01bfbf, 0x1280ed, 0x4040ff, 0x1280ed, 0x01bfbf, 0x12ed7f, 0x40ff40, 0x80ed12, 0xbfbf01, 0xed7f12, 0xff4040, 0xed1280, 0xbf01bf, 0x8012ed, 0xbf01bf, 0xed1280, 0xff4040];
//var colors = rainbowColor();
var frustumSize = 500;
var aspect = window.innerWidth / window.innerHeight;

init();
animate();
rainbowColor();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 20, frustumSize * aspect / 20, frustumSize / 20, frustumSize / - 20, 1, 10000 );
    camera.position.set( 50, 50, 0 );

    graph = new THREE.Object3D();
    scene.add(graph);

    createLines();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    clock = new THREE.Clock();

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

}

function makeLine (geo, color, width, opacity){

    line = new MeshLine();
    line.setGeometry( geo );

    material = new MeshLineMaterial({
      color: new THREE.Color(colors[color]),
      lineWidth: width,
      opacity: opacity,
      transparent: true
    });

    mesh = new THREE.Mesh( line.geometry, material );
    graph.add( mesh );
}


function createLines(){
    var lineWidth = 1;

    for (var i = 0; i<40; i++){
      var lineHeight = i;
      var lineOpacity = i * 0.1 / 2;
      var lineColor = i;
      var line = new THREE.Geometry();
      line.vertices.push( new THREE.Vector3( 100, lineHeight, 0 ) );
      line.vertices.push( new THREE.Vector3( -100, lineHeight, 0 ) );

      makeLine( line, lineColor , lineWidth, 0.1);
    }

    for (var i = 0; i<40; i++){
      var lineHeight = i;
      var lineOpacity = i * 0.1 / 2;
      var lineColor = i;
      var line = new THREE.Geometry();
      line.vertices.push( new THREE.Vector3( lineHeight, 100, 0 ) );
      line.vertices.push( new THREE.Vector3( lineHeight, -100, 0 ) );

      makeLine( line, lineColor , lineWidth, 0.1);
    }
}



function rainbowColor(){
    var size    = 12;
    var rainbow = [];

    for (var i=0; i<size; i++) {
      var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
      var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
      var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

      rainbow[i] = '0x'+ red + green + blue;
      rainbow.push(i);
    }

    function sin_to_hex(i, phase) {
      var sin = Math.sin(Math.PI / size * 2 * i + phase);
      var int = Math.floor(sin * 127) + 128;
      var hex = int.toString(16);

      return hex.length === 1 ? '0'+hex : hex;
    }

    return rainbow;
}


function onWindowResize() {

  camera.left   = - frustumSize * aspect / 2;
  camera.right  =   frustumSize * aspect / 2;
  camera.top    =   frustumSize / 2;
  camera.bottom = - frustumSize / 2;

  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    requestAnimationFrame( animate );
    controls.update();
    graph.rotation.x += 0.19 * clock.getDelta();

    renderer.render( scene, camera );

}

})();
