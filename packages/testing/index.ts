import * as chromeLauncher from "chrome-launcher"
import lighthouse from "lighthouse"
import lighthouseConfig from "./lighthouse-config"

(async () => {
  const urls = [
    "https://framework-research-svelte.vercel.app/",
    "https://framework-research-react.vercel.app/",
  ]
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] })
  for (const url of urls) {
    const runnerResult = await lighthouse(url, {
      output: "html",
      onlyCategories: ["performance"],
      port: chrome.port,
    }, lighthouseConfig)

    // `.lhr` is the Lighthouse Result as a JS object
    console.log("Report is done for", runnerResult.lhr.finalUrl)
    console.log("Performance was", runnerResult.lhr.categories.performance.auditRefs.find(audit => audit.id === "interactive"))
  }

  await chrome.kill()
})()