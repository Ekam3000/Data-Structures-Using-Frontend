

// canvas is used to draw graphics

// init function is used when we have to apply the changes only once 
function init(){
	canvas = document.getElementById('mycanvas'); //get the canvas object from the .html file
	// console.log(canvas); // to check if we are able to get our canvas or not
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d'); // to draw something on the canvas in 2-D contexts
	// to draw something on the canvas in 2-D contexts
	// once we have a pen object .. we can draw anything on the canvas 
	// pen-> canvasRenderContext2D
	
	cs = 66; // cell(a rectangle) size of snake 
	game_over = false;
	score = 5; // initial score of the game .. as the snake initial length is 5

	//Create a Image Object for food
	food_img = new Image();
	food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood(); // calling the function to get the food coordinates. food is the glabal object can be accessed anywhere

	// snake is like a json object 
	snake = {
		init_len:5, // initial length , initial cells
		color:"blue",
		cells:[],
		direction:"right", // bydefault moves in the right direction
		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0}); //initial  creation of 5 length sanke using array 
			}
		},
		drawSnake:function(){

			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color; // to draw a sanke with the blue color
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3); // one by one a rectangle is drawn
				// cs -3 , here -3 is for the creation of gap betwen the rectangles 
			}
		},
		updateSnake:function(){
			//console.log("updating snake according to the direction property");
			//check if the snake has eaten food, increase the length of the snake and 
			//generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood(); // get another random coordinates for the snake's food 
				score++;

			}
			else
			{
				this.cells.pop(); // to pop the last cell and add it in front of head using unshift function accoriding to nextX and nextY directions
			}

            // so we will firstly find out the nextX, nextY direction
			
			
			var nextX,nextY;
			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}
			
			this.cells.unshift({x: nextX,y:nextY});

			/*Write a Logic that prevents snake from going out*/

			// to get the last coorninates of the canvas

			var last_x = Math.round(W/cs); 
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
			}
		}

	};
	snake.createSnake();
	//Add a Event Listener on the Document Object
	function keyPressed(e){
		//object e is matadata about the event that is passed to keyPressed . it give us some information 

		//console.log("key Pressed",e.key);


		//Conditional Statments
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
		console.log(snake.direction);
	} // we have to also done some updation in updateSanke fucntion according to changed direction of snake


	document.addEventListener('keydown',keyPressed) ;
	// when the event is related to keyboard. when any key is pressed its called 'keydown'
}
function draw(){
	//console.log("In Draw");
	
	//erase the old frame of sanke 
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	
	pen.fillStyle = food.color; // food.color
	
	//pen.fillRect(0,0,W,H);// 0,0 ->coordinates , W,H -> width height
	// fillRect will have fillStyle color
	
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
	pen.drawImage(trophy,18,20,cs,cs);

	// to display score on the canvas 
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);
    // to draw a circle 
	// pen.arc(60,60,50,0,2*Math.PI);
	//pen.stroke();
	
}

function update(){
	//console.log("In Update");
	snake.updateSnake(); 
}
// for getting the coordinated where the food is placed 

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs); //getting random coordinates for the food 

	// -cs donw bcoz we dont want food to be placed outside boundary .. it should be placed atmost at the last cell of the row

	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food
}
//game loop is needed in games where frequent changes occurs in the game
function gameloop(){
	// snake is moving bcoz of gameloop fuction is called again and again
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
		return;
	}
	//loop of draw and update
	draw();
	update();
}

init();// init function is used when we have to apply the changes only once . is called only once during start

var f = setInterval(gameloop,100); // the gameloop function called for 100 times 


// for breaking the infinite interval of moving rect/snake do this in console->
//clearInterval(f) 








