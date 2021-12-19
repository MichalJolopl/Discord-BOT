const Discord = require("discord.js")

module.exports = {
  name: "matix",
  description: "Mniam banik dla dzbanixa",
  aliases: ["dzbanix", "matix78", "dzbanix78"],
  guildOnly: true,
  cooldown: 1,

  async run(msg, args) {

    // Since the image takes time to load, you should await it
    const background = await loadImage(
      __dirname + "./../assets/img/Banned.jpg",
    )

        // Use helpful Attachment class structure to process the file for you
        const attachment = new Discord.MessageAttachment(
            toBuffer(),
            "Banned.jpg",
          )
      
          msg.channel.send("BAN DLA MATIXA!", attachment)
        },
      }
 