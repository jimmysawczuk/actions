const core = require("@actions/core")

async function run() {
  try {
    const ref = core.getInput("ref", { required: true })

    if (ref.match(new RegExp("^refs/tags/"))) {
      const tag = ref.replace("refs/tags/", "")
      console.debug("setting tag", tag)
      core.setOutput("tag", tag)
    }

    if (ref.match(new RegExp("^refs/heads/"))) {
      const branch = ref.replace("refs/heads/", "")
      console.debug("setting branch", branch)
      core.setOutput("branch", branch)
    }
  } catch (e) {
    core.setFailed(e.message)
  }
}

run()
