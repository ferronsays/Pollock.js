Drip = (function() {
  function Drip(options) {
    this.settings = {
      lifeSpan: 1000,
      position: new Vector2D(0,0),
      velocity: new Vector2D(0,0),
      color: '#333',
      size: 1,
      onDeath: function(event){},
    };

    Pollock.extend(this.settings, options, true);

    this.age = 0;
    this.alive = true;
  };

  Drip.prototype.update = function(dt) {
    this.age += dt;

    if(this.age > this.settings.lifeSpan)
    {
      this.kill();
      return;
    }

    //Move it around randomly.  No science behind this, it just turned out pretty good!
    this.settings.velocity.add(new Vector2D(Math.random()*.5 - .25, Math.random()*.5 - .25));
    var lPosition = this.settings.position.clone();
    this.settings.position.add(this.settings.velocity);
    var dPosition = Vector2D.subtract(this.settings.position, lPosition);
    var a = (Math.atan2(dPosition.y, dPosition.x) + Math.PI/2);
    this.settings.velocity.x += this.settings.velocity.x * Math.cos(a) - this.settings.velocity.y * Math.sin(a);
    this.settings.velocity.y += this.settings.velocity.x * Math.sin(a) + this.settings.velocity.y * Math.cos(a);
  };

  Drip.prototype.draw = function(context) {
    var t = new Date().getTime();

    context.save();
    //context.globalAlpha = 0.1;//uncommenting this gives a watercolor-like look
    context.beginPath();
    context.fillStyle = this.settings.color;

    //Do some time based calculation to get size variation
    context.arc(
      this.settings.position.x,
      this.settings.position.y,
      Math.abs((Math.sin(t)*Math.sin(t*.5))*this.settings.size),
      0,
      2 * Math.PI,
      false
    );

    context.fill();
    context.restore();
  };

  Drip.prototype.kill = function(){
    this.alive = false;
    this.settings.onDeath();
  };

  return Drip;
})();
