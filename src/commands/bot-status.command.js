const {
  Permissions: { FLAGS },
} = require("discord.js")

const activities = [
  "PLAYING",
  "STREAMING",
  "LISTENING",
  "WATCHING",
  "CUSTOM_STATUS",
  "CLEAR",
]

module.exports = {
  name: "botstatus",
  aliases: ["bot-status"],
  description: "Ustawianie statusu dla bota",
  args: true,
  usage: "<activity-type> <name>",
  botPermissions: [FLAGS.SEND_MESSAGES],
  ownerOnly: true,

  run(msg, args) {
    const { client } = msg

    const activityType = args[0].toUpperCase()
    let activityName = [...args].slice(1).join(" ")

    // Check activity type
    if (!activities.includes(activityType)) {
      return msg.reply(
        `Zły status, możesz wybrać: \`${activities.join(
          "` ,`",
        )}\`.`,
      )
    }

    // Clear presence
    if (activityType === "CLEAR") activityName = ""

    const presenceOptions = {
      activity: {
        type: activityType,
        name: activityName,
      },
    }

    client.user.setPresence(presenceOptions).then((presence) => {
      msg.channel.send("✅ Status ustwaiony!")
    })
  },
}
