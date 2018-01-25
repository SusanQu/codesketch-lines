(function() {

var scene, camera, renderer, controls, aspect, clock;
var graph, material, mesh, line, particle;

// Custom global variables
var colors = [0x50514f, 0xf0b67f, 0xf25f5c, 0x70c1b3];
var frustumSize = 500;
var mouseX = 0, mouseY = 0;
var raycaster = new THREE.Raycaster();



init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    aspect = window.innerWidth / window.innerHeight;
    //camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 20, frustumSize * aspect / 20, frustumSize / 20, frustumSize / - 20, 1, 10000 );
    //camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 100 );
    //camera.position.z = 100;
    camera.position.set( 50, 50, 0 );

    // var cameraOrthoHelper = new THREE.CameraHelper( camera );
		// scene.add( cameraOrthoHelper );


    graph = new THREE.Object3D();
    scene.add(graph);


    // createLines();

    for(var i=0; i<300; i++){
      createRandomLines();
    }


    // Grid
		// var gridHelper = new THREE.GridHelper( 1000, 20 );
		// scene.add( gridHelper );




    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    clock = new THREE.Clock();

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

    //document.addEventListener('mousemove', onMouseMove, false);

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


function createRandomLines(){
  //random line
  var randomLine = new THREE.Geometry();

  var point = new THREE.Vector3();
  var direction = new THREE.Vector3();
  for ( var i = 0; i < 30; i ++ ) {
    direction.x += Math.random() * 2 -1;
    direction.y += Math.random() * 2 -1;
    direction.z += Math.random() * 2 -1;
    direction.normalize().multiplyScalar( 1 );
    point.add( direction );
    randomLine.vertices.push( point.clone() );
  }

  var opacity = Math.random();
  var lineWidth = Math.random() * 0.01;

  makeLine(randomLine, 0, lineWidth, opacity);
}


function onWindowResize() {
  var aspect = window.innerWidth / window.innerHeight;

  camera.left   = - frustumSize * aspect / 2;
  camera.right  =   frustumSize * aspect / 2;
  camera.top    =   frustumSize / 2;
  camera.bottom = - frustumSize / 2;

  //camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );


}


function animate() {

    requestAnimationFrame( animate );

    controls.update();

    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
		camera.lookAt( scene.position );

    graph.rotation.x += 0.01;
    graph.rotation.y += 0.02 * clock.getDelta();

    renderer.render( scene, camera );

}

})();
