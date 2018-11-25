//Tutorial: https://www.learnthreejs.com/load-3d-model-using-three-js-obj-loader/
//3D model download: https://free3d.com/3d-models/sheep
(function() {

var scene, camera, renderer, controls, clock;
var keyLight, fillLight, backLight;
var material, mesh, line, loader, wireframe;

//dark gray, light gray
var colors = [0xf7adad];
var frustumSize = 500;
var aspect = window.innerWidth / window.innerHeight;

init();
makeLights();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( colors[0] );

    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 20, frustumSize * aspect / 20, frustumSize / 20, frustumSize / - 20, 1, 10000 );
    camera.position.set( 50, 50, 0 );


    graph = new THREE.Object3D();
    scene.add(graph);



    loader = new THREE.OBJLoader();
    loader.load(
      '../resources/bunny.obj',
      function(obj){
        graph.add(obj);
      }
    );



    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    clock = new THREE.Clock();

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );



}

function makeLights(){
    keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);
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
    graph.rotation.x += 0.005;
	  graph.rotation.y += 0.005;

    renderer.render( scene, camera );

}

})();
