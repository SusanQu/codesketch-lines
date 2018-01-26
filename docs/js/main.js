(function() {

var scene, camera, renderer, controls, aspect, clock;
var graph, material, mesh, line, particle;

// Custom global variables
var colors = [0x2624b5, 0x3c3c3c, 0xf0b67f, 0xf25f5c, 0x70c1b3];
var frustumSize = 500;
var mouseX = 0, mouseY = 0;


init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xfafafa );

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

    for(var i=0; i<150; i++){
      createRandomLines();
    }

    //makeLine(createCurve(), 3, 0.01, 0.5);

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
  for ( var i = 0; i < 50; i ++ ) {
    direction.x += Math.random() * 2 -1;
    direction.y += Math.random() * 2 -1;
    direction.z += Math.random() * 2 -1;
    direction.normalize().multiplyScalar( 10 );
    point.add( direction );
    randomLine.vertices.push( point.clone() );
  }

  var opacity = Math.random();
  var lineWidth = Math.random() * 0.01;

  makeLine(createCurve(), 0, lineWidth, opacity);
}


function createCurve() {

	var s = new THREE.ConstantSpline();
	var rMin = 5;
	var rMax = 10;

	s.inc = .001;
	s.p0 = new THREE.Vector3( 0.5 - Math.random(), 0.5 - Math.random(), 0.5 - Math.random() );
	//s.p0.set( 0, 0, 0 );
	s.p0.set( Math.random()*1, -Math.random()*1, -Math.random()*1 );
	s.p1 = s.p0.clone().add( new THREE.Vector3( 0.5 - Math.random(), 0.5 - Math.random(), 0.5 - Math.random() ) );
	s.p2 = s.p1.clone().add( new THREE.Vector3( 0.5 - Math.random(), 0.5 - Math.random(), 0.5 - Math.random() ) );
	s.p3 = s.p2.clone().add( new THREE.Vector3( 0.5 - Math.random(), 0.5 - Math.random(), 0.5 - Math.random() ) );
	s.p0.multiplyScalar( rMin + Math.random() * rMax );
	s.p1.multiplyScalar( rMin + Math.random() * rMax );
	s.p2.multiplyScalar( rMin + Math.random() * rMax );
	s.p3.multiplyScalar( rMin + Math.random() * rMax );

	s.calculate();
	var geometry = new THREE.Geometry();
	s.calculateDistances();
	//s.reticulate( { distancePerStep: .1 });
	s.reticulate( { steps: 500 } );
 	var geometry = new THREE.Geometry();

	for( var j = 0; j < s.lPoints.length - 1; j++ ) {
		geometry.vertices.push( s.lPoints[ j ].clone() );
	}

	return geometry;

}


//need to fix onWindowResize
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

    // camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		// camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
		// camera.lookAt( scene.position );

    graph.rotation.x += 0.0075;
    graph.rotation.y += 0.02 * clock.getDelta();

    renderer.render( scene, camera );

}

})();
