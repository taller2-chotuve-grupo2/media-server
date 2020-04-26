const models = require('../models');

describe('Database tests', function() {
  it('should connect to database',async () => {
   await models.sequelize.authenticate()
  })
})
