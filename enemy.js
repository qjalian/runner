class Enemy {
  constructor({ initialCords, speed, size }) {
    this.r = size;
    this.speed = speed;
    this.x = initialCords[0];
    this.y = initialCords[1] - this.r;
  }

  move() {
    this.x -= this.speed;
  }

  show() {
    image(eImg, this.x, this.y, this.r, this.r);
  }
}
