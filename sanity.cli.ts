import {defineCliConfig} from 'sanity/cli'
import path from 'path'

export default defineCliConfig({
  api: {
    projectId: 'ddh0mvo4',
    dataset: 'production',
  },
  vite: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          // Maps '@' to the root directory of your Sanity project
          '@': path.resolve(__dirname, './'),
        },
      },
    }
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {autoUpdates: true, appId: 'zpk0ytzxtwhk4oyyi3ihj5tz'},
  studioHost: 'klinika-zdrowej-skory',
})
