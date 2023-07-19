const { fetchPopularShorts } = require("./shorts-api")


const main = async () => {
    const res = await fetchPopularShorts()
    console.log("res is", res?.data?.length , res.data.slice(0,4))
}

main()