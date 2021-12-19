const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "pp",
  description: "Polska Podziemna Wygrała!",
  aliases: ["ppw"],

  run(msg, args) {
    const { channel } = msg

    const message = "**Polska Podziemna Wygrała!**"

    const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle(message)
      // Set the color of the embed
      .setColor(0xb348ff)

    channel.send(embed)
  },
}
