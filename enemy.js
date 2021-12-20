class Enemy {
  constructor({ initialCords, speed, size, p5 }) {
    this.p5 = p5;
    this.r = size;
    this.speed = speed;
    this.x = initialCords[0];
    this.y = initialCords[1] - this.r;
  }

  move() {
    this.x -= this.speed;
  }

  show() {
    this.p5.image(eImg, this.x, this.y, this.r, this.r);
  }
}
