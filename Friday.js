const { NlpManager } = require('node-nlp');


class Friday {
  constructor(modules) {
    this.manager = new NlpManager({ languages: ['en'] });
    this.modules = this.buildModules(modules);
    this.manager.train();
  }

  buildModules(modules) {
    return modules.reduce((acc, Mod) => {
      const mod = new Mod();
      const name = mod.constructor.name;
      this.buildClassifiers(
        name,
        mod.getClassifiers(),
      );
      return {
        ...acc,
        [name]: mod,
      };
    }, {});
  }

  buildClassifiers(moduleName, classifiers) {
    classifiers.forEach(([message, classifier]) => {
      this.manager.addDocument(
        'en',
        message,
        `${moduleName}.${classifier}`,
      );
    });
  }

  async respond(message) {
    try {
      const {
        intent,
        entities,
      } = await this.manager.process(message.text);

      if (intent === 'None') return 'Sorry I dont understand what you\'re saying...';

      const [
        module,
        fn,
      ] = intent.split('.');

      return await this.modules[module][fn](message, entities);
    } catch (e) {
      return e.message;
    }
  }
}

module.exports = Friday;
