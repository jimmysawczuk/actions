const core = require("@actions/core")
const { default: sendMessage } = require("../../../lib/telegram")

async function run() {
  try {
    const chatID = core.getInput("chatID", { required: true })
    const telegramBotURL = core.getInput("telegramBotURL", {
      required: true,
    })
    const message = core.getInput("message", { required: true })
    const parseMode = core.getInput("parseMode")

    sendMessage(telegramBotURL, chatID, message, {
      parseMode,
    })
  } catch (e) {
    core.setFailed(e)
  }
}

run()
