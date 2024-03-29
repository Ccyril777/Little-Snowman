Ball.Game = function(game) {};
Ball.Game.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-bg');
		this.add.sprite(0, 0, 'panel');
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.fontSmall = { font: "16px Arial", fill: "#ffffff" };
		this.fontBig = { font: "24px Arial", fill: "#ffffff" };
		this.fontMessage = { font: "24px Arial", fill: "#ffffff",  align: "center", stroke: "#320C3E", strokeThickness: 4 };
		this.audioStatus = true;
		this.timer = 0;
		this.totalTimer = 0;
		this.level = 1;
		this.maxLevels = 5;
		this.movementForce = 10;
		this.ballStartPos = { x: Ball._WIDTH*1.3, y: 400 };

		this.pauseButton = this.add.button(Ball._WIDTH+500, 8, 'button-pause', this.managePause, this);
		this.pauseButton.anchor.set(1,0);
		this.pauseButton.input.useHandCursor = true;
		this.audioButton = this.add.button(Ball._WIDTH-this.pauseButton.width-8*2, 8, 'button-audio', this.manageAudio, this);
		this.audioButton.anchor.set(1,0);
		this.audioButton.input.useHandCursor = true;
		this.audioButton.animations.add('true', [0], 10, true);
		this.audioButton.animations.add('false', [1], 10, true);
		this.audioButton.animations.play(this.audioStatus);
		this.timerText = this.game.add.text(15, 15, "Temps: "+this.timer, this.fontBig);
		this.levelText = this.game.add.text(140, 10, "Level: "+this.level+" / "+this.maxLevels, this.fontSmall);
		this.totalTimeText = this.game.add.text(140, 30, "Temps total: "+this.totalTimer, this.fontSmall);

		this.hole = this.add.sprite(Ball._WIDTH*1.3, 90, 'hole');
		this.physics.enable(this.hole, Phaser.Physics.ARCADE);
		this.hole.anchor.set(0.5);
		this.hole.body.setSize(2, 2);

		this.ball = this.add.sprite(this.ballStartPos.x, this.ballStartPos.y, 'ball');
		this.ball.anchor.set(0.5);
		this.physics.enable(this.ball, Phaser.Physics.ARCADE);
		this.ball.body.setSize(18, 18);
		this.ball.body.bounce.set(0.3, 0.3);

		this.initLevels();
		this.showLevel(1);
		this.keys = this.game.input.keyboard.createCursorKeys();

		Ball._player = this.ball;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

		this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

		this.borderGroup = this.add.group();
		this.borderGroup.enableBody = true;
		this.borderGroup.physicsBodyType = Phaser.Physics.ARCADE;
		// this.borderGroup.create(0, 50, 'border-horizontal');
		// this.borderGroup.create(0, Ball._HEIGHT-2, 'border-horizontal');
		// this.borderGroup.create(0, 0, 'border-vertical');
		// this.borderGroup.create(Ball._WIDTH-2, 0, 'border-vertical');
		this.borderGroup.setAll('body.immovable', true);
		this.bounceSound = this.game.add.audio('audio-santa');
	},
	initLevels: function() {
		this.levels = [];
		this.levelData = [
			
			//Level 1
			
			[
				{ x: 0, y: 55, t: 'h' },
				{ x: 0, y: 180, t: 'h' },
				{ x: 0, y: 305, t: 'h' },
				{ x: 815, y: 55, t: 'h' },
				{ x: 815, y: 180, t: 'h' },
				{ x: 815, y: 305, t: 'h' },
				{ x: 30, y: 52, t: 'w' },
				{ x: 150, y: 52, t: 'w' },
				{ x: 270, y: 52, t: 'w' },
				{ x: 390, y: 52, t: 'w' },
				{ x: 510, y: 52, t: 'w' },
				{ x: 630, y: 52, t: 'w' },
				{ x: 730, y: 52, t: 'w' },
				{ x: 30, y: 52, t: 'w' },
				{ x: 30, y: 52, t: 'w' },
				{ x: 30, y: 52, t: 'w' },
				{ x: 0, y: 425, t: 'w' },
				{ x: 120, y: 425, t: 'w' },
				{ x: 240, y: 425, t: 'w' },
				{ x: 360, y: 425, t: 'w' },
				{ x: 480, y: 425, t: 'w' },
				{ x: 600, y: 425, t: 'w' },
				{ x: 680, y: 425, t: 'w' },
				{ x: 720, y: 425, t: 'w' },

				{ x: 80, y: 224, t: 'w' },
				{ x: 240, y: 224, t: 'w' },
				{ x: 350, y: 224, t: 'w' },
				{ x: 400, y: 224, t: 'w' },
				{ x: 500, y: 224, t: 'w' },
				{ x: 670, y: 224, t: 'w' }
				],

			//Level 2

				[
				{ x: 0, y: 55, t: 'h' },
				{ x: 0, y: 180, t: 'h' },
				{ x: 0, y: 305, t: 'h' },
				{ x: 815, y: 55, t: 'h' },
				{ x: 815, y: 180, t: 'h' },
				{ x: 815, y: 305, t: 'h' },
				{ x: 30, y: 52, t: 'w' },
				{ x: 150, y: 52, t: 'w' },
				{ x: 270, y: 52, t: 'w' },
				{ x: 390, y: 52, t: 'w' },
				{ x: 510, y: 52, t: 'w' },
				{ x: 630, y: 52, t: 'w' },
				{ x: 730, y: 52, t: 'w' },
				{ x: 30, y: 52, t: 'w' },
				{ x: 30, y: 52, t: 'w' },
				{ x: 30, y: 52, t: 'w' },
				{ x: 0, y: 425, t: 'w' },
				{ x: 120, y: 425, t: 'w' },
				{ x: 240, y: 425, t: 'w' },
				{ x: 360, y: 425, t: 'w' },
				{ x: 480, y: 425, t: 'w' },
				{ x: 600, y: 425, t: 'w' },
				{ x: 680, y: 425, t: 'w' },
				{ x: 720, y: 425, t: 'w' },

				{ x: 230, y: 320, t: 'w' },
				{ x: 230, y: 250, t: 'w' },
				{ x: 120, y: 250, t: 'w' },
				{ x: 340, y: 250, t: 'w' },
				{ x: 440, y: 250, t: 'w' },
				{ x: 600, y: 250, t: 'w' },
				{ x: 340, y: 320, t: 'h' },
				{ x: 470, y: 320, t: 'h' },
				{ x: 70, y: 150, t: 'w' },
				{ x: 500, y: 150, t: 'w' },
				{ x: 300, y: 150, t: 'w' },
				{ x: 700, y: 150, t: 'w' }
				],

				//Level 3

				[
					{ x: 0, y: 55, t: 'h' },
					{ x: 0, y: 180, t: 'h' },
					{ x: 0, y: 305, t: 'h' },
					{ x: 815, y: 55, t: 'h' },
					{ x: 815, y: 180, t: 'h' },
					{ x: 815, y: 305, t: 'h' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 150, y: 52, t: 'w' },
					{ x: 270, y: 52, t: 'w' },
					{ x: 390, y: 52, t: 'w' },
					{ x: 510, y: 52, t: 'w' },
					{ x: 630, y: 52, t: 'w' },
					{ x: 730, y: 52, t: 'w' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 0, y: 425, t: 'w' },
					{ x: 120, y: 425, t: 'w' },
					{ x: 240, y: 425, t: 'w' },
					{ x: 360, y: 425, t: 'w' },
					{ x: 480, y: 425, t: 'w' },
					{ x: 600, y: 425, t: 'w' },
					{ x: 680, y: 425, t: 'w' },
					{ x: 720, y: 425, t: 'w' },

					{ x: 340, y: 320, t: 'h' },
					{ x: 470, y: 320, t: 'h' },
					{ x: 360, y: 250, t: 'w' },
					{ x: 250, y: 250, t: 'w' },
					{ x: 480, y: 250, t: 'w' },
					{ x: 570, y: 270, t: 'h' },
					{ x: 240, y: 270, t: 'h' },
					{ x: 340, y: 60, t: 'h' },
					{ x: 470, y: 60, t: 'h' },
				],		
				
				//Level 4
				[
					{ x: 0, y: 55, t: 'h' },
					{ x: 0, y: 180, t: 'h' },
					{ x: 0, y: 305, t: 'h' },
					{ x: 815, y: 55, t: 'h' },
					{ x: 815, y: 180, t: 'h' },
					{ x: 815, y: 305, t: 'h' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 150, y: 52, t: 'w' },
					{ x: 270, y: 52, t: 'w' },
					{ x: 390, y: 52, t: 'w' },
					{ x: 510, y: 52, t: 'w' },
					{ x: 630, y: 52, t: 'w' },
					{ x: 730, y: 52, t: 'w' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 0, y: 425, t: 'w' },
					{ x: 120, y: 425, t: 'w' },
					{ x: 240, y: 425, t: 'w' },
					{ x: 360, y: 425, t: 'w' },
					{ x: 480, y: 425, t: 'w' },
					{ x: 600, y: 425, t: 'w' },
					{ x: 680, y: 425, t: 'w' },
					{ x: 720, y: 425, t: 'w' },

					{ x: 340, y: 320, t: 'h' },
					{ x: 470, y: 320, t: 'h' },
					{ x: 360, y: 250, t: 'w' },
					{ x: 250, y: 250, t: 'w' },
					{ x: 480, y: 250, t: 'w' },
					{ x: 570, y: 270, t: 'h' },
					{ x: 240, y: 270, t: 'h' },
					{ x: 340, y: 130, t: 'h' },
					{ x: 470, y: 130, t: 'h' },
					{ x: 130, y: 250, t: 'w' },
					{ x: 600, y: 250, t: 'w' },
					{ x: 600, y: 60, t: 'h' },
					{ x: 130, y: 60, t: 'h' },
					{ x: 700, y: 150, t: 'h' },
					{ x: 200, y: 150, t: 'h' }
				],

			//Level 5

			[
					{ x: 0, y: 55, t: 'h' },
					{ x: 0, y: 180, t: 'h' },
					{ x: 0, y: 305, t: 'h' },
					{ x: 815, y: 55, t: 'h' },
					{ x: 815, y: 180, t: 'h' },
					{ x: 815, y: 305, t: 'h' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 150, y: 52, t: 'w' },
					{ x: 270, y: 52, t: 'w' },
					{ x: 390, y: 52, t: 'w' },
					{ x: 510, y: 52, t: 'w' },
					{ x: 630, y: 52, t: 'w' },
					{ x: 730, y: 52, t: 'w' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 30, y: 52, t: 'w' },
					{ x: 0, y: 425, t: 'w' },
					{ x: 120, y: 425, t: 'w' },
					{ x: 240, y: 425, t: 'w' },
					{ x: 360, y: 425, t: 'w' },
					{ x: 480, y: 425, t: 'w' },
					{ x: 600, y: 425, t: 'w' },
					{ x: 680, y: 425, t: 'w' },
					{ x: 720, y: 425, t: 'w' },
					{ x: 350, y: 300, t: 'h' },
					{ x: 450, y: 300, t: 'h' },
					{ x: 250, y: 300, t: 'w' },
					{ x: 350, y: 230, t: 'w' },
					{ x: 470, y: 230, t: 'w' },
					{ x: 515, y: 230, t: 'h' },
					{ x: 515, y: 355, t: 'w' },
					{ x: 630, y: 355, t: 'w' },
					{ x: 250, y: 175, t: 'h' },
					{ x: 650, y: 175, t: 'h' },
					{ x: 450, y: 110, t: 'h' },
					{ x: 480, y: 110, t: 'w' },
					{ x: 600, y: 110, t: 'w' },
					{ x: 690, y: 280, t: 'w' },
					{ x: 710, y: 110, t: 'h' },
					{ x: 350, y: 110, t: 'h' },
					{ x: 250, y: 110, t: 'w' },
					{ x: 130, y: 110, t: 'w' },
					{ x: 30, y: 110, t: 'w' },
					{ x: 80, y: 210, t: 'w' },
					{ x: 180, y: 110, t: 'h' },
					{ x: 180, y: 300, t: 'h' },
					{ x: 80, y: 210, t: 'h' },
				]
			];
		for(var i=0; i<this.maxLevels; i++) {
			var newLevel = this.add.group();
			newLevel.enableBody = true;
			newLevel.physicsBodyType = Phaser.Physics.ARCADE;
			for(var e=0; e<this.levelData[i].length; e++) {
				var item = this.levelData[i][e];
				newLevel.create(item.x, item.y, 'element-'+item.t);
			}
			newLevel.setAll('body.immovable', true);
			newLevel.visible = false;
			this.levels.push(newLevel);
		}
	},
	showLevel: function(level) {
		var lvl = level | this.level;
		if(this.levels[lvl-2]) {
			this.levels[lvl-2].visible = false;
		}
		this.levels[lvl-1].visible = true;
	},
	updateCounter: function() {
		this.timer++;
		this.timerText.setText("Temps: "+this.timer);
		this.totalTimeText.setText("Temps total: "+(this.totalTimer+this.timer));
	},
	managePause: function() {
		this.game.paused = true;
		var pausedText = this.add.text(Ball._WIDTH*1.3, 250, "PAUSE", this.fontMessage);
		pausedText.anchor.set(0.5);
		this.input.onDown.add(function(){
			pausedText.destroy();
			this.game.paused = false;
		}, this);
	},
	manageAudio: function() {
		this.audioStatus =! this.audioStatus;
		this.audioButton.animations.play(this.audioStatus);
	},
	update: function() {
		if(this.keys.left.isDown) {
			this.ball.body.velocity.x -= this.movementForce;
		}
		else if(this.keys.right.isDown) {
			this.ball.body.velocity.x += this.movementForce;
		}
		if(this.keys.up.isDown) {
			this.ball.body.velocity.y -= this.movementForce;
		}
		else if(this.keys.down.isDown) {
			this.ball.body.velocity.y += this.movementForce;
		}
		this.physics.arcade.collide(this.ball, this.borderGroup, this.wallCollision, null, this);
		this.physics.arcade.collide(this.ball, this.levels[this.level-1], this.wallCollision, null, this);
		this.physics.arcade.overlap(this.ball, this.hole, this.finishLevel, null, this);
	},
	wallCollision: function() {
		if(this.audioStatus) {
			this.bounceSound.play();
		}
		// Vibration API
		if("vibrate" in window.navigator) {
			window.navigator.vibrate(100);
		}
	},
	handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		Ball._player.body.velocity.x += x;
		Ball._player.body.velocity.y += y*0.5;
	},
	finishLevel: function() {
		if(this.level >= this.maxLevels) {
			this.totalTimer += this.timer;
			alert('Bravo, tu as sauvé Noël !\nTotal temps de jeux: '+this.totalTimer+' seconds!');
			this.game.state.start('MainMenu');
		}
		else {
			alert('Bravo, level '+this.level+' fini!');
			this.totalTimer += this.timer;
			this.timer = 0;
			this.level++;
			this.timerText.setText("Temps: "+this.timer);
			this.totalTimeText.setText("Temps total: "+this.totalTimer);
			this.levelText.setText("Level: "+this.level+" / "+this.maxLevels);
			this.ball.body.x = this.ballStartPos.x;
			this.ball.body.y = this.ballStartPos.y;
			this.ball.body.velocity.x = 0;
			this.ball.body.velocity.y = 0;
			this.showLevel();
		}
	},
	render: function() {
		// this.game.debug.body(this.ball);
		// this.game.debug.body(this.hole);
	}
};
