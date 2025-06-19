import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GetAllStoriesResponse } from './travelTypes';

export const travelApi = createApi({
    reducerPath: 'travelApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAllStories: builder.query<GetAllStoriesResponse, void>({
            query: () => '/travel/get-all-stories',
        }),
        editIsFavourite: builder.mutation<unknown, { id: string; data: { isFavourite: boolean } }>({
            query: ({ id, data }) => ({
                url: `/travel/edit-travel-story/${id}`,
                method: 'PUT',
                body: data,
            })
        })
    })
});

export const { useGetAllStoriesQuery,useEditIsFavouriteMutation } = travelApi;