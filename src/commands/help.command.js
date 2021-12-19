const { PREFIX } = require("../config/config.js")

module.exports = {
  name: "help",
  description:
    "Wszystkie komendy bota.",
  usage: "[command name]",
  cooldown: 5,

  run(msg, args) {
    const {
      client: { commands },
    } = msg

    const data = []

    // =====================================
    //
    // No arguments provided
    //
    // =====================================
    if (!args.length) {
      // Create list with all commands
      data.push("Moje komendy:")
      data.push(commands.map((command) => command.name).join(", "))
      data.push(
        `\nMożesz napisać \`${PREFIX}help [command name]\` aby zobaczyć opis konkretnej komendy!`,
      )

      return msg.author
        .send(data, { split: true })
        .then(() => {
          if (msg.channel.type === "dm") return
          msg.reply("**Wysłałem ci wszystkie komendy na PV!**")
        })
        .catch((err) => {
          console.error(`Could not send help DM to ${msg.author.tag}.\n`, err)
          msg.reply("Nie mogę ci wysłać wiadomości na PV! Czy masz włączone wysyłanie na PV?")
        })
    }

    // =====================================
    //
    // Arguments provided
    //
    // =====================================
    const name = args[0].toLowerCase()
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name))

    if (!command) {
      return msg.reply("Komenda nie istnieje!")
    }

    data.push(`**Nazwa:** ${command.name}`)

    if (command.aliases) data.push(`**Inne nazwy:** ${command.aliases.join(", ")}`)
    if (command.description)
      data.push(`**Opis:** ${command.description}`)
    if (command.usage)
      data.push(`**Użycie:** ${prefix}${command.name} ${command.usage}`)

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

    msg.channel.send(data, { split: true })
  },
}
