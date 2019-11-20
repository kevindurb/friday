module.exports = {
  getDates() {
    return entities.filter(({ entity }) => entity === 'date')
      .map(({ resolution }) => resolution.date);
  }
};
