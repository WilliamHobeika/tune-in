import { useDispatch, useSelector } from "react-redux";

//importing components
import { Error, Loader, SongCard } from "../components";

//importing genres constants
import { genres } from "../assets/constants";

//importing redux hook
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

  const {
    data = { properties: {}, tracks: [] },
    isFetching,
    error,
  } = useGetTopChartsQuery();
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
  const tracks = data.tracks;

  //if the fetch isn't complete yet
  if (isFetching) return <Loader title="Loading Songs..." />;

  //if an error occured
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
        <select
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
