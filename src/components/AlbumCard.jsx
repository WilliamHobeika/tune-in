import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ album }) => {
  const albumAttributes = album?.attributes;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div className="relative w-full h-56 group">
          <img
            src={albumAttributes?.artwork?.url
              .replace("{w}", "500")
              .replace("{h}", "500")}
            alt="album_img"
          />
        </div>

        <div className="mt-4 flex flex-col">
          <p className="font-semibold text-lg text-white truncate">
            <Link to={`/albums/${album.id}`}>{albumAttributes?.name}</Link>
          </p>
          <p className="text-sm truncate text-gray-400 mt-1">
            Tracks: {albumAttributes?.trackCount}
          </p>
          <p className="text-sm truncate text-gray-400 mt-1">
            Released in: {albumAttributes?.releaseDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
