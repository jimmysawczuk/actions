const core = require("@actions/core")
const { default: sendMessage } = require("../../../lib/telegram")

function getMessage(params) {
  const runURL = `https://github.com/${params.repo}/actions/runs/${params.runID}`
  const commitURL = `https://github.com/${params.repo}/commit/${params.commit}`
  const shortCommit = commit.substr(0, 7)

  return `<b>Workflow ${params.workflow} <a href="${runURL}">failed</a></b>

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
    const job = process.env.GITHUB_JOB
    const runID = process.env.GITHUB_RUN_ID
    const workflow = process.env.GITHUB_WORKFLOW

    sendMessage(
      telegramBotURL,
      chatID,
      getMessage(commit, repo, job, runID, workflow),
      {
        parseMode: "HTML",
      },
    )
  } catch (e) {
    core.setFailed(e)
  }
}

run()
