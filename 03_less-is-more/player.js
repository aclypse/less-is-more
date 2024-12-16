class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener("keydown", e => {
            if ((e.key === "ArrowLeft" 
                || e.key === "ArrowRight"
                || e.key === "a"
                || e.key === "d"
                || e.key === "i")
                && this.keys.indexOf(e.key) === -1) { // if the key is not in the array yet, push it to the array
                this.keys.push(e.key);
            }
            // console.log(e.key, this.keys);
        });
        window.addEventListener("keyup", e => { //if the key is released
            if (e.key === "ArrowLeft" 
                || e.key === "ArrowRight"
                || e.key === "a"
                || e.key === "d") {
                this.keys.splice(this.keys.indexOf(e.key), 1); // find the index of that key and remove it from the array
            }
            // console.log(e.key, this.keys);
        });
    }
}
class Player {
    constructor(game){
        this.game = game; //we're linking to the game
        //the player needs coordinates, width and height in the game
        this.x = 200;
        this.y = 150;
        this.playerImage = document.getElementById("player");
        this.spriteWidth = 300;
        this.spriteHeight = 750;
        this.width;
        this.height;
        this.speed = 0;
        this.maxSpeed = 5;
        this.facingRight = true;
        this.playerState = 'walk';
        this.gameFrames = 0; //basically the fps
        this.staggerFrames = 24;
        this.spriteAnimations = [];
        const animationStates = [
                {
                    name: 'idle',
                    frames: 4
                },
                {
                    name: 'walk',
                    frames: 6
                }
            ];
        animationStates.forEach((state, index) => {
            let frames = {
                loc: []
            }
            for (let j = 0; j < state.frames; j++) {
                let positionX = j* this.spriteWidth;
                let positionY = index * this.spriteHeight;
                frames.loc.push({x: positionX, y: positionY});
            }
            this.spriteAnimations[state.name] = frames;
        });
        console.log(this.spriteAnimations);

    }
    draw(){ //custom function which will draw the player
        // this.ctx.drawImage(this.playerImage, sx, sy, sw, sh, dx, dy, dw, dh)
        let position = Math.floor(this.gameFrames/this.staggerFrames) % this.spriteAnimations[this.playerState].loc.length; //sorry this is too hard to explin watch the video
        this.frameX = this.spriteWidth * position;
        this.frameY = this.spriteAnimations[this.playerState].loc[position].y;

        // Save the current context state 
        this.game.ctx.save();
        
        if (this.facingRight) { 
            // Draw normally if facing right 
            this.game.ctx.drawImage(this.playerImage, this.frameX, this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); 
        } else { 
            // Flip the sprite horizontally if facing left 
            this.game.ctx.translate(this.x + this.width, this.y); 
            this.game.ctx.scale(-1, 1); 
            this.game.ctx.drawImage(this.playerImage, this.frameX, this.frameY, this.spriteWidth, this.spriteHeight, 0, 0, this.width, this.height); 
        } 
        // Restore the context to its original state 
        this.game.ctx.restore();
        
        this.gameFrames++;
    }
    update(input){ //move the player by 1px
        
                // Reset speed to 0 first
                this.speed;
        
                // Check for key presses and adjust speed

                if (input.keys.indexOf("a") > -1 || input.keys.indexOf("ArrowLeft") > -1) {
                    this.speed = -this.maxSpeed;
                    this.facingRight = false;
                    this.playerState = 'walk';
                } else if (input.keys.indexOf("d") > -1 || input.keys.indexOf("ArrowRight") > -1) {
                    this.speed = this.maxSpeed;
                    this.facingRight = true;
                    this.playerState = 'walk';
                } else {
                    this.speed = 0;
                    this.playerState = 'idle';
                }
                console.log("players x: " + this.x);
                // Update player position

                this.x += this.speed;

                if (this.x < 0) this.x = 0; 
                if (this.x + this.spriteWidth > this.game.width) { 
                    this.x = this.game.width - this.spriteWidth;
            }
        }

    resize(){
        this.width = this.spriteWidth *  this.game.ratio;
        this.height = this.spriteHeight *  this.game.ratio;
    }
}