import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";

import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

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
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
