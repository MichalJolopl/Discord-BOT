const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "julka",
  description: "Julka :D",
  usage: ["[commandname]"],

  run(msg, args) {
    const { channel } = msg

    const message = "**Julka jest kochana 🧡**"

    const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle(message)
      // Set the color of the embed
      .setColor(0xb348ff)

    channel.send(embed)
  },
}
