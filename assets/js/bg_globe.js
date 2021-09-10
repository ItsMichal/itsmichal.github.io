function init(points){
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#2B2D42")
    // let camera = new THREE.OrthographicCamera( 75, document.getElementById("globe").offsetWidth / document.getElementById("globe").offsetHeight, 0.1, 1000 );
    let camera = new THREE.PerspectiveCamera( 25, document.getElementById("globe").offsetWidth / document.getElementById("globe").offsetHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();

    renderer.setSize( document.getElementById("globe").offsetWidth, document.getElementById("globe").offsetHeight );
    document.getElementById("globe").appendChild( renderer.domElement );

    const radius =  4;    
    const detail = 64;
    const geometry = new THREE.SphereGeometry(radius, detail, detail);
    const material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
    const globe = new THREE.Mesh( geometry, material );
    material.map = globe_map

    const globe_edges = new THREE.EdgesGeometry(geometry);
    const globe_lines = new THREE.LineSegments(globe_edges, new THREE.LineBasicMaterial({ color: 0xFafafa }));
    // scene.add(globe_lines);
    scene.add( globe );
    

    globe.position.y = -3;
    globe_lines.position.y = -3;

    // globe.position.z = -5;
    // globe_lines.position.z = -5;

    camera.position.z = 10;
    camera.rotation.x = 0.4;

    function animate() {
        renderer.setSize( document.getElementById("globe").offsetWidth, document.getElementById("globe").offsetHeight );
        camera.aspect = document.getElementById("globe").offsetWidth / document.getElementById("globe").offsetHeight;
        camera.updateProjectionMatrix();
        requestAnimationFrame( animate );
        globe.rotation.x += 0.0001;
        globe.rotation.y += 0.001;
        globe_lines.rotation.x += 0.000001;
        globe_lines.rotation.y -= 0.0001;
        if (camera.rotation.x > 0){
            camera.rotation.x -= 0.01*camera.rotation.x;
        }
        
        renderer.render( scene, camera );
    }
    animate();
    
}



const loader = new THREE.TextureLoader();
var globe_map;
window.fetch("../assets/js/points.json")
.then(response => response.json())
  .then(data => {
    loader.load('assets/img/night_earth.jpg', (texture)=>{
        globe_map = texture;
        init(data.points);
    });
    
  });