const axios = require("axios")

const { CORONA_API, TDDR_API } = require(__dirname + "/../config/config.js")

module.exports = (client) => {
  const instance = axios.create({
    baseURL: CORONA_API, TDDR_API
  })

  client.axios = instance
}
