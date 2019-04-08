
// ------------------------------------- //
// ------------- Snake Game------------- //
// Project ----------------------------- //
// Jonathan Ismail, Andrew Dorokhine --- //
// First draft ------------------------- //
// ------------------------------------- //
// SOURCES : http://buildnewgames.com/webgl-threejs/

// scene object variables
var renderer, scene, closeCamera, backCamera, pointLight, spotLight;

// field variables
var fieldWidth = 400, fieldHeight = 200;

// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

// ball variables
var ball, ball2, ball3, ball4,ball5, paddle1, paddle2, pickup;
var ballDirX = 1, ballDirY = 0, ballSpeed = 1;
var ball2DirX = -0.7, ball2DirY = 0.5, ball2Speed = 1; //change back to 1 when not debugging
var ball3DirX = -0.7, ball3DirY = 0.5, ball3Speed = 1; //change back to 1 when not debugging
var ball4DirX = -0.7, ball4DirY = 0.5, ball3Speed = 1; //change back to 1 when not debugging
var ball5DirX = -0.7, ball5DirY = 0.5, ball3Speed = 1; //change back to 1 when not debugging


// game-related variables
var score = 0, score2 = 0;
var camCheck = 0;
// you can change this to any positive whole number
var maxScore = 7;

// set opponent reflexes (0 - easiest, 1 - hardest)
var difficulty = 0.2;

// ------------------------------------- //
// ------- GAME FUNCTIONS -------------- //
// ------------------------------------- //

function setup()
{
    // update the board to reflect the max score for match win
    //document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
    
    // now reset player and opponent scores
    score1 = 0;
    score2 = 0;
    
    // set up all the 3D objects in the scene
    createScene();
    
    // and let's get cracking!
    draw();
}

function createScene()
{
    // set the scene size
    var WIDTH = 1200,
    HEIGHT = 600;
    
    // set some camera attributes
    var VIEW_ANGLE = 50,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;
	
	scene = new THREE.Scene();
    
    var c = document.getElementById("gameCanvas");
    
    // create a WebGL renderer, camera
    // and a scene
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);
    
    // attach the render-supplied DOM element
    c.appendChild(renderer.domElement);
    
    // set up the playing surface plane
    var planeWidth = fieldWidth,
    planeHeight = fieldHeight,
    planeQuality = 100;
    
    
    // create the plane's material
    var planeMaterial =
    new THREE.MeshLambertMaterial({color: 0x4D4B4B});
    // create the table's material
    var tableMaterial =
    new THREE.MeshLambertMaterial({color: 0x111111});
   
    // create the ground's material
    var groundMaterial =
    new THREE.MeshLambertMaterial({color: 0x888888});
    
    
    // create the playing surface plane
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(
        planeWidth,    // 95% of table width, since we want to show where the ball goes out-of-bounds
        planeHeight,
        planeQuality,
        planeQuality),
        planeMaterial);
    
    scene.add(plane);
    plane.receiveShadow = true;
    
    var table = new THREE.Mesh(new THREE.CubeGeometry(
        planeWidth * 1.05,    // this creates the feel of a billiards table, with a lining
        planeHeight * 1.05,
        100,                // an arbitrary depth, the camera can't see much of it anyway
        planeQuality,
        planeQuality,
        1),
        tableMaterial);
    table.position.z = -51;    // we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
    scene.add(table);
    table.receiveShadow = true;
   
    // // set up the sphere vars
    // lower 'segment' and 'ring' values will increase performance
    var radius = 5,
    segments = 6,
    rings = 6;
    
    // // create the sphere's material
    var sphereMaterial =
    new THREE.MeshLambertMaterial({color: 0xD43001});
	
	var sphereMaterial2 =
    new THREE.MeshLambertMaterial({color: 0xFF0000});
    
    var sphereMaterial3 =
    new THREE.MeshLambertMaterial({color: 0xFF0000});
    
    var sphereMaterial4 =
    new THREE.MeshLambertMaterial({color: 0xFF0000});
    
    var sphereMaterial5 =
    new THREE.MeshLambertMaterial({color: 0xFF0000});
	
	var boxMaterial =
    new THREE.MeshLambertMaterial({color: 0x00FFFF});
    
    // Create a ball with sphere geometry
    ball = new THREE.Mesh(new THREE.SphereGeometry(
        radius,
        segments,
        rings),
        sphereMaterial);
		
	ball2 = new THREE.Mesh(new THREE.SphereGeometry(
        radius,
        segments,
        rings),
        sphereMaterial2);
    
    ball3 = new THREE.Mesh(new THREE.SphereGeometry(
                                                    radius,
                                                    segments,
                                                    rings),
                           sphereMaterial3);
    
    ball4 = new THREE.Mesh(new THREE.SphereGeometry(
                                                    radius,
                                                    segments,
                                                    rings),
                           sphereMaterial4);
    
    ball5 = new THREE.Mesh(new THREE.SphereGeometry(
                                                    radius,
                                                    segments,
                                                    rings),
                           sphereMaterial5);
    
		
	pickup = new THREE.Mesh(new THREE.BoxGeometry(
		5,
		5,
		5),
		boxMaterial);
