import fetch from "node-fetch"

(async () => {
  const urls = [
    "https://framework-research-svelte.vercel.app/",
    "https://framework-research-react.vercel.app/",
    "https://framework-research-vue.vercel.app/",
  ]

  for (const url of urls) {
    console.log(`Time to interactive for: ${url}`)
    const { lighthouseResult } = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${ encodeURIComponent(url) }&category=PERFORMANCE`)
      .then(r => r.json())

    const timeToInteractive = lighthouseResult.audits.interactive.displayValue

    console.log(`result: ${timeToInteractive}`)
  }
})()