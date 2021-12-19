const {
  Permissions: { FLAGS },
} = require("discord.js")

module.exports = {
  name: "clear",
  description: "Usuwanie wiadomości",
  args: true,
  usage: "<amount>",
  botPermissions: [FLAGS.MANAGE_MESSAGES],
  userPermissions: [FLAGS.MANAGE_MESSAGES],

  run(msg, args) {
    const { channel, guild, member } = msg

    const amountArg = parseInt(args[0])

    if (!Number.isInteger(amountArg)) {
      return channel.send("Musisz podać ilość wiadomości do usunięcia!")
    }

    if (amountArg < 2 || amountArg >= 100) {
      return channel.send(
        "Liczba nie może być mniejsza niż 1 ale też i większa niż 100",
      )
    }

    channel.bulkDelete(amountArg)
  },
}
