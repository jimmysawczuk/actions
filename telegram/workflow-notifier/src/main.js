const core = require("@actions/core")
const querystring = require("querystring")
const fetch = require("node-fetch")

async function run() {
  try {
    const chatID = core.getInput("chatID", { required: true })
    const telegramBotURL = core.getInput("telegramBotURL", {
      required: true,
    })
    const sha = core.getInput("commit", { required: true })
    // const message = core.getInput("message", { required: true })
    // const parseMode = core.getInput("parseMode")

    console.log(process.env, sha)
    console.log("got here!")
    return

    await fetch(telegramBotURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        chat_id: chatID,
        parse_mode: parseMode,
        disable_web_page_preview: "true",
        text: message,
      }),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw `Telegram request failed: ${JSON.stringify(resp)}`
        }

        return resp.json()
      })
      .then((resp) => {
        console.log("sent!", resp)
      })
      .catch((e) => {
        throw e
      })
  } catch (e) {
    core.setFailed(e)
  }
}

run()
