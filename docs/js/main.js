(function() {

var scene, camera, renderer, controls, aspect, clock;
var graph, material, mesh, line, particles, particle, randomLine;

//0.dark gray, 1.orange, 2.red, 3.teal, 4.white, 5.dark blue
var colors = [0x50514f, 0xf0b67f, 0xf25f5c, 0x70c1b3, 0xe9e9e9, 0x324668];
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

//the makeLine() function is embedded in createParticle()
// function makeLine (geo, color, width, opacity){
//
//     line = new MeshLine();
//     line.setGeometry( geo );
//
//     material = new MeshLineMaterial({
//       color: new THREE.Color( colors[ color ] ),
//       lineWidth: width,
//       opacity: opacity,
//       transparent: true
//     });
//
//     mesh = new THREE.Mesh( line.geometry, material );
//
//     graph.add( mesh );
// }


function createParticle(){

	//Create a geometry used for the particles which contains nothing for now
	var geometry = new THREE.Geometry();
	var vertices0 = new THREE.Vector3(0, (Math.random()-0.5)*100, (20-Math.random()*40));
	var vertices1 = new THREE.Vector3(vertices0.x+5, vertices0.y, vertices0.z);

	//apply our vector inside the geometry
	geometry.vertices.push(vertices0, vertices1);

  particle = new MeshLine();
  particle.setGeometry( geometry );

  material = new MeshLineMaterial({
    color: new THREE.Color( colors[5] ),
    lineWidth: Math.random() * 0.35,
    opacity: Math.random() * 0.85,
    transparent: true
  });

  particle = new THREE.Mesh(particle.geometry, material);

	//create a random speed for each particle for aesthetics
	particle.speed = 0.03+ (Math.random()-0.5)/1000;

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

		//move particle closer to its destination, need to use position, not vertices
		particle.position.x += particle.direction.x * particle.speed;
		particle.position.y += particle.direction.y  * particle.speed;
		particle.position.z += particle.direction.z * particle.speed;

    //reduce the opacity of the particle
		particle.material.opacity -= 0.005;

    //Prevents ThreeJs the particle has moved
		particle.geometry.verticesNeedUpdate = true;

		//If the opacity of the particle is too low
		if(particle.material.opacity < 0.05){
			//remove our particle from the scene
			particles.remove(particle);
			//The loop must go through the same 'i' because we removed one particle from the array
			i--;
      j--;
		}
	}
}

})();
