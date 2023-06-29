const isDocker = import.meta.env.VITE_ENV_DOCKER 
const isDev = import.meta.env.VITE_NODE_ENV == 'development'
console.log('import.meta.env.VITE_NODE_ENV == development',import.meta.env.VITE_NODE_ENV == 'development',isDev)
const baseApiUrl = isDocker ? 'http://localhost:4444' : 'https://holysheet2831.hopto.org/api'
console.log("app baseApiUrl is", baseApiUrl)

export default baseApiUrl