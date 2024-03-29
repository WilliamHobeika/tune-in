import { Error, Loader, ArtistCard } from "../components";

import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
  const {
    data = { properties: {}, tracks: [] },
    isFetching,
    error,
  } = useGetTopChartsQuery();
  const tracks = data.tracks;

  //if the fetch isn't complete yet
  if (isFetching) return <Loader title="Loading Songs..." />;

  //if an error occured
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Artists
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
