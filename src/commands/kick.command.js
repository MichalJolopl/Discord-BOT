const {
  Permissions: { FLAGS },
} = require("discord.js")

module.exports = {
  name: "kick",
  description: "Wyrzucenie.",
  args: true,
  usage: "<user> [reason]",
  botPermissions: [FLAGS.KICK_MEMBERS],
  userPermissions: [FLAGS.KICK_MEMBERS],

  run(msg, args) {
    const { channel, guild, mentions, author } = msg

    const reasonArg = [...args].slice(1).join(" ")

    const userToKick = mentions.users.first()

    if (!userToKick) {
      return msg.reply("Musisz podać poprawnego użytkownika.")
    }

    if (userToKick.id === author.id) {
      return msg.reply("Nie możesz siebie samego wyrzucić!")
    }

    const memberToKick = guild.members.cache.get(userToKick.id)

    if (!memberToKick.kickable) {
      return channel.send("Nie masz dostępu do tej komendy.")
    }

    memberToKick.kick(reasonArg).then((res) => {
      channel.send(
        `**Użytkownik ${res.displayName} został wyrzucony.**\n${
          reasonArg ? `Powód: ${reasonArg}` : ""
        }`,
      )
    })
  },
}
