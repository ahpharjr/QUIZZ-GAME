
var Fire  = function(){ 
	this.canvas 		= document.getElementById('fire');
	this.ctx 			= this.canvas.getContext('2d');
	this.canvas.height 	= window.innerHeight;
	this.canvas.width 	= window.innerWidth;

	this.aFires 		= [];
	this.aSpark 		= [];
	this.aSpark2 		= [];

	this.init();
}
Fire.prototype.init = function()
{
	// Mouse event listener has been removed
}
Fire.prototype.run = function(){
	this.update();
	this.draw();

	if( this.bRuning )
		requestAnimationFrame( this.run.bind( this ) );
}
Fire.prototype.start = function(){
	this.bRuning = true;
	this.run();
}
Fire.prototype.stop = function(){
	this.bRuning = false;
}

Fire.prototype.update = function(){
	// Add flames and sparks without using mouse position
	this.aFires.push( new Flame() );
	this.aSpark.push( new Spark() );
	this.aSpark2.push( new Spark() );

	// Update flames
	for (var i = this.aFires.length - 1; i >= 0; i--) {
		if( this.aFires[i].alive )
			this.aFires[i].update();
		else
			this.aFires.splice( i, 1 );
	}

	// Update sparks
	for (var i = this.aSpark.length - 1; i >= 0; i--) {
		if( this.aSpark[i].alive )
			this.aSpark[i].update();
		else
			this.aSpark.splice( i, 1 );
	}

	// Update spark2
	for (var i = this.aSpark2.length - 1; i >= 0; i--) {
		if( this.aSpark2[i].alive )
			this.aSpark2[i].update();
		else
			this.aSpark2.splice( i, 1 );
	}
}
Fire.prototype.draw = function(){
	this.ctx.globalCompositeOperation = "source-over";
	this.ctx.fillStyle = "rgba( 15, 5, 2, 1 )";
	this.ctx.fillRect( 0, 0, window.innerWidth, window.innerHeight );

	// Removed text drawing code for the word "FIRE"

	this.ctx.globalCompositeOperation = "overlay";//or lighter or soft-light
	for (var i = this.aFires.length - 1; i >= 0; i--) {
		this.aFires[i].draw( this.ctx );
	}

	this.ctx.globalCompositeOperation = "soft-light";//"soft-light";//"color-dodge";
	for (var i = this.aSpark.length - 1; i >= 0; i--) {
		if( ( i % 2 ) === 0 )
			this.aSpark[i].draw( this.ctx );
	}

	this.ctx.globalCompositeOperation = "color-dodge";//"soft-light";//"color-dodge";
	for (var i = this.aSpark2.length - 1; i >= 0; i--) {
		this.aSpark2[i].draw( this.ctx );
	}
}

var Flame = function(){
	// Use random positions instead of mouse position
	this.x = rand( window.innerWidth * 0.4, window.innerWidth * 0.6 );
	this.y = rand( window.innerHeight * 0.6, window.innerHeight * 0.75 );
	this.vy = rand( 1, 3 );
	this.vx = rand( -1, 1 );
	this.r = rand( 20, 30 );
	this.life = rand( 3, 6 );
	this.alive = true;
	this.c = {
		h : Math.floor( rand( 2, 40) ),
		s : 100,
		l : rand( 80, 100 ),
		a : 0,
		ta : rand( 0.8, 0.9 )
	}
}
Flame.prototype.update = function(){
	this.y -= this.vy;
	this.vy += 0.05;
	this.x += this.vx;
	if( this.x < this.cx ) this.vx += 0.1;
	else this.vx -= 0.1;
	if( this.r > 0 ) this.r -= 0.1;
	if( this.r <= 0 ) this.r = 0;
	this.life -= 0.15;
	if( this.life <= 0 ){
		this.c.a -= 0.05;
		if( this.c.a <= 0 ) this.alive = false;
	}else if( this.life > 0 && this.c.a < this.c.ta ){
		this.c.a += .08;
	}
}
Flame.prototype.draw = function( ctx ){
	ctx.beginPath();
	ctx.arc( this.x, this.y, this.r * 3, 0, 2*Math.PI );
	ctx.fillStyle = "hsla( " + this.c.h + ", " + this.c.s + "%, " + this.c.l + "%, " + (this.c.a/20) + ")";
	ctx.fill();
	ctx.beginPath();
	ctx.arc( this.x, this.y, this.r, 0, 2*Math.PI );
	ctx.fillStyle = "hsla( " + this.c.h + ", " + this.c.s + "%, " + this.c.l + "%, " + this.c.a + ")";
	ctx.fill();
}

var Spark = function(){
	this.cx = rand( window.innerWidth * 0.4, window.innerWidth * 0.6 );
	this.cy = rand( window.innerHeight * 0.6, window.innerHeight * 0.75 );
	this.x = rand( this.cx -40, this.cx + 40);
	this.y = rand( this.cy, this.cy + 5);
	this.lx = this.x;
	this.ly = this.y;
	this.vy = rand( 1, 3 );
	this.vx = rand( -4, 4 );
	this.r = rand( 0, 1 );
	this.life = rand( 4, 5 );
	this.alive = true;
	this.c = {
		h : Math.floor( rand( 2, 40) ),
		s : 100,
		l : rand( 40, 100 ),
		a : rand( 0.8, 0.9 )
	}
}
Spark.prototype.update = function(){
	this.lx = this.x;
	this.ly = this.y;
	this.y -= this.vy;
	this.x += this.vx;
	if( this.x < this.cx ) this.vx += 0.2;
	else this.vx -= 0.2;
	this.vy += 0.08;
	this.life -= 0.1;
	if( this.life <= 0 ){
		this.c.a -= 0.05;
		if( this.c.a <= 0 ) this.alive = false;
	}
}
Spark.prototype.draw = function( ctx ){
	ctx.beginPath();
	ctx.moveTo( this.lx , this.ly);
	ctx.lineTo( this.x, this.y);
	ctx.strokeStyle = "hsla( " + this.c.h + ", " + this.c.s + "%, " + this.c.l + "%, " + (this.c.a / 2) + ")";
	ctx.lineWidth = this.r * 2;
	ctx.lineCap = 'round';
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.moveTo( this.lx , this.ly);
	ctx.lineTo( this.x, this.y);
	ctx.strokeStyle = "hsla( " + this.c.h + ", " + this.c.s + "%, " + this.c.l + "%, " + this.c.a + ")";
	ctx.lineWidth = this.r;
	ctx.stroke();
	ctx.closePath();
}

rand = function( min, max ){ return Math.random() * ( max - min) + min; };
onresize = function () { oCanvas.canvas.width = window.innerWidth; oCanvas.canvas.height = window.innerHeight; };

var oCanvas;
init = function()
{
	oCanvas = new Fire();
	oCanvas.start();
}

window.onload = init;
