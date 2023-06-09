const PlaylistVideoInfo = require("../models/PlaylistVideoInfo")
const connectDB = require("./connect-db")

const lengthenString = (s, n) => {var res="";for(var i = 0;i < n;i++){res+=n};return res}
const main = async () => {
    try {
        await connectDB()

        await PlaylistVideoInfo.create({

            playlistId: lengthenString("ssdfsdfsfsdfsfsfsd",200),
            videoId: "sfsfsdfsdfsfsfds",
            videoName: "s",
            thumbnailUrl: "s",
            createdAt: 2
        })

        const date0 = Date.now()


        for (var i = 0; i < 30000; i++) {
            await PlaylistVideoInfo.findOne({playlistId:"s"}).lean()
        }
        //10k times 5900ms

        console.log("took ", Date.now()-date0, "ms")


    } catch (err) {

    }
}


main()