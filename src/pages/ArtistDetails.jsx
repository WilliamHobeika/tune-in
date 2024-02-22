import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import {
  useGetArtistSummaryQuery,
  useGetArtistTopSongsQuery,
} from "../redux/services/shazamCore";
import AlbumCard from "../components/AlbumCard";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error: artistDetailsError,
  } = useGetArtistSummaryQuery(artistId);

  const artistAlbums = artistData?.resources?.albums;

  const {
    data: artistTopSongs,
    isFetching: isFetchingArtistTopSongs,
    error: artistTopSongsError,
  } = useGetArtistTopSongsQuery(artistId);

  //creating proper error and loading handlers
  if (isFetchingArtistDetails || isFetchingArtistTopSongs)
    return <Loader title="Loading Artist Details" />;

  if (artistDetailsError || artistTopSongsError) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={artistTopSongs}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
      />

      <h1 className="font-bold text-3xl text-white mt-10">Albums:</h1>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 mt-5">
        {artistAlbums &&
          Object?.keys(artistAlbums).map((key) => (
            <AlbumCard key={key} album={artistAlbums[key]} />
          ))}
      </div>
    </div>
  );
};

export default ArtistDetails;
