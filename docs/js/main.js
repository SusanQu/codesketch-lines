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
    //camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 20, frustumSize * aspect / 20, frustumSize / 20, frustumSize / - 20, 1, 10000 );
    //camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 100 );
    //camera.position.z = 100;
    camera.position.set( 50, 50, 0 );

    // var cameraOrthoHelper = new THREE.CameraHelper( camera );
		// scene.add( cameraOrthoHelper );


    graph = new THREE.Object3D();
    scene.add(graph);



  //for(var i=0; i<particleCount; i++){
    createRandomLines();
  //  }

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

	//Create a geometry used for the particles which contains nothing for now
	var geometry = new THREE.Geometry();
	var vertices = new THREE.Vector3(
		5,
		1,
		10
	);
	//apply our vector inside the geometry
	geometry.vertices.push(vertices);
	//We create a white material
	//sizeAttenuation defines if the particle will be small if far from the camera
	var material = new THREE.PointsMaterial({
		color : colors[2],
		size : 20,
		transparent : true,
		sizeAttenuation : false
  });
  //Point cloud is a specific Mesh for particles
	particle = new THREE.Points(geometry, material);

	//create a random speed for each particle for aesthetics
	particle.speed = Math.random()/100+0.002;

	//We set a random position for each particle
	particle.direction = {
		x : (Math.random() - 0.5)*100*2,
		y : (Math.random() - 0.5)*100*2
	};

	particles.add(particle);
}

function createLines(){

    for (var i = 0; i<5; i++){
      var lineHeight = i;
      var lineOpacity = i * 0.1 / 2;
      var line = new THREE.Geometry();
      line.vertices.push( new THREE.Vector3( 5, lineHeight, 0 ) );
      line.vertices.push( new THREE.Vector3( -5, lineHeight, 0 ) );
      makeLine( line, 0, 0.05, lineOpacity);
    }
}


function createRandomLines(){
  //random line
  randomLine = new THREE.Geometry();

  var point = new THREE.Vector3();
  var direction = new THREE.Vector3();
  for ( var i = 0; i < 2; i ++ ) {
    direction.x = (Math.random() * 800) - 400;
    direction.y = (Math.random() * 800) - 400;
    direction.z = (Math.random() * 800) - 400;
    direction.normalize().multiplyScalar( 20 );
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

    render();

}

function render(){
  graph.rotation.y += 0.35 * clock.getDelta();
  renderer.render( scene, camera );
  createParticle();
  for(var i=0, j=particles.children.length; i<j; i++){
		//Get the next particle
		var particle = particles.children[i];

		//We move our particle closer to its destination
		particle.geometry.vertices[0].x += (particle.direction.x - particle.geometry.vertices[0].x)*particle.speed;
		particle.geometry.vertices[0].y += (particle.direction.y - particle.geometry.vertices[0].y)*particle.speed;
		particle.geometry.vertices[0].z += (particle.direction.y - particle.geometry.vertices[0].z)*particle.speed;
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
