import dotenv from 'dotenv'
import { appDevEnvPath, appProdEnvPath } from '../utils/paths'

const mode = process.env.MODE || 'production'

export default () =>
  dotenv.config({
    path: mode === 'development' ? appDevEnvPath : appProdEnvPath,
  })
