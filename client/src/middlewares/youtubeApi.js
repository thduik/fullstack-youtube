import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseApiUrl } from '../configs';



export const youtubeApi = createApi({
    reducerPath: 'youtubeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl + '/youtube'
    }),
    keepUnusedDataFor: 180,
    endpoints: (builder) => ({
        getChannelDetail: builder.query({
            query: (channelId) => {
                console.log("getChannelDetail endpoints RTK", channelId)
                return  `channel/details?channelid=${channelId}`
            },
            transformResponse: (response, meta, arg) => {console.log("transformResponse", response) ;return response},
            // transformErrorResponse: (response, meta, arg) => response.status,
            // providesTags: (result, error, id) => [{ type: 'Post', id }]
        }),
        
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetChannelDetailQuery, useLazyGetChannelDetailQuery } = youtubeApi