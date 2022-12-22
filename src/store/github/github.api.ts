import {createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react';
import { IRepo, Iuser, ServerResponse } from '../../type/type';

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    endpoints: build => ({
        searchUsers: build.query<Iuser[], string>({
            query: (serach:string) => ({
                url: 'search/users',
                params:{
                q: serach,  
                per_page: 10
                }

            }),
            transformResponse:(response: ServerResponse<Iuser>) => response.items
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (userName: string) =>({
                url: `users/${userName}/repos`
            })
        })
    })
})


export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi;