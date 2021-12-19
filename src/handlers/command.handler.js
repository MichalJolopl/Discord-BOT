const { readdirSync } = require("fs")

const { PREFIX, OWNER } = require(__dirname + "/../config/config.js")

const { Collection } = require("discord.js")

const ascii = require("ascii-table")

const table = new ascii().setHeading("Command", "Load status")

module.exports = (client) => {
  // Collections
  client.commands = new Collection()
  // Cooldowns Collection
  const cooldowns = new Collection()

  const commandFiles = readdirSync(__dirname + "/../commands").filter((file) =>
    file.endsWith(".command.js"),
  )

  for (const file of commandFiles) {
    const command = require(__dirname + `/../commands/${file}`)

    if (command.name) {
      client.commands.set(command.name, command)
      table.addRow(file, "✅")
    } else {
      table.addRow(file, "❌  -> missing 'name'!")
      continue
    }
  }

  console.log(table.toString())

  client.on("message", (msg) => {
    const { author, guild, channel } = msg

    // Check if user is a bot
    if (author.bot) {
      return
    }

    const { settings } = client

    const guildId = guild?.id

    // Save channel id to config
    if (!settings.get(guildId)) {
      settings.set(guildId, {
        clocks: [],
        prefix: null,
      })
    }

    // Load guild prefix from config
    const guildPrefix = settings.get(guildId)?.prefix

    // Load prefix
    let prefix = guildPrefix ? guildPrefix : PREFIX

    // Ignore messages without prefix
    if (!msg.content.startsWith(prefix)) return

    const args = msg.content.slice(prefix.length).trim().split(/ +/g)

    const cmdName = args.shift().toLowerCase()

    const cmd =
      client.commands.get(cmdName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(cmdName),
      )

    // Check if commands exist
    if (!cmd) return

    // Check if command only allowed in guild
    if (cmd.guildOnly && !guild) {
      return msg.reply("Nie mogę ci wysłać tej wiadomości na PV!")
    }

    // =================================
    //
    // Check owner only
    //
    // =================================
    if (cmd.ownerOnly) {
      if (author.id !== OWNER) {
        return msg.reply("Ta komenda jest tylko dla Właściciela")
      }
    }

    // =================================
    //
    // Check permissions
    //
    // =================================
    // Check bot permissions
    if (cmd.botPermissions && cmd.botPermissions.length) {
      if (!guild.me.permissionsIn(channel).has(cmd.botPermissions)) {
        return channel.send(
          `Nie masz premisji by użyć tej komendy. \`${cmd.botPermissions.join(
            "`,`",
          )}\``,
        )
      }
    }

    // Check user permissions
    if (cmd.userPermissions && cmd.userPermissions.length) {
      if (!msg.member.permissionsIn(channel).has(cmd.userPermissions)) {
        return msg.reply("Nie masz premisji.")
      }
    }

    if (cmd.args && !args.length) {
      let reply = `Nie podałeś argumentów, ${msg.author}!`

      if (cmd.usage) {
        reply += `\nPowinieneś napisać: \`${PREFIX}${cmd.name} ${cmd.usage}\``
      }

      return msg.channel.send(reply)
    }

    // Check cooldowns
    if (!cooldowns.has(cmdName)) {
      cooldowns.set(cmdName, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(cmdName)
    const cooldownAmount = (cmd.cooldown || 3) * 1000

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        return msg.reply(
          `Proszę czekać ${timeLeft.toFixed(
            1,
          )} więcej sekund po użyciu \`${cmdName}\` komendy.`,
        )
      }
    }

    timestamps.set(msg.author.id, now)
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)

    try {
      cmd.run(msg, args)
    } catch (error) {
      console.error(error)
      msg.reply("Wystąpił Błąd!")
    }
  })
}
