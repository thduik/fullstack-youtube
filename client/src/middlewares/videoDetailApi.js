import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseApiUrl } from '../configs';

export const videoDetailApi = createApi({
    reducerPath: 'youtubeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl + 'rapid/api'
    }),
    keepUnusedDataFor: 180,
    endpoints: (builder) => ({
        getVideoDetail: builder.query({
            query: (videoId) => {
                console.log("getShorts endpoints RTK", channelId)
                // if (!channelId || !cursorNext) { return null }
                return  `/videoDetail?videoId=${channelId}`
            },
            transformResponse: (response, meta, arg) => {console.log("transformResponse getVideoDetail", response) ;return response},
            // transformErrorResponse: (response, meta, arg) => response.status,
            // providesTags: (result, error, id) => [{ type: 'Post', id }]
        }),
        
    }),
})

export const { useGetVideoDetailQuery, useLazyGetVideoDetailQuery } = shortsApiRedux

// export const {useQuery} = videoDetailApi.endpoints.getVideoDetail