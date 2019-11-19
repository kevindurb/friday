class Greetings {
  constructor(friday) {
    this.friday = friday;
  }

  async shouldRespond(message) {
    return message.text.includes('hi');
  }

  async respond() {
    return 'hello world';
  }
}

module.exports = Greetings;
