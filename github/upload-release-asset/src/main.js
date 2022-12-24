const github = require("@actions/github")
const core = require("@actions/core")
const fs = require("fs")

async function run() {
  try {
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN)

    const uploadUrl = core.getInput("upload_url", { required: true })
    const assetPath = core.getInput("asset_path", { required: true })
    const assetName = core.getInput("asset_name", { required: true })
    const assetContentType = core.getInput("asset_content_type", {
      required: true,
    })

    const contentLength = (filePath) => fs.statSync(filePath).size

    const headers = {
      "content-type": assetContentType,
      "content-length": contentLength(assetPath),
    }

    console.log({
      uploadUrl,
      assetPath,
      assetName,
      assetContentType,
      headers,
      file: fs.readFileSync(assetPath).length,
    })

    const uploadAssetResponse = await octokit.rest.repos.uploadReleaseAsset({
      url: uploadUrl,
      headers,
      name: assetName,
      file: fs.readFileSync(assetPath),
    })

    console.log({
      resp: uploadAssetResponse,
    })

    const {
      data: { browser_download_url: browserDownloadUrl },
    } = uploadAssetResponse

    core.setOutput("browser_download_url", browserDownloadUrl)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
