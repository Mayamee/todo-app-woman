import path from 'path'

export const appRoot = path.resolve('app')
export const appDevEnvPath = path.join(appRoot, 'env', 'dev.env')
export const appProdEnvPath = path.join(appRoot, 'env', 'prod.env')
export const appPublicPath = path.join(appRoot, 'public')
