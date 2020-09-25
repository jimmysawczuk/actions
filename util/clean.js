const fs = require("fs")
const dirs = require("./dirs")

async function run() {
  for (let dir of dirs) {
    console.log(`Cleaning ${dir}`)

    fs.rmdirSync(`${__dirname}/../${dir}/dist`, {
      recursive: true,
    })

    console.log(`done with ${dir}`)
  }
}

run()
