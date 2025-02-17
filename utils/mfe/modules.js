import React from 'react'
import ReactDOM from 'react-dom'

const sharedConfig = {
  react: {
    version: "19.0.0",
    scope: "default",
    lib: () => React,
    shareConfig: {
      singleton: true,
      requiredVersion: "^19.0.0"
    }
  },
  "react-dom": {
    version: "19.0.0",
    scope: "default",
    lib: () => ReactDOM,
    shareConfig: {
      singleton: true,
      requiredVersion: "^19.0.0"
    }
  }
}

export const sampleModule = [
  {
    name: "reactModule",
    entry: "http://localhost:3000/remoteEntry.js",
    manifestURL: "http://localhost:3000/mfe-manifest.json",
    shared: sharedConfig
  }
]

export const sampleModule2 = [
  {
    name: "reactModule2",
    entry: "http://localhost:3001/remoteEntry.js",
    manifestURL: "http://localhost:3001/mfe-manifest.json",
    shared: sharedConfig
  }
]
