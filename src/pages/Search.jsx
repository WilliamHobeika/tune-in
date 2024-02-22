import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Error, Loader, SongCard } from "../components";

import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

const Search = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data = { properties: {}, tracks: [] },
    isFetching,
    error,
  } = useGetSongsBySearchQuery(searchTerm);
  const tracks = data?.tracks?.hits?.map((song) => song.track);

  //if the fetch isn't complete yet
  if (isFetching) return <Loader title="Loading Songs..." />;

  //if an error occured
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing Results
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

export default Search;
