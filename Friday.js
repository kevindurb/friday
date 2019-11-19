class Friday {
  constructor() {
    this.resolvers = [];
  }

  register(module) {
    if (!this.resolvers.includes(module)) {
      this.resolvers.push(module);
    }
  }

  async respond(message) {
    const shoulds = (await Promise.all(
      this.resolvers.map(
        resolver => resolver.shouldRespond(message)
        .then((can) => can ? resolver : false),
      ),
    )).filter(r => r);

    if (shoulds.length === 0) return;

    const responder = shoulds[0];

    return await responder.respond(message);
  }
}

module.exports = Friday;
