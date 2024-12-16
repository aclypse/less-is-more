class Interactible {
    constructor(game, x, y, width, height, type, imageUrl) { 
        this.game = game;
        this.player = new Player(this);
        this.background = new Background(this);
        this.input = new InputHandler();
        this.x = x; 
        this.y = y; 
        this.width = width; 
        this.height = height; 
        this.spriteWidth = 346; 
        this.spriteHeight = 316; 
        this.type = type; 
        this.buttonVisible = false; 
        this.color = "cyan";
        this.speed = 2;

        // interactibles images
        this.image = new Image();
        this.image.src = imageUrl;
        this.image.onload = () => { 
            this.loaded = true; 
        }; 
        this.image.onerror = () => { console.error(`Failed to load image: ${imageUrl}`); }; 
        this.loaded = false; // Flag to check if the image is loaded
        this.textVisible = false; 
        this.textTimer = null; // Timer for showing text
    }

    update(player, input) {
        const ctx = this.game.ctx;
        // Check if the player is near the interactible 
        //const proximity = 50; 
        //const playerNear = Math.abs((player.x + player.width / 2) - (this.x + this.width / 2)) < proximity && Math.abs((player.y + player.height / 2) - (this.y + this.height / 2)) < proximity; 

        if (this.x > player.x + player.spriteWidth ||
            this.x + this.width < player.x ||
            this.y > player.y + player.spriteHeight ||
            this.y + this.height < player.y
        ) {
            this.buttonVisible = false; 
            this.textVisible = false;
        } else { 
            this.buttonVisible = true; 
            // Check if the 'i' key is pressed and show the text 
            if (input.keys.indexOf("i") > -1) {
                this.textVisible = true;
            }
        }
        //move obstacles together with the background
        // Move the background when the player reaches the right side of the screen 
        if (player.x + player.width > this.game.width -355 && input.keys.indexOf("d") > -1 || input.keys.indexOf("ArrowRight") > -1) { 
            this.x -= this.speed;
            this.x --;
        } 
    
}
          
    // resize() {
    //     this.scaledWidth = this.spriteWidth * this.game.ratio; // the heght of the interactible after the window's scaled
    //     this.scaledHeight = this.spriteHeight * this.game.ratio;
        
    // }

    showText() {
        if (this.textVisible === true) {
            this.ctx = this.game.ctx;
            this.game.ctx.fillStyle = 'black';
            this.game.ctx.font = '16px Arial';
            this.game.ctx.fillText(`This is ${this.type}`, this.x + 20, this.y - 50);
        }
    }

    draw() {
        const ctx = this.game.ctx;
        this.game.ctx.fillStyle = this.color;
        if (this.loaded) { 
            ctx.drawImage(this.image, this.x, this.y, this.spriteWidth, this.spriteHeight); 
        } else { 
            ctx.fillStyle = 'grey'; 
            ctx.fillRect(this.x, this.y, this.width, this.height); // Fallback if image not loaded
        }
        if (this.buttonVisible) { 
            this.game.ctx.fillStyle = 'blue'; 
            this.game.ctx.fillRect(this.x +50, this.y - 90, 100, 30); 
            this.game.ctx.fillStyle = 'white'; 
            this.game.ctx.font = '16px Arial'; 
            this.game.ctx.fillText(this.type, this.x +60, this.y - 70);
    }
        this.showText();
    }
}


