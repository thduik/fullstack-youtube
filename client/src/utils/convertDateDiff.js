const convertDateDiff = (dateIso) => { //dateIso = publishedAt, 
        //find difference between Date.now and published at, 
        //published less than 24 hours ago, show hours ago. less than 7 days, show days ago. less than 30 days, show weeks ago. less than 365 days. show months ago.

        const timeDiffSec = (Date.now() - Date.parse(dateIso)) / 1000
        if (timeDiffSec < 60) { return "Just now" }
        if (timeDiffSec < 3600) { return `${Math.round(timeDiffSec / 60 * 100)/100} minutes ago` }
        const timeDiffHours = timeDiffSec / 3600
        if (timeDiffHours < 24) { return `${Math.round(timeDiffHours * 100)/100} hours ago` }
        const timeDiffDays = timeDiffHours / 24
        if (timeDiffDays < 7) { return `${Math.round(timeDiffDays * 100) / 100} days ago` }
        if (timeDiffDays < 30) { return `${Math.floor(timeDiffDays / 7)} weeks ago` }
        if (timeDiffDays < 365) { return `${Math.floor(timeDiffDays / 30)} months ago` }
        return `${Math.floor(timeDiffDays / 365)} years ago`
    }

export default convertDateDiff;