const core = require("@actions/core")

async function run() {
  try {
    const ref = core.getInput("ref", { required: true })

    if (ref.match(new RegExp("^refs/tags/"))) {
      const tag = ref.replace("refs/tags/", "")
      core.setOutput("tag", tag)

      if (ref.match(new RegExp("^refs/heads/"))) {
        const branch = ref.replace("refs/heads/", "")
        core.setOutput("branch", branch)
      }
    }
  } catch (e) {
    core.setFailed(e.message)
  }
}

run()
