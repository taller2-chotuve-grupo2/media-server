const reactionRepository = require('../repositories/reactionRepository.js')

async function reactToResource (resource, reactionData) {
  var lastReaction = await reactionRepository.getOwnerReactionToResource(resource.id, reactionData.owner)

  if (lastReaction) {
    lastReaction.status = reactionData.status
    await lastReaction.save()
    return await lastReaction.reload()
  }

  var reaction = await reactionRepository.createReaction(reactionData)

  await resource.addReaction(reaction)

  return await reaction.reload()
}

async function getReactionsInformation (resourceId, ownerToSearch = null) {
  var reactionCount = await reactionRepository.countReactionsForResourceId(resourceId)
  var userReaction = null

  if (ownerToSearch) {
    try {
      userReaction = (await reactionRepository.getOwnerReactionToResource(resourceId, ownerToSearch)).toJSON()
    } catch {
      userReaction = null
    }
  }

  reactionCount.userReaction = userReaction

  return reactionCount
}

async function getLikesCountForUsername (username) {
  if (username === null || username === undefined) {
    return 0
  }

  return await reactionRepository.countReactionsForUsername(username, 'Me gusta')
}

async function getDislikesCountForUsername (username) {
  if (username === null || username === undefined) {
    return 0
  }

  return await reactionRepository.countReactionsForUsername(username, 'No me gusta')
}

exports.getDislikesCountForUsername = getDislikesCountForUsername
exports.getLikesCountForUsername = getLikesCountForUsername
exports.getReactionsInformation = getReactionsInformation
exports.reactToResource = reactToResource
