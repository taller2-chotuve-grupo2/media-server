function buildReactionsList (reactions) {
  var finalList = []
  reactions.forEach(reaction => {
    finalList.push(reaction.dataValues)
  })

  return finalList
}

exports.buildReactionsList = buildReactionsList
