import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseApiUrl } from '../configs';



export const autoSuggestApi = createApi({
    reducerPath: 'autoSuggestApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://suggestqueries.google.com/complete/search?'
        baseUrl: baseApiUrl
    }),
    keepUnusedDataFor: 180000,
    endpoints: (builder) => ({
        getAutoSuggestions: builder.query({
            query: (string) => {
                console.log("getAutoSuggestions endpoints RTK", string)
                // if (!channelId || !cursorNext) { return null }
                return  `auto/complete?q=${string}&reg=VN`
            },
            transformResponse: (response, meta, arg) => {console.log("transformResponse getAutoSuggestions", response) ;return response},
            // transformErrorResponse: (response, meta, arg) => response.status,
            // providesTags: (result, error, id) => [{ type: 'Post', id }]
        }),
       
        
    }),
})