//Tutorial: https://www.learnthreejs.com/load-3d-model-using-three-js-obj-loader/
//3D model download: https://free3d.com/3d-models/sheep
(function() {

var scene, camera, renderer, controls, clock;
var keyLight, fillLight, backLight;
var material, mesh, line, loader, wireframe;

//light peach
//var colors = [0xfcb79a];
var colors = [0xffc7b0];

var frustumSize = 500;
var aspect = window.innerWidth / window.innerHeight;

init();
makeLights();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( colors[0] );

    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 20, frustumSize * aspect / 20, frustumSize / 20, frustumSize / - 20, 1, 10000 );
    //camera.position.set( 50, 50, 0 );
    camera.position.set( 5, 5, 10 );


    graph = new THREE.Object3D();
    scene.add(graph);



    loader = new THREE.OBJLoader();
    loader.load(
      '../resources/bunny.obj',
      function(obj){

        obj.traverse(function(child){
          if (child instanceof THREE.Mesh){
              var geometry = child.geometry;
              material = child.material;
              obj = new THREE.Mesh(geometry, material);
              graph.add(obj);
          }

          var useWireFrame = true;
            if(useWireFrame){
              obj.traverse(function(child){
                  if (child instanceof THREE.Mesh){
                    child.material.wireframe = true;
                    child.material.wireframeLineWidth = 10;
                    //child.material.color = new THREE.Color( 0xc08f35 );
                    child.material.color = new THREE.Color( 0xd4844c );
                    child.material.emissive = new THREE.Color( 0x783a3a );
                  }
              });
            }
        });

        //obj.position.y = 5;
        //obj.position.x = 5;
        obj.position.y = 0;
        obj.position.z = -15;

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
    // keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    // keyLight.position.set(-100, 0, 100);
    //
    // fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    // fillLight.position.set(100, 0, 100);
    //
    // backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    // backLight.position.set(100, 0, -100).normalize();
    //
    // scene.add(keyLight);
    // scene.add(fillLight);
    // scene.add(backLight);

    var ambientLight = new THREE.AmbientLight( 0x000000 );
    scene.add( ambientLight );

    var lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    scene.add( lights[ 0 ] );
    scene.add( lights[ 1 ] );
    scene.add( lights[ 2 ] );

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
