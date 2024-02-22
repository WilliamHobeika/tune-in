import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", "59d6ca2cc7msh168511317ee472fp104423jsnf35d9d130907");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/track" }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/songs/get-details?key=${songid}`,
    }),
    getArtistTopSongs: builder.query({
      query: (artistId) => `/artists/get-top-songs?id=${artistId}`,
    }),
    getArtistSummary: builder.query({
      query: (artistId) => `/artists/get-summary?id=${artistId}`,
    }),
    getAlbumDetails: builder.query({
      query: (albumid) => `albums/get-details?id=${albumid}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search?term=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetArtistTopSongsQuery,
  useGetArtistSummaryQuery,
  useGetAlbumDetailsQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
