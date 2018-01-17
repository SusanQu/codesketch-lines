(function() {

var scene, camera, renderer, controls, clock;
var graph, material, mesh, line;

//dark gray, light gray
var colors = [0x50514f, 0xf0f0f0];
var frustumSize = 500;
var aspect = window.innerWidth / window.innerHeight;

init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( colors[1] );

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
      color: new THREE.Color( colors[ color ] ),
      lineWidth: width,
      opacity: opacity,
      transparent: true
    });

    mesh = new THREE.Mesh( line.geometry, material );
    graph.add( mesh );
}

function createLines(){

    for (var i = 0; i<20; i++){
      var lineHeight = i;
      var lineOpacity = i * 0.1 / 2;
      var line = new THREE.Geometry();
      line.vertices.push( new THREE.Vector3( 5, lineHeight, 0 ) );
      line.vertices.push( new THREE.Vector3( -5, lineHeight, 0 ) );
      makeLine( line, 0, 0.05, lineOpacity);
    }
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
    graph.rotation.y += 0.35 * clock.getDelta();
    renderer.render( scene, camera );

}

})();
