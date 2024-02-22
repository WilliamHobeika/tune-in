import SongBar from "./SongBar";

const RelatedSongs = ({ data, isPlaying, activeSong, artistId }) => {
  const relatedTracks = data.data;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Artist Top Songs:</h1>

      <div className="mt-6 w-full flex flex-col">
        {relatedTracks?.map((song, i) => (
          <SongBar
            key={song.id}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
