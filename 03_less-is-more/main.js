//the brain of the game
class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width; // same width for the screen
        this.height = this.canvas.height; //same height for the screen
        //let's resize the player on Y scale when the screen is resized
        this.baseHeight = 1080; //same as the bg size
        this.interactibles = [];
        this.ratio = this.height / this.baseHeight;
        this.background = new Background(this);
        this.player = new Player(this); // instance of the player; expects one argument
        this.ending = false;
        this.endingReached = false;

        this.resize(window.innerWidth, window.innerHeight); //we dont have the acces to the inner W and H, so we pass it here
        
        this.addInteractibles();

        window.addEventListener("resize", e => {//this will display useful information in the console when we resize the window; learn about arrow function
            console.log(e);
            this.resize(e.currentTarget.innerWidth,e.currentTarget.innerHeight);
            
        });
        //keyboard controls
        // window.addEventListener("keydown", e => {
        //     console.log(e.key);
        //     if (e.key === "a" || e.key === "ArrowLeft") {
        //         this.player.x -= 1 * this.speedX;
        //         if (this.x > 0) {this.x = 0};
        //     };
        //     if (e.key === "d" || e.key === "ArrowRight") {
        //         this.player.x += 1 * this.speedX
        //     };
            
        // });
        // //touch control (add based on which part of the creen is touched)
        // this.canvas.addEventListener("touchstart", e=> {
        //         console.log(e);
        // });
    }

    resize(width, height){ //make sure the function expects width and height
        //all this code resizes the game window when we are resizing it
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.ratio = this.height / this.baseHeight;
        this.background.resize();
        this.player.resize(); //everytime we resize the window, we have to call the player resize as well
        console.log(this.height, this.baseHeight, this.ratio);
    }
    render() {
        this.background.update(this.player);
        this.background.draw();
        this.interactibles.forEach(interactible => { 
            interactible.update(this.player, input); 
            interactible.draw(input); 
            
        });
        
        this.player.update(input);
        this.player.draw();

        // this.ending.endingReached();

        this.ctx.restore();
    }

    addInteractibles() {
        this.interactibles = [];
        this.interactibles.push(new Interactible(this, 200, 325, 400, 45, 'Bed')); 
        this.interactibles.push(new Interactible(this, this.background.width, 400, 100, 500, 'Table', 'images/background/table.png')); 
        this.interactibles.push(new Interactible(this, this.background.width + 1920, 200, 100, 50, 'Closet')); 
        this.interactibles.push(new Interactible(this, this.background.width * 3 -800, 200, 500, 50, 'Monuments'));
        this.interactibles.push(new Interactible(this, this.background.width * 3, 200, 500, 50, 'End'));
    }
    
    

    endGame() { 

            this.endingReached = true; 
            this.ending = true; 
            console.log("Ending reached"); // Additional logic for ending can be added here 
            alert("game end");
        
        
    }
}

const input = new InputHandler();

window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas1"); // declare a variable than refers to the window we are playing in
    const ctx = canvas.getContext("2d"); // this method creates a drawing context, a built-in js inteface with all drawing method and properties; needs one parameter: 2d or webGL
    canvas.width = 1920;
    canvas.height = 1080;

    const game = new Game(canvas, ctx); // creating a new variable to create shapes in the render() function
    

    function animate() { //we will need to call update() evrytime, so lets create a fucntion that does that
        ctx.clearRect(0, 0, canvas.width, canvas.height); // this clears the provious frame, otherwise we would see the rect 'stretch'
        game.render();
        requestAnimationFrame(animate); //we pass it it's parent item (animate), hence creating a loop (if i understadn ocrrectly)
    }
    requestAnimationFrame(animate);
});