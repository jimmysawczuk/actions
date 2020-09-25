const core = require("@actions/core")
var formatDuration = require("date-fns/formatDuration")
const { default: sendMessage } = require("../../../lib/telegram")

function getMessage(params) {
  const runURL = `https://github.com/${params.repo}/actions/runs/${params.runID}`
  const commitURL = `https://github.com/${params.repo}/commit/${params.commit}`
  const shortCommit = params.commit.substr(0, 7)

  const now = new Date()
  const then = new Date(params.startTime)

  console.log(now, then, +now, +then)

  const duration = formatDuration(now - then)

  return `<b>Job ${params.job} <a href="${runURL}">succeeded</a></b>

 - repo: <a href="https://github.com/${params.repo}">${params.repo}</a>
 - commit: <a href="${commitURL}">${shortCommit}</a>
 - url: <a href="${params.url}">${params.url}</a>
 - duration: ${duration}`
}

async function run() {
  try {
    const chatID = core.getInput("chatID", { required: true })
    const telegramBotURL = core.getInput("telegramBotURL", {
      required: true,
    })
    const url = core.getInput("url")
    const startTime = core.getInput("startTime")

    console.log(startTime)

    const commit = process.env.GITHUB_SHA
    const repo = process.env.GITHUB_REPOSITORY
    const job = process.env.GITHUB_JOB
    const runID = process.env.GITHUB_RUN_ID
    const workflow = process.env.GITHUB_WORKFLOW

    sendMessage(
      telegramBotURL,
      chatID,
      getMessage({
        commit,
        repo,
        job,
        runID,
        url,
        startTime,
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
