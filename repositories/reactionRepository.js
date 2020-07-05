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

async function countReactionsForResourceId (resourceId) {
  const likes = await Reaction.count({
    where: {
      status: 'Me gusta',
      resourceId: resourceId
    }
  })

  const dislikes = await Reaction.count({
    where: {
      status: 'No me gusta',
      resourceId: resourceId
    }
  })

  return {
    likes: likes,
    dislikes: dislikes
  }
}

async function getOwnerReactionToResource (idResource, owner) {
  return await Reaction.findOne({
    where: {
      owner: owner,
      resourceId: idResource
    }
  })
}

exports.getOwnerReactionToResource = getOwnerReactionToResource
exports.countReactionsForResourceId = countReactionsForResourceId
exports.createReaction = createReaction
exports.getOneById = getOneById
