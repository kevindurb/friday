class Greetings {
  constructor(friday) {
    this.friday = friday;
  }

  async shouldRespond(message) {
    return message.includes('hi');
  }

  async respond() {
    return 'hello world';
  }
}

module.exports = Greetings;
