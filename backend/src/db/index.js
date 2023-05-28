const { returnUserInfoFromDbWithUserIdPromise } = require("./user-db")

const getUserFromCacheOrDb = async (userid) => {
    try {
        const res = await returnUserInfoFromDbWithUserIdPromise(userid)
        if (res.length == 0) {
            throw("cannot find user in db")
        }
        return res[0]
    }catch (err) {
        throw("err getUserFromCacheOrDb", err)
    }
}

module.exports = {getUserFromCacheOrDb}