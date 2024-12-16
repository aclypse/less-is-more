class Background{
    constructor(game) {
        this.game = game;
        this.player = new Player(this);
        // this.image = document.getElementById("background");
        //define all the necesary images
        this.imageBedroom = new Image();
        this.imageBedroom.src = "images/background/bedroom.png"
        this.imageKitchen = new Image();
        this.imageKitchen.src = "images/background/kitchen.png"
        this.imageHall = new Image();
        this.imageHall.src = "images/background/hall.png"
        //define the city images
        this.imageParallax2 = new Image();
        this.imageParallax2.src = "images/background/parallax2.png"
        this.imageParallax1 = new Image();
        this.imageParallax1.src = "images/background/parallax1.png"
        this.width = 3840;
        this.height = this.game.baseHeight;
        this.scaledWidth;
        this.scaledHeight;
        this.x = 0; //the bg will be scrolling, hence it need x value
        this.speed = 5;

        this.fadeAlpha = 0; // Alpha for fade effect 
        this.fading = false; // Flag to indicate if fading is happening 
        this.nextImage = null;
    }

    update(player) {
        // Move the background when the player reaches the right side of the screen 
        // console.log("players position " + player.x);
        if (player.x + player.width > this.game.width - 350 && input.keys.indexOf("d") > -1 || input.keys.indexOf("ArrowRight") > -1) { 
            this.x += this.speed; 
            player.x = this.game.width - 350 - player.width; // Keep the player within the screen 
            if (this.x < -(this.width * 4 - this.game.width)) { // Start fade transition when the player reaches the end of the fourth background 
                this.startFade(this.imageParallax1); 
            }    
        } 
            // Stop the background from going out of bounds 
            if (this.x < -(this.width - this.game.width)) { 
                this.x = -(this.width - this.game.width); 
            }
        if (player.x + player.width < 150 && input.keys.indexOf("a") > -1 || input.keys.indexOf("ArrowLeft") > -1) { 
            this.x -= this.speed; 
            player.x = this.game.width - 150 - player.width; }// Keep the player within the screen 
        if (this.x <= -this.width) {
            this.x = 0 
        }
        /// Check if the player has reached the ending point 
        if ( this.x + this.spriteWidth >= 500) { //this.x <= -(this.width * 4 - this.game.width) && player.x > this.game.width - 500) { 
            this.endingReached = true; 
            this.game.endGame();
        }
    }

    draw() {
        this.game.ctx.drawImage(this.imageBedroom, this.x, 0, this.width, this.height, 0, 0, this.scaledWidth, this.scaledHeight);
        this.game.ctx.drawImage(this.imageKitchen, this.x-this.width, 0, this.width, this.height, 0, 0, this.scaledWidth, this.scaledHeight);
        this.game.ctx.drawImage(this.imageHall, this.x-this.width*2, 0, this.width, this.height, 0, 0, this.scaledWidth, this.scaledHeight);
        this.game.ctx.drawImage(this.imageParallax2, this.x-this.width*3, 0, this.width, this.height, 0, 0, this.scaledWidth, this.scaledHeight);
        this.game.ctx.drawImage(this.imageParallax1, this.x-this.width*4, 0, this.width, this.height, 0, 0, this.scaledWidth, this.scaledHeight);
        // Handle fade transition 
        if (this.fading) { 
            this.fadeAlpha += 0.02; // Increase alpha for fade effect 
            if (this.fadeAlpha >= 1) { 
                this.fading = false; // Stop fading when fully transitioned 
                this.imageBedroom = this.nextImage; // Set the next image as the current background 
                this.nextImage = null; this.fadeAlpha = 0; 
            } else { 
                ctx.globalAlpha = this.fadeAlpha; 
                ctx.drawImage(this.nextImage, this.x, 0, this.width, this.height, 0, 0, this.scaledWidth, this.scaledHeight); 
                ctx.globalAlpha = 1; // Reset alpha 
                }
            }
        }
    resize() {
        this.x = 0;
        this.scaledWidth = this.width * this.game.ratio;
        this.scaledHeight = this.height * this.game.ratio;
        console.log(this.scaledWidth);
    }

}