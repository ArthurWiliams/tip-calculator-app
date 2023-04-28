class Counter {
  private count = 0;

  getCount() {
    this.count += 1;
    return this.count;
  }
}

export default new Counter();
