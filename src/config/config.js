const dotenv = require("dotenv").config({ path: __dirname + "/./../../.env" })

module.exports = {
  TOKEN: "YOUR TOKEN PLACE",
  PREFIX: "!",
  OWNER: "Michał#0425",
  CORONA_API: "https://corona.lmao.ninja/v2",
  TDDR_API: "https://api.td2.info.pl:9640/?method=getStationsOnline",
  TDMECH_API: "https://api.td2.info.pl:9640/?method=getTrainsOnline",
}
