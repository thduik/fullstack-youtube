const isDocker = import.meta.env.VITE_ENV_DOCKER 
const baseApiUrl = isDocker ? 'http://localhost:4444/api' : 'https://holysheet2831.hopto.org/api'
console.log("app baseApiUrl is", baseApiUrl)

export default baseApiUrl