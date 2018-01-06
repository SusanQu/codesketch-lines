(function() {

var scene, camera, renderer, controls;
var graph, geometry, material, mesh, line;

var colors = [0x50514f];

init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 100;

    graph = new THREE.Object3D();
    scene.add(graph);

    geometry = new THREE.Geometry();
    for( var j = 0; j < Math.PI; j += 2 * Math.PI / 100 ) {
    	var v = new THREE.Vector3( Math.cos( j ), Math.sin( j ), 0 );
    	geometry.vertices.push( v );
    }

    createLines();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

    controls = new THREE.OrbitControls( camera, renderer.domElement );

}

function makeLine (geo){

    line = new MeshLine();
    line.setGeometry( geo );

    material = new MeshLineMaterial({
      color: new THREE.Color( colors[0] ),
      lineWidth: 5
    });

    mesh = new THREE.Mesh( line.geometry, material );
    graph.add( mesh );
}

function createLines(){
    var line = new Float32Array( 600 );
    for( var j = 0; j < 200 * 3; j += 3 ) {
      line[ j ] = -30 + 0.1 * j;
      //line[ j + 1 ] = 5 * Math.sin( 0.01 *  j );
      line[ j + 2 ] = -20;
    }
    makeLine( line );
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
