const Reaction = require('../models').Reaction

async function createReaction (reactionData) {
  const reaction = await Reaction.create(reactionData)

  return reaction
}

async function getOneById (id) {
  const reaction = await Reaction.findOne({
    where: {
      id: id
    }
  })

  return reaction
}

exports.createReaction = createReaction
exports.getOneById = getOneById
