const core = require("@actions/core")
const { default: sendMessage } = require("../../../lib/telegram")

function getMessage(params) {
  const runURL = `https://github.com/${params.repo}/actions/runs/${params.runID}`
  const commitURL = `https://github.com/${params.repo}/commit/${params.commit}`
  const shortCommit = params.commit.substr(0, 7)

  return `<b>Workflow ${params.workflow} <a href="${runURL}">started</a></b>

 - commit: <a href="${commitURL}">${shortCommit}</a>`
}

async function run() {
  try {
    const chatID = core.getInput("chatID", { required: true })
    const telegramBotURL = core.getInput("telegramBotURL", {
      required: true,
    })

    const commit = process.env.GITHUB_SHA
    const repo = process.env.GITHUB_REPOSITORY
    const runID = process.env.GITHUB_RUN_ID
    const workflow = process.env.GITHUB_WORKFLOW

    sendMessage(
      telegramBotURL,
      chatID,
      getMessage({
        repo,
        commit,
        runID,
        workflow,
      }),
      {
        parseMode: "HTML",
      },
    )
  } catch (e) {
    core.setFailed(e)
  }
}

run()
