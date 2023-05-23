//map JWT sub claim to userID. example 
// subToUserIdMap.set("sub1234567qwe", "user1234652")
const subToUserIdMap = Map()

//map accessToken to userID. example 
// subToUserIdMap.set("sub1234567qwe", "accessToken1234")
const subToAccessTokenMap = Map()

const checkAccessTokenAndSub = (accessToken, subClaim) => {
    const resAccToken = subToAccessTokenMap.get(subClaim)
    return resAccToken == accessToken
}

