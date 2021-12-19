const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "info",
  description: "Informacje o bocie.",
  aliases: ["botinfo"],

  run(msg, args) {
    const { channel } = msg

    const botAuthor = "**Michał #0425**"
    const botVersion = "**v1.0**"
    const botName = "**BOT Admin**"
    const botDescription =
      "**Jestem BOT-em administracyjnym autorstwa Michała**"
    const botHelp = "Więcej pod komendą **!help**"

    const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle(botName)
      // Set the color of the embed
      .setColor(0xb348ff)
      // Set the main content of the embed
      .setDescription(botDescription)
      .addField("Autor", botAuthor, true)
      .addField("Wersja", botVersion, true)
      .addField("Pomoc", botHelp, true)

    channel.send(embed)
  },
}