// ----------------CAMERAS-----------------------
	closeCamera =
    new THREE.PerspectiveCamera(
                                VIEW_ANGLE,
                                ASPECT,
                                NEAR,
                                FAR);
    
    // add the camera to the scene
    scene.add(closeCamera);
    
    // set a default position for the camera
    // not doing this somehow messes up shadow rendering
    closeCamera.position.z = 320;

		
	backCamera =
    new THREE.PerspectiveCamera(
                                50,
                                ASPECT,
                                NEAR,
                                FAR);
	//scene = new THREE.Scene();
    
    // add the camera to the scene
    ball.add(backCamera);
	
    
    // set a default position for the camera
    // not doing this somehow messes up shadow rendering
	backCamera.position.z = 320;
    
    // // add the sphere to the scene
    scene.add(ball);
	scene.add(ball2);
    scene.add(ball3);
    scene.add(ball4);
    scene.add(ball5);
	scene.add(pickup);
    
    ball.position.x = 0;
    ball.position.y = 0;
    // set ball above the table surface
    ball.position.z = radius;
    ball.receiveShadow = true;
    ball.castShadow = true;
	
	ball2.position.x = 100;
    ball2.position.y = 0;
    // set ball above the table surface
    ball2.position.z = radius;
    ball2.receiveShadow = true;
    ball2.castShadow = true;
    
    ball3.position.x = 100;
    ball3.position.y = 0;
    // set ball above the table surface
    ball3.position.z = radius;
    ball3.receiveShadow = true;
    ball3.castShadow = true;
    
    ball4.position.x = -100;
    ball4.position.y = -50;
    // set ball above the table surface
    ball4.position.z = radius;
    ball4.receiveShadow = true;
    ball4.castShadow = true;
	
    
    ball5.position.x = -75;
    ball5.position.y = 0;
    // set ball above the table surface
    ball5.position.z = radius;
    ball5.receiveShadow = true;
    ball5.castShadow = true;
    
    // x range {-190, 190}
    // y range {-95, 95}
	pickup.position.x = 50;
    pickup.position.y = 0;
	pickup.position.z = 5;
    
    // finally we finish by adding a ground plane
    // to show off pretty shadows
    var ground = new THREE.Mesh(new THREE.CubeGeometry(
        1000,
        1000,
        3,
        1,
        1,
        1 ),
        groundMaterial);
    // set ground to arbitrary z position to best show off shadowing
    ground.position.z = -132;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // // create a point light
    pointLight =
    new THREE.PointLight(0xF8D898);
    
    // set its position
    pointLight.position.x = -1000;
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 2.9;
    pointLight.distance = 10000;
    
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    // add to the scene
    scene.add(pointLight);
    
    // add a spot light for player ball
    // this is important for casting shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.0;
    spotLight.castShadow = true;
    scene.add(spotLight);
	
	//add another spot light for enemy ball
	spotLight2 = new THREE.SpotLight(0xF8D898);
    spotLight2.position.set(0, 0, 460);
    spotLight2.intensity = 1.0;
    spotLight2.castShadow = true;
    scene.add(spotLight2);
    
    // MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
    renderer.shadowMapEnabled = true;
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function cameraPhysics()
{
    // we can easily notice shadows if we dynamically move lights during the game
    spotLight.position.x = ball.position.x * 2;
    spotLight.position.y = ball.position.y * 2;
	
	spotLight2.position.x = ball2.position.x * 2;
    spotLight2.position.y = ball2.position.y * 2;
    
    // move to behind the player's paddle
    closeCamera.position.x = 0;
    closeCamera.position.y = 125;
    closeCamera.position.z = 245;
	
	backCamera.position.x = 0;
    backCamera.position.y = 100;
    backCamera.position.z = 75;
	
    //console.log(camera.position.y);
    // rotate to face towards the opponent
    closeCamera.rotation.x = -0.4;
    closeCamera.rotation.y = 0;
    closeCamera.rotation.z = 3.14224;
	
	backCamera.rotation.x = -1;
    backCamera.rotation.y = 0;
    backCamera.rotation.z = 3.14224;
}

