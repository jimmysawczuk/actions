export default async function sendMessage(botURL, chatID, message, opts = {}) {
  opts = {
    parseMode: "HTML",
    disableWebPagePreview: undefined,
    ...opts,
  }

  await fetch(botURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      chat_id: chatID,
      parse_mode: opts.parseMode,
      disable_web_page_preview: opts.disableWebPagePreview ? "true" : "false",
      text: message,
    }),
  })
    .then((resp) => {
      return resp.json()
    })
    .then((resp) => {
      console.log("sent", resp)
    })
    .catch((e) => {
      throw e
    })
}
