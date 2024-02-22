import React from "react";
import { useParams } from "react-router-dom";
import { useGetAlbumDetailsQuery } from "../redux/services/shazamCore";
import { DetailsHeader, Error, Loader } from "../components";

const AlbumTracks = ({ song, i }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3 w-[20px]">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        src={song?.attributes?.artwork?.url.replace("{w}", "500").replace("{h}", "500")}
        alt={song?.attributes?.name}
        className="w-20 h-20 rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <p className="text-xl font-bold text-white">{song?.attributes?.name}</p>
        <p className="text-base font-bold text-gray-400">
          {new Date(song?.attributes?.durationInMillis).toISOString().substring(14, 19)}
        </p>
      </div>
    </div>
  </div>
);

const AlbumDetails = () => {
  const { albumid } = useParams();

  const {
    data: albumData,
    isFetching: isFetchingAlbumDetails,
    error: error,
  } = useGetAlbumDetailsQuery(albumid);
  const albumTracks = albumData?.data[0]?.relationships.tracks.data;

  //if the fetch isn't complete yet
  if (isFetchingAlbumDetails) return <Loader title="Loading Album Details..." />;

  //if an error occured
  if (error) return <Error />;

  return (
    <div className="felx flex-col">
      <DetailsHeader albumid={albumid} album={albumData} />

      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Tracks:</h2>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {albumTracks?.map((song, i) => (
            <AlbumTracks key={song?.id} i={i} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
