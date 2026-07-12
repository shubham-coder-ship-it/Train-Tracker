
import { trains } from "../data/trains";
import {useNavigate, useParams} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

function TrainDetails() {
  const navigate = useNavigate();
  const { trainNumber } = useParams();

  const train = trains.find((t) => t.number === trainNumber);
  if (!train) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl">
        Train Not Found
      </h1>
    </div>
  );
}
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
  const favorites = JSON.parse(
    localStorage.getItem(
      "favoriteTrains"
    ) || "[]"
  );

 const exists = favorites.some(
  (fav: any) =>
    fav?.number === train?.number
);

  setIsFavorite(exists);
}, [train]);
const handleFavorite = () => {
 const favorites = JSON.parse(
  localStorage.getItem(
    "favoriteTrains"
  ) || "[]"
).filter(Boolean);

  if (isFavorite) {
   const updated =
  favorites.filter(
    (fav: any) =>
      fav?.number !== train?.number
  );

    localStorage.setItem(
      "favoriteTrains",
      JSON.stringify(updated)
    );

    setIsFavorite(false);
  } else {
    if (train) {
  favorites.unshift(train);
}

    localStorage.setItem(
      "favoriteTrains",
      JSON.stringify(favorites)
    );

    setIsFavorite(true);
  }
};
  const currentIndex = train?.route.indexOf(train.currentStation) ?? 0;

const progress =
  train && train.route.length > 1
    ? 10+ (currentIndex / (train.route.length - 1)) * 90
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 flex justify-center items-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl">

        <button
         onClick={() => {
  if (
    window.history.length > 1
  ) {
    navigate(-1);
  } else {
    navigate("/");
  }
}}
          className="mb-6 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold hover:bg-gray-200 transition"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-blue-700">
          🚆 Train Details
        </h1>
        <button
  onClick={handleFavorite}
  className={`mt-5 px-4 py-2 rounded-xl text-white font-semibold transition ${
    isFavorite
      ? "bg-yellow-500"
      : "bg-blue-600"
  }`}
>
  {isFavorite
    ? "⭐ Remove Favorite"
    : "⭐ Add to Favorites"}
</button>
        <div className="mt-8 space-y-6">

          {/* Train Information */}
          <div className="rounded-2xl bg-blue-50 p-5 shadow-sm">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              🚆 Train Information
            </h2>

            <div className="flex justify-between py-2">
              <span className="font-semibold">Train Number</span>
              <span className="font-bold text-blue-600">
                {train?.number}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="font-semibold">Train Name</span>
              <span className="font-bold">
                {train?.name}
              </span>
            </div>
          </div>

          {/* Journey Status */}
          {/* Journey Progress */}

<div className="rounded-2xl bg-indigo-50 p-5 shadow-sm">

  <h2 className="text-xl font-bold text-indigo-700 mb-5">
    🚆 Journey Progress
  </h2>

  <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
    <div
      className="bg-blue-600 h-3 rounded-full transition-all duration-700"
      style={{ width: `${progress}%` }}
    ></div>
  </div>

  <div className="flex justify-between mt-2 text-sm text-gray-600">
    <span>Start</span>
    <span>{progress.toFixed(0)}%</span>
    <span>Destination</span>
  </div>

</div>

{/* Journey Status */}

<div className="rounded-2xl bg-slate-50 p-5 shadow-sm">

  <h2 className="text-xl font-bold text-slate-700 mb-4">
    📍 Journey Status
  </h2>

  <div className="flex justify-between py-2">
    <span>Current Station</span>
    <span>{train?.currentStation}</span>
  </div>

  <div className="flex justify-between py-2">
    <span>Next Station</span>
    <span>{train?.nextStation}</span>
  </div>

  <div className="flex justify-between py-2">
    <span>Speed</span>
    <span className="font-bold">{train?.speed}</span>
  </div>

  <div className="flex justify-between py-2">
    <span>Distance Covered</span>
    <span className="font-bold">{train?.distanceCovered}</span>
  </div>

  <div className="flex justify-between py-2">
    <span>ETA</span>
    <span className="font-bold">{train?.eta}</span>
  </div>

  <div className="flex justify-between py-2">
    <span>Status</span>

    <span
      className={`px-3 py-1 rounded-full text-white font-semibold ${
        train?.status === "On Time"
          ? "bg-green-500"
          : train?.status?.includes("Delayed")
          ? "bg-red-500"
          : "bg-yellow-500"
      }`}
    >
      {train?.status}
    </span>
  </div>

</div>
{/* Route Timeline */}

<div className="rounded-2xl bg-white border p-5 shadow-sm">

  <h2 className="text-xl font-bold text-blue-700 mb-5">
    🚉 Route Timeline
  </h2>

  <div className="space-y-3">

    {train?.route?.map((station, index) => (
      <div
        key={index}
        className="flex items-center gap-4"
      >
        <div className="flex flex-col items-center">

          <div
            className={`w-4 h-4 rounded-full ${
              station === train.currentStation
                ? "bg-green-500"
                : station === train.nextStation
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          />

          {index !== train.route.length - 1 && (
            <div className="w-1 h-8 bg-gray-300"></div>
          )}

        </div>

        <span
          className={`${
            station === train.currentStation
              ? "font-bold text-green-600"
              : station === train.nextStation
              ? "font-bold text-blue-600"
              : "text-gray-700"
          }`}
        >
          {station}
        </span>

      </div>
    ))}

  </div>

</div>
      </div>
    </div>
    </div>
  );
}

export default TrainDetails;