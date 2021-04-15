const moment = require("moment");

const formatMsg = (userName, msg) => {
  return {
    userName,
    msg,
    time: moment().format("h:mm a"),
  };
};
module.exports = formatMsg;
