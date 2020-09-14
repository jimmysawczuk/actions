const core = require("@actions/core")

async function run() {
  try {
    const tagName = core.getInput("ref", { required: true })
    const tag = tagName.replace("refs/tags/", "")
    core.setOutput("tag", tag)
  } catch (e) {
    core.setFailed(e.message)
  }
}

run()
