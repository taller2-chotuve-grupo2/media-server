const reactionRepository = require('../repositories/reactionRepository.js')

async function reactToResource (resource, reactionData) {
  var reaction = await reactionRepository.createReaction(reactionData)

  await resource.addReaction(reaction)
  await reaction.setResource(resource)

  return reaction
}

exports.reactToResource = reactToResource
