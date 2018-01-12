(function() {

var scene, camera, renderer, controls, aspect;
var graph, geometry, material, mesh, line;

var colors = [0x50514f, 0xf0b67f, 0xf25f5c, 0x70c1b3];
//var frustumSize = 1000;

init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    //camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 2000 );

    camera.position.z = 100;
    //camera.position.set( 50, 10, 0 );


    graph = new THREE.Object3D();
    scene.add(graph);

    for(var i=0; i<50; i++){
      createLines();
    }

    // Grid
		var gridHelper = new THREE.GridHelper( 1000, 20 );
		scene.add( gridHelper );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

    controls = new THREE.OrbitControls( camera, renderer.domElement );

}

function makeLine (geo, color, opacity){

    line = new MeshLine();
    line.setGeometry( geo );

    material = new MeshLineMaterial({
      color: new THREE.Color( colors[ color ] ),
      lineWidth: 0.25,
      opacity: opacity,
      transparent: true
    });

    mesh = new THREE.Mesh( line.geometry, material );
    graph.add( mesh );
}

function createLines(){
    // var line = new Float32Array( 600 );
    // for( var j = 0; j < 200 * 3; j += 3 ) {
    //   line[ j ] = -30 + 0.1 * j;
    //   line[ j + 1 ] = 5 * Math.sin( 0.01 *  j );
    //   line[ j + 2 ] = -40;
    // }
    // makeLine( line, 0 );
    //
    // var line = new Float32Array( 600 );
    // for( var j = 0; j < 200 * 3; j += 3 ) {
    //   line[ j ] = -30 + 0.1 * j;
    //   //line[ j + 1 ] = 5 * Math.sin( 0.01 *  j );
    //   line[ j + 2 ] = -20;
    // }
    // makeLine( line, 1);
    //
    // var line = new Float32Array( 600 );
    // for( var j = 0; j < 200 * 3; j += 3 ) {
    //   line[ j ] = -30 + 0.1 * j;
    //   //line[ j + 1 ] = 5 * Math.sin( 0.01 *  j );
    //   line[ j + 2 ] = -60;
    // }
    // makeLine( line, 2);
    //
    //
    // var line = new THREE.Geometry();
    // line.vertices.push( new THREE.Vector3( -30, -30, -30 ) );
  	// line.vertices.push( new THREE.Vector3( -30, 30, -30 ) );
    // makeLine( line, 0);

    //random line
		var randomLine = new THREE.Geometry();

		var point = new THREE.Vector3();
		var direction = new THREE.Vector3();
		for ( var i = 0; i < 15; i ++ ) {
			direction.x += Math.random() * -0.5;
			direction.y += Math.random() * 0.5;
			direction.z += Math.random() * 0.5;
			//direction.normalize().multiplyScalar( 5 );
			point.add( direction );
			randomLine.vertices.push( point.clone() );
		}

    var opacity = Math.random();

    makeLine(randomLine, 0, opacity);


    // Three.Vector(x, y, z)
    //left back
    // var line = new THREE.Geometry();
    // line.vertices.push( new THREE.Vector3( 0, 20, 0 ) );
    // line.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
    // makeLine( line, 3);
    //
    // //right back
    // var line = new THREE.Geometry();
    // line.vertices.push( new THREE.Vector3( 20, 0, 0 ) );
    // line.vertices.push( new THREE.Vector3( 20, 20, 0 ) );
    // makeLine( line, 3);
    //
    // //back top
    // var line = new THREE.Geometry();
    // line.vertices.push( new THREE.Vector3( 0, 20, 0 ) );
    // line.vertices.push( new THREE.Vector3( 20, 20, 0 ) );
    // makeLine( line, 3);
    //
    // var line = new THREE.Geometry();
    // line.vertices.push( new THREE.Vector3( 20, 0, 0 ) );
    // line.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
    // makeLine( line, 3);
    //
    // var line = new THREE.Geometry();
    // line.vertices.push( new THREE.Vector3( 0, 0, 20 ) );
    // line.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
    // makeLine( line, 3);
    //
    // var line = new THREE.Geometry();
    // line.vertices.push( new THREE.Vector3( 0, 0, 20 ) );
    // line.vertices.push( new THREE.Vector3( 0, -20, 20 ) );
    // makeLine( line, 3);
    //
    // var line = new THREE.Geometry();
    // line.vertices.push( new THREE.Vector3( 20, 0, 0 ) );
    // line.vertices.push( new THREE.Vector3( 20, 0, 20 ) );
    // makeLine( line, 3);
    //
    // //right front leg
    // var line = new THREE.Geometry();
    // line.vertices.push( new THREE.Vector3( 20, 0, 20 ) );
    // //right front bottom
    // line.vertices.push( new THREE.Vector3( 20, -20, 20 ) );
    // makeLine( line, 3);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {

    requestAnimationFrame( animate );

    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.01;

    renderer.render( scene, camera );

}

})();
