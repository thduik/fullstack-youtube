var corsOptions = {
    origin:  ['https://www.section.io', 'https://www.google.com/','http://localhost:5234/','http://127.0.0.1:5234/'],
    credentials:true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    sameSite: "lax"
  }

module.exports = {corsOptions}