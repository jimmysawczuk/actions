const ncc = require("@vercel/ncc")
const fs = require("fs")

async function run() {
  const dirs = [
    "github/get-tag-from-ref",
    "telegram/job-started",
    "telegram/job-failed",
    "telegram/send-message",
    "telegram/workflow-started",
  ]

  for (let dir of dirs) {
    console.log(`Processing ${dir}`)
    ncc(`${__dirname}/../${dir}/src/main.js`, {
      quiet: true,
    }).then((resp) => {
      fs.mkdirSync(`${__dirname}/../${dir}/dist`, {
        recursive: true,
      })
      fs.writeFileSync(`${__dirname}/../${dir}/dist/index.js`, resp.code)
    })
    console.log("...done!")
  }
}

run()
