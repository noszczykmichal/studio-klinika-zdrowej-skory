import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ddh0mvo4',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {autoUpdates: true, appId: 'zpk0ytzxtwhk4oyyi3ihj5tz'},
  studioHost: 'klinika-zdrowej-skory',
})
