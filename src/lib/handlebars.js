const { format } = require("timeago.js")

const timeago = (savedTimestamp) => format(savedTimestamp + "UTC");

module.exports = timeago
