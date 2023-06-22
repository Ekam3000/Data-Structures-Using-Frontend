/*
functions that we will have 
function load_images()
{

}

function init(){

}
function draw(){

}
function update()
{

}
function gameloop(){

}
setInterval(gameloop,100);
*/
function load_images(){
    //player,virus,gem
    enemy_image = new Image;
    enemy_image.src = "Assets/v1.png";
    
    player_img = new Image;
    player_img.src = "Assets/superhero.png";
    
    gem_image = new Image;
    gem_image.src = "Assets/gemm.png";  
}


function init(){
    //define the objects that we will have in the game
    canvas = document.getElementById("mycanvas");
    console.log(canvas);
    W = 700;
    H = 400; // global
    
    canvas.width = W;
    canvas.height = H;
    
    // create a context 
    pen = canvas.getContext('2d');
    console.log(pen);
    game_over = false;
    
    e1 = { // global
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 20,
	};
	e2 = {
		x : 300,
		y : 150,
		w : 60,
		h : 60,
		speed : 30,
	};
	e3 = {
		x : 450,
		y : 20,
		w : 60,
		h : 60,
		speed : 40,
	};
    
    enemy = [e1,e2,e3];
    
    player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
        moving  : false,
        health : 100,
	};
    
	gem = {
		x : W-100, // gem placed near the end of canvas
		y : H/2,
		w : 60,
		h : 60,
	};
    //listen to events on the canvas
    canvas.addEventListener('mousedown',function(){ // pressing the mouse 
        console.log("Mouse Pressed"); 
        player.moving = true;
    });
    canvas.addEventListener('mouseup',function(){ // means releasing the mouse
        console.log("Mouse Released"); 
        player.moving = false;
    });
    
}
// collision detection -> I Referred 2D collision detection mdn web docs 

function isOverlap(rect1,rect2){
    // rect1 , rect2 can be anything like the superhero and enemies
    if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) {
    return true
    }
    return false;
}
function draw(){
    
    //clear the canvas area for the old frame
    pen.clearRect(0,0,W,H);
    
    pen.fillStyle = "red";
    //pen.fillRect(box.x,box.y,box.w,box.h); 

    // instead of fill rect we will draw image if we have load the images , with giving it one extra variable of image.

    //pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
   
    
    //draw the player
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    //draw the gem
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    
    
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    } // drawing enemies
    
    // adding text
    pen.fillStyle = "white";
    pen.fillText("Score "+player.health,10,10);
    
}

function update(){
    
    //if the player is moving 
    if(player.moving==true){
        player.x += player.speed;
        player.health += 20;
    }
    // u lost
    for(let i=0;i<enemy.length;i++){
        if(isOverlap(enemy[i],player)){
            player.health -= 50;
            if(player.health <0){
                console.log(player.health);
                game_over = true;
                alert("Game Over" + player.health);
            }
        }
    }
    
    //overlap overlap 
    // u won
    if(isOverlap(player,gem)){
        
        console.log("You Won");
        alert("You Won!");
        game_over = true;
        return;
    }
    
    //move the box downwards
    //update each enemy by same logic
    for(let i=0;i<enemy.length;i++){
        enemy[i].y += enemy[i].speed; // all the enimies moves with respective speeds
        if(enemy[i].y>H-enemy[i].h || enemy[i].y <0){  // applying the boundry conditions so that enemies just moves up and down after hitting the boundries
            enemy[i].speed *= -1; // speend in the opposite direction
        }   
    }
    
}

function gameloop(){
    if(game_over==true){
        clearInterval(f);
    }
    draw();
    update();
    console.log("In gameloop");
}

load_images();
init();
var f = setInterval(gameloop,100);

/* load -> init() -> gameloop()-> (Draw and update) */