var corsOptions = {
    origin:  ['https://www.section.io', 'https://www.google.com/','https://holysheet2831.hopto.org/'],
    credentials:true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    sameSite: "lax"
  }
const devOrigins = ['http://localhost:3000/','http://127.0.0.1:5234/']
if (process.env.NODE_ENV == 'development') {corsOptions.origin.push(...devOrigins)}
module.exports = {corsOptions}