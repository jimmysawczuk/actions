const ncc = require("@vercel/ncc")
const fs = require("fs")
const dirs = require("./dirs")

async function run() {
  for (let dir of dirs) {
    console.log(`Processing ${dir}`)

    for (let name of ["main", "post", "pre"]) {
      if (!fs.existsSync(`${__dirname}/../${dir}/src/${name}.js`)) {
        continue
      }

      console.log(`  building ${name}`)

      ncc(`${__dirname}/../${dir}/src/${name}.js`, {
        quiet: true,
      }).then((resp) => {
        fs.mkdirSync(`${__dirname}/../${dir}/dist`, {
          recursive: true,
        })
        fs.writeFileSync(`${__dirname}/../${dir}/dist/${name}.js`, resp.code)
      })
    }
    console.log(`done with ${dir}`)
  }
}

run()
