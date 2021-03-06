const { PREFIX } = require("../config/config.js")
const {
  Permissions: { FLAGS },
} = require("discord.js")

module.exports = {
  name: "prefix",
  description:
    "Komenda serverowa która pozwala na zmianę prefixu",
  guildOnly: true,
  usage: "[prefix]",
  botPermissions: [FLAGS.SEND_MESSAGES],
  userPermissions: [FLAGS.ADMINISTRATOR],

  async run(msg, args) {
    const { channel, guild, client } = msg

    const prefixArg = args[0]

    const { settings } = client

    // Save channel id to config
    if (!settings.get(guild.id)) {
      settings.set(guild.id, { clocks: [], prefix: null })
    }

    // No prefix found.
    // Display actual prefix
    if (!prefixArg) {
      let prefix = client.settings.get(guild.id).prefix
      if (!prefix) prefix = PREFIX
      channel.send(`Prefix \`${prefix}\`.`)
    } else {
      client.settings.get(guild.id).prefix = prefixArg
      client.saveConfig(guild.id)
      channel.send(`Prefix został zmieniony na \`${prefixArg}\`.`)
    }
  },
}
