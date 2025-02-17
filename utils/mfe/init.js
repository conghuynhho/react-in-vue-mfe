import { init } from "@module-federation/enhanced/runtime"

const initProdManifest = async (initConfigs) => {
  const maxRetries = 3
  const retryDelay = 1000

  const fetchWithRetry = async (url, retryCount = 0) => {
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      if (retryCount < maxRetries) {
        console.error(`Failed to fetch manifest from ${url}, attempt ${retryCount + 1} of ${maxRetries}`)
        await new Promise(resolve => setTimeout(resolve, retryDelay * (retryCount + 1)))
        return fetchWithRetry(url, retryCount + 1)
      }
      throw error
    }
  }

  // Initialize each remote separately
  Promise.allSettled(initConfigs.remotes.map(async (remote) => {
    try {
      const remoteManifest = await fetchWithRetry(remote.manifestURL)

      if (remoteManifest && remoteManifest.entry) {
        const entryFile = remoteManifest.entry
        remote.entry = entryFile

        await init({
          name: initConfigs.name,
          remotes: [remote]
        })
      } else {
        throw new Error(`Failed to fetch manifest from ${remote.manifestURL}`)
      }
    } catch (error) {
      console.error(`Failed to initialize remote ${remote.name}:`, error)
    }
  }))
}



export default function initMFE(remoteModules) {
  const initConfigs = {
    name: "mypage",
    remotes: remoteModules
  }
  console.log("initMFE", process.env.NODE_ENV)
  if (process.env.NODE_ENV === "local") {
    init(initConfigs)
  } else {
    initProdManifest(initConfigs)
  }
}