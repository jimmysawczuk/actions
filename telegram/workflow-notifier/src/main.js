const core = require("@actions/core")
const querystring = require("querystring")
const fetch = require("node-fetch")

async function run() {
  try {
    const chatID = core.getInput("chatID", { required: true })
    const telegramBotURL = core.getInput("telegramBotURL", {
      required: true,
    })

    const repo = process.env.GITHUB_REPOSITORY
    const sha = process.env.GITHUB_SHA
    const shortSha = sha.substr(0, 7)
    const jobName = process.env.GITHUB_JOB
    const workflowName = process.env.GITHUB_WORKFLOW

    const message = `${jobName} starting on <a href="https://github.com/${repo}>${repo}</a>

 - Commit: <a href="https://github.com/${repo}/commit/${sha}">${shortSha}</a>
`

    await fetch(telegramBotURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        chat_id: chatID,
        parse_mode: "HTML",
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
        core.debug("Sent!")
      })
      .catch((e) => {
        throw e
      })
  } catch (e) {
    core.error(e)
    core.setFailed(e)
  }
}

run()
