import FavoriteTrains from "../components/FavoriteTrains";
import PopularTrains from "../components/PopularTrains";
import RecentSearches from "../components/RecentSearches";
import SearchButton from "../components/SearchButton";
import SearchBox from "../components/SearchBox";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] =
    useState<string[]>([]);
  const [favorites, setFavorites] =
    useState<any[]>([]);
  const [loading, setLoading] =
    useState(false);
  const [loadingText, setLoadingText] =
    useState("Loading...");

  const [activeTab, setActiveTab] =
    useState("train");

  const [pnrNumber, setPnrNumber] =
    useState("");

  const [fromStation, setFromStation] =
    useState("");

  const [toStation, setToStation] =
    useState("");

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          "recentTrains"
        ) || "[]"
      );

    const savedFavorites =
      JSON.parse(
        localStorage.getItem(
          "favoriteTrains"
        ) || "[]"
      );

    setRecentSearches(saved);
    setFavorites(savedFavorites);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      alert(
        "Please select a train"
      );
      return;
    }

    const trainNumber =
      query.split(" ")[0];

    setLoadingText(
      "Searching Train..."
    );

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate(
        `/train/${trainNumber}`
      );
    }, 1200);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">

            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="mt-5 font-semibold">
              {loadingText}
            </p>

          </div>

        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 flex justify-center items-center p-6">

        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">

          <div className="text-center">

            <div className="text-7xl">
              🚆
            </div>

            <h1 className="text-4xl font-bold mt-4">
              Train Tracker
            </h1>

            <p className="text-gray-500 mt-2">
              Track Indian Railways
              in Real Time
            </p>

          </div>

          {/* TABS */}

          <div className="mt-8 flex gap-3">

            <button
              onClick={() =>
                setActiveTab(
                  "train"
                )
              }
              className={`flex-1 h-14 rounded-2xl font-semibold transition ${
                activeTab ===
                "train"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              🚆 Check Train
            </button>

            <button
              onClick={() =>
                setActiveTab(
                  "pnr"
                )
              }
              className={`flex-1 h-14 rounded-2xl font-semibold transition ${
                activeTab ===
                "pnr"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              🎫 PNR Status
            </button>

            <button
              onClick={() =>
                setActiveTab(
                  "route"
                )
              }
              className={`flex-1 h-14 rounded-2xl font-semibold transition ${
                activeTab ===
                "route"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              📍 Find Trains
            </button>

          </div>

          {/* TRAIN */}

          {activeTab ===
            "train" && (
            <div className="mt-6">

              <SearchBox
                query={
                  query
                }
                setQuery={
                  setQuery
                }
              />

              <SearchButton
                onSearch={
                  handleSearch
                }
              />

            </div>
          )}

          {/* PNR */}

          {activeTab ===
            "pnr" && (
            <div className="space-y-5 mt-6">

              <input
                type="text"
                maxLength={10}
                value={
                  pnrNumber
                }
                onChange={(
                  e
                ) =>
                  setPnrNumber(
                    e.target
                      .value
                  )
                }
                placeholder="Enter 10 Digit PNR"
                className="w-full border rounded-2xl p-4"
              />

              <button
                onClick={() => {
                  if (
                    pnrNumber.length !==
                    10
                  ) {
                    alert(
                      "PNR must be 10 digits"
                    );
                    return;
                  }

                  setLoadingText(
                    "Checking PNR..."
                  );

                  setLoading(
                    true
                  );

                  setTimeout(
                    () => {
                      setLoading(
                        false
                      );

                      navigate(
                        `/pnr/${pnrNumber}`
                      );
                    },
                    1200
                  );
                }}
                className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold"
              >
                🎫 Check PNR
              </button>

            </div>
          )}

          {/* ROUTE */}

          {activeTab ===
            "route" && (
            <div className="space-y-5 mt-6">

              <input
                value={
                  fromStation
                }
                onChange={(
                  e
                ) =>
                  setFromStation(
                    e.target
                      .value
                  )
                }
                placeholder="From Station"
                className="w-full border rounded-2xl p-4"
              />

              <input
                value={
                  toStation
                }
                onChange={(
                  e
                ) =>
                  setToStation(
                    e.target
                      .value
                  )
                }
                placeholder="To Station"
                className="w-full border rounded-2xl p-4"
              />

              <button
                onClick={() => {
                  if (
                    !fromStation ||
                    !toStation
                  ) {
                    alert(
                      "Enter both stations"
                    );
                    return;
                  }

                  navigate(
                    `/routes?from=${fromStation}&to=${toStation}`
                  );
                }}
                className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold"
              >
                📍 Find Trains
              </button>

            </div>
          )}

          <div className="mt-8">

            <RecentSearches
              searches={
                recentSearches
              }
            />

            <FavoriteTrains
              favorites={
                favorites
              }
            />

            <PopularTrains />

          </div>

        </div>

      </div>
    </>
  );
}

export default Home;