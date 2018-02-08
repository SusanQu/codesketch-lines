(function() {

var scene, camera, renderer, controls, aspect, clock;
var graph, material, mesh, line, particles, particle, randomLine;

var colors = [0x50514f, 0xf0b67f, 0xf25f5c, 0x70c1b3];
var frustumSize = 500;


init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    //camera = new THREE.OrthographicCamera( frustumSize * aspect / - 20, frustumSize * aspect / 20, frustumSize / 20, frustumSize / - 20, 1, 10000 );
    //camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 100 );
    //camera.position.z = 100;
    camera.position.set( 50, 50, 0 );

    // var cameraOrthoHelper = new THREE.CameraHelper( camera );
		// scene.add( cameraOrthoHelper );


    graph = new THREE.Object3D();
    scene.add(graph);


    //particles will be the 3D object containing all the particles
    particles = new THREE.Object3D();
    scene.add(particles);


    // Grid
		// var gridHelper = new THREE.GridHelper( 1000, 20 );
		// scene.add( gridHelper );

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


function createParticle(){

	// //Create a geometry used for the particles which contains nothing for now
	// var geometry = new THREE.Geometry();
	// var vertices0 = new THREE.Vector3(0,
  //                                   (Math.random()-0.5)*100,
  //                                   (20-Math.random()*40))
	// var vertices1 = new THREE.Vector3(vertices0.x+6, vertices0.y, vertices0.z);
	// // var vertices3 = new THREE.Vector3(12,17,15);
	// //apply our vector inside the geometry
	// geometry.vertices.push(vertices0, vertices1);
  //
  // var material = new THREE.LineBasicMaterial({
  // 	color: 0x0000ff,
  //   linewidth: 10
  // });

  var geometry = new THREE.BoxGeometry(6,0.1+Math.random(),0.1+Math.random());
  var material = new THREE.MeshBasicMaterial({
  	color: colors[2],
    wireframe:true
  });






  //Point cloud is a specific Mesh for particles
	//particle = new THREE.Points(geometry, materialPoints);
	//particle = new THREE.Points(geometry, materialPoints);
  particle = new THREE.Mesh(geometry, material);
  particle.position.x = 0;
  particle.position.y = (Math.random()-0.5)*100;
  particle.position.z = 20-Math.random()*40;



	//create a random speed for each particle for aesthetics
	particle.speed = 0.02+ (Math.random()-0.5)/1000;

	//We set a random position for each particle
	particle.direction = {
		x : 10,
    y : 0,
    z : 0
	};

	particles.add(particle);
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

    render();

}

function render(){
  //graph.rotation.y += 0.35 * clock.getDelta();
  renderer.render( scene, camera );

  createParticle();

  for(var i=0, j=particles.children.length; i<j; i++){
		//Get the next particle
		var particle = particles.children[i];

		//We move our particle closer to its destination
		particle.position.x += particle.direction.x * particle.speed;
		particle.position.y += particle.direction.y  * particle.speed;
		particle.position.z += particle.direction.z * particle.speed;


    //We reduce the opacity of the particle
		particle.material.opacity -= 0.005;

    //Prevents ThreeJs the particle has moved
		particle.geometry.verticesNeedUpdate = true;

		//If the opacity of the particle is too low
		if(particle.material.opacity < 0.05){
			//We remove our particle from the scene
			particles.remove(particle);
			//The loop must go through the same 'i' because we removed one particle from the array
			i--;
      j--;
		}
	}
}

})();
