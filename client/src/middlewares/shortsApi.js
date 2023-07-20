import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseApiUrl } from '../configs';



export const shortsApiRedux = createApi({
    reducerPath: 'shortsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl
    }),
    keepUnusedDataFor: 180,
    endpoints: (builder) => ({
        getChannelShorts: builder.query({
            query: (channelId) => {
                console.log("getChannelShorts endpoints RTK", channelId)
                // if (!channelId || !cursorNext) { return null }
                return  `youtube/channel/shorts?channelid=${channelId}`
            },
            transformResponse: (response, meta, arg) => {console.log("transformResponse", response) ;return response},
            // transformErrorResponse: (response, meta, arg) => response.status,
            // providesTags: (result, error, id) => [{ type: 'Post', id }]
        }),
        getSuggestedShorts: builder.query({
            query: (shortlId) => {
                // console.log("getSuggestedShorts endpoints RTK", shortlId)
                // if (!channelId || !cursorNext) { return null }
                return  `youtube/shorts/suggested?shortid=${shortlId}`
            },
            transformResponse: (response, meta, arg) => {console.log("transformResponse", response) ;return response},
            // transformErrorResponse: (response, meta, arg) => response.status,
            // providesTags: (result, error, id) => [{ type: 'Post', id }]
        }),
        getPopularShorts: builder.query({
            query: () => {
                console.log("getPopularShorts endpoints RTK")
                return `youtube/shorts/popular` //result is {data:[short]}
            }
        })
        
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetShortsQuery, useLazyGetShortsQuery } = shortsApiRedux