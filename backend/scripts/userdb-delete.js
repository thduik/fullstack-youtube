const User = require('../src/models/User')


const deleteUsers = async () => {
    await User.deleteMany({})
    const res = await User.find({})
    // console.log("users after delete are", res)
    process.exit()
}

deleteUsers()