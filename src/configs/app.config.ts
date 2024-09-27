export type AppConfig = {
  appName: string
  locale: string
  baseUrl: string
  authSecret: string
  authJwtAge: number
  backendApiUrl: string
  backendApiKey: string
  persistKey: string
}

const appConfig: AppConfig = {
  appName: '',
  locale: 'en',
  baseUrl: 'https://taspen-loan-dash.vercel.app',
  authSecret: 'IAADLu2Qu+xC4kteZfSUNOi5s/M6zSi7Z6tP85h4GBY=',
  authJwtAge: 1209600,
  backendApiUrl: 'https://overall-ros-statisticsindonesia-d818bd85.koyeb.app/',
  backendApiKey: 'Yo5x0ZoGgqLOAZTJgDbIirbuNe2QBhnqVHnIOQT3JtxwMWDlJU1qDbmskAcpNMpg',
  persistKey: 'root'
}

export default appConfig
