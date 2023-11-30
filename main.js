const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function dist(dx, dy){
    return Math.sqrt(dx * dx + dy * dy);
}
const mousePos = {
    x : 0,
    y : 0
}
canvas.addEventListener("mousemove", e => {
    mousePos.x = e.clientX - canvas.offsetLeft;
    mousePos.y = e.clientY - canvas.offsetTop;
})
class bulletPool{
    constructor() {
        this.bullets = [];
    }
    update(){
        this.bullets.forEach(bullet => {
            let n = 0;
            if(bullet.detectCollision()){
                n++;
            }
            bullet.update();
        } )
        if( n > 0){
            this.bullets = this.bullets.filter(bullet => bullet.inUse);
        }
    }
    render(){
        this.bullets.forEach(bullet => bullet.render());
    }
}
class bullet{
    constructor(canvas, player, x, y, radius, dx, dy, power, lifeTime) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.player = player;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.power = power
        this.lifeTime = lifeTime;
        this.inUse = true;
    }
    update(){
        this.x += this.dx;
        this.y += this.dy;
        this.lifeTime -= 0.06;
    }
    detectCollision(){
        if(dist(this.x - this.player.x, this.y - this.player.y) < this.player.radius){
            this.inUse = false;
            this.player.addImpact(this.x - this.player.x, this.y - this.player.y, 100);
            return true;
        }
    }
    render(){
        this.context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2*Math.PI)
        this.context.fill();
    }
}
class impact{
    constructor(x, y, lifeTIme){
        this.x = x;
        this.y = y;
        this.lifeTIme = lifeTIme;
    }
    update(){
        this.lifeTIme -= 0.01;
    }
    render(){
        // todo
    }
}
class player{
    constructor(canvas, x, y, radius) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d")
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.impacts = []
    }
    update(){
        this.x = mousePos.x;
        this.y = mousePos.y;
    }
    addImpact(x, y, lifeTime){
        this.impacts.push(new impact(x, y, lifeTime));
    }
    render(){
        this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        this.context.fill();
    }
}