function ballPhysics()
{
    if (ball.position.x <= -fieldWidth/2)
    {
        ballDirX = -ballDirX;
    }
    
    // if ball goes off the left side (CPU's side)
    if (ball.position.x >= fieldWidth/2)
    {
        ballDirX = -ballDirX;
    }
    // if ball goes off the top side (side of table)
    if (ball.position.y <= -fieldHeight/2)
    {
        ballDirY = -ballDirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball.position.y >= fieldHeight/2)
    {
        ballDirY = -ballDirY;
    }
	
	if (ball2.position.x <= -fieldWidth/2)
    {
        ball2DirX = -ball2DirX;
    }
    // if ball goes off the left side (CPU's side)
    if (ball2.position.x >= fieldWidth/2)
    {
        ball2DirX = -ball2DirX;
    }
    // if ball goes off the top side (side of table)
    if (ball2.position.y <= -fieldHeight/2)
    {
        ball2DirY = -ball2DirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball2.position.y >= fieldHeight/2)
    {
        ball2DirY = -ball2DirY;
    }
    //BALL 3
    if (ball3.position.x <= -fieldWidth/2)
    {
        ball3DirX = -ball3DirX;
    }
    // if ball goes off the left side (CPU's side)
    if (ball3.position.x >= fieldWidth/2)
    {
        ball3DirX = -ball3DirX;
    }
    // if ball goes off the top side (side of table)
    if (ball3.position.y <= -fieldHeight/2)
    {
        ball3DirY = -ball3DirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball3.position.y >= fieldHeight/2)
    {
        ball3DirY = -ball3DirY;
    }
    //BALL 4
    if (ball4.position.x <= -fieldWidth/2)
    {
        ball4DirX = -ball4DirX;
    }
    // if ball goes off the left side (CPU's side)
    if (ball4.position.x >= fieldWidth/2)
    {
        ball4DirX = -ball4DirX;
    }
    // if ball goes off the top side (side of table)
    if (ball4.position.y <= -fieldHeight/2)
    {
        ball4DirY = -ball4DirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball4.position.y >= fieldHeight/2)
    {
        ball4DirY = -ball4DirY;
    }
    
    //BALL 5
    if (ball5.position.x <= -fieldWidth/2)
    {
        ball5DirX = -ball5DirX;
    }
    // if ball goes off the left side (CPU's side)
    if (ball5.position.x >= fieldWidth/2)
    {
        ball5DirX = -ball5DirX;
    }
    // if ball goes off the top side (side of table)
    if (ball5.position.y <= -fieldHeight/2)
    {
        ball5DirY = -ball5DirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball5.position.y >= fieldHeight/2)
    {
        ball5DirY = -ball5DirY;
    }
    
	// collision variables
	var ballBB = new THREE.Box3().setFromObject(ball);
	var ballBB2 = new THREE.Box3().setFromObject(ball2);
	var collision = ballBB.intersectsBox(ballBB2);
	if(collision === true)
	{
		scene.remove(ball);
        document.getElementById("scores").innerHTML = "HighScore: "+score;
		
		alert("GAME OVER");
		document.location.reload();
		clearInterval(interval);
	}
    // collision variables
    var ballBB3 = new THREE.Box3().setFromObject(ball3);
    var collision = ballBB.intersectsBox(ballBB3);
    if(collision === true)
    {
        scene.remove(ball);
        document.getElementById("scores").innerHTML = "HighScore: "+score;
		
		alert("GAME OVER");
		document.location.reload();
		clearInterval(interval);
    }
    // collision variables
    var ballBB4 = new THREE.Box3().setFromObject(ball4);
    var collision = ballBB.intersectsBox(ballBB4);
    if(collision === true)
    {
        scene.remove(ball);
        document.getElementById("scores").innerHTML = "HighScore: "+score;

		alert("GAME OVER");
		document.location.reload();
		clearInterval(interval);
    }
    // collision variables
    var ballBB5 = new THREE.Box3().setFromObject(ball5);
    var collision = ballBB.intersectsBox(ballBB5);
    if(collision === true)
    {
        scene.remove(ball);
        document.getElementById("scores").innerHTML = "HighScore: "+score;
		
		alert("GAME OVER");
		document.location.reload();
		clearInterval(interval);
    }
    
    // collision variables
    var ballpickup = new THREE.Box3().setFromObject(pickup);
    var collision = ballBB.intersectsBox(ballpickup);
    if(collision === true)
    {
        score += 10;
        var temp = getRandomArbitrary(-190, 190);
        var temp2 = getRandomArbitrary(-95, 95);
        pickup.position.x = temp;
        pickup.position.y = temp2;
        pickup.position.z = 5;
        ball2Speed += 0.5;
        document.getElementById("scores").innerHTML = score;
    }
    
    // update ball position over time
    ball.position.x += ballDirX * ballSpeed;
    ball.position.y += ballDirY * ballSpeed;
	
	ball2.position.x += ball2DirX * ball2Speed;
    ball2.position.y += ball2DirY * ball2Speed;
    
    ball3.position.x -= ball3DirX * ball2Speed;
    ball3.position.y -= ball3DirY * ball2Speed;
    
    ball4.position.x += ball4DirX * ball2Speed;
    ball4.position.y += ball4DirY * ball2Speed;
    
    ball5.position.x -= ball5DirX * ball2Speed;
    ball5.position.y -= ball5DirY * ball2Speed;

    // limit ball's y-speed to 2x the x-speed
    // this is so the ball doesn't speed from left to right super fast
    // keeps game playable for humans
    if (ballDirY > ballSpeed * 2)
    {
        ballDirY = ballSpeed * 2;
    }
    else if (ballDirY < -ballSpeed * 2)
    {
        ballDirY = -ballSpeed * 2;
    }
	
	if (ball2DirY > ball2Speed * 2)
    {
        ball2DirY = ball2Speed * 2;
    }
    else if (ball2DirY < -ball2Speed * 2)
    {
        ball2DirY = -ball2Speed * 2;
    }
}


function playerMovement()
{
    // move left
    if (Key.isDown(Key.A))
    {
        // if paddle is not touching the side of table
        // we move
        //ballDirY -= 0.3;
		ballDirX = 1;
		ballDirY = 0;
        
    }
	
	if (Key.isDown(Key.D))
    {
        // if paddle is not touching the side of table
        // we move
        //ballDirY += 0.3;
		ballDirX = -1;
        ballDirY = 0;
    }
	if (Key.isDown(Key.W))
    {
        // if paddle is not touching the side of table
        // we move
        //ballDirY -= 0.3;
		ballDirY = -1;
        ballDirX = 0;
    }
	
	if (Key.isDown(Key.S))
    {
        // if paddle is not touching the side of table
        // we move
        //ballDirY += 0.3;
		ballDirY = 1;
        ballDirX = 0;
    }
    
}

function draw()
{
    // draw THREE.JS scene
	if (Key.isDown(Key.X))
    {
		renderer.render(scene, backCamera);	
    }
	else
	{
		renderer.render(scene, closeCamera);
	} 
    // loop the draw() function	
    requestAnimationFrame(draw);	
	
    cameraPhysics();
    ballPhysics();
    playerMovement()
    // process game logic
   
}
