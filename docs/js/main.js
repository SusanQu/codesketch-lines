(function() {

var scene, camera, renderer, controls, clock;
var graph, material, mesh, line;

//dark gray, light gray
//var colors = [0x50514f, 0xf0f0f0, 0xcca2d2];
//rainbow color

var colors = [0x31262a, 0x6e3324, 0x7e3621, 0x833820, 0x99401f, 0xa64612, 0xcc8402, 0xcd8300, 0xcf9201, 0xedbc02, 0xc39b00, 0x9c9e01, 0x749d23, 0x42953a, 0x329447, 0x2e9a5d,
0x188a6f, 0x2e716d, 0x466369, 0x66616a, 0x66616a, 0x922e5b, 0xa92745, 0xa21e3a, 0xbf042b];

//var colors = rainbowColor();
var frustumSize = 500;
var aspect = window.innerWidth / window.innerHeight;

init();
animate();
rainbowColor();

function init() {

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
      renderer.setSize(window.innerWidth, window.innerHeight);
      //renderer.setSize(100, 200);
      renderer.autoClear = false;
      renderer.setClearColor(0x000000, 0.0);

      clock = new THREE.Clock();




    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 20, frustumSize * aspect / 20, frustumSize / 20, frustumSize / - 20, 1, 10000 );
    camera.position.set( 50, 50, 0 );
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    graph = new THREE.Object3D();
    scene = new THREE.Scene();
    scene.add(graph);
    //scene.background = new THREE.Color( 0x1f273a );

    createLines();

    // renderer = new THREE.WebGLRenderer();
    // renderer.setSize( window.innerWidth, window.innerHeight );



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
      line.vertices.push( new THREE.Vector3( 50, lineHeight, 0 ) );
      line.vertices.push( new THREE.Vector3( -50, lineHeight, 0 ) );

      makeLine( line, lineColor , lineWidth, 0.2);
      //makeLine( line, lineColor , lineWidth, lineOpacity);
    }

    for (var i = 0; i<40; i++){
      var lineHeight = i;
      var lineOpacity = i * 0.2 / 2;
      var lineColor = i;
      var line = new THREE.Geometry();
      line.vertices.push( new THREE.Vector3( lineHeight, 5, 0 ) );
      line.vertices.push( new THREE.Vector3( lineHeight, -5, 0 ) );

      makeLine( line, lineColor , lineWidth, 0.2);
      //makeLine( line, lineColor , lineWidth, lineOpacity);
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
