import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { getTrainsBetweenStations,
} from "../services/trainApi";

function RouteResults() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const from =
    searchParams.get("from");

  const to =
    searchParams.get("to");

  const [trains, setTrains] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadTrains =
      async () => {
        try {
          const data =
            await getTrainsBetweenStations(
              from!,
              to!
            );

          console.log(
            "TRAIN API = ",
            data
          );

          setTrains(
            data.data || []
          );
        } catch (err: any) {
  console.log(err);

  if (err.response) {
    console.log(
      "STATUS:",
      err.response.status
    );

    console.log(
      "DATA:",
      err.response.data
    );
  }
} finally {
          setLoading(false);
        }
      };

    if (from && to) {
      loadTrains();
    }
  }, [from, to]);

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          justify-center
          items-center
          text-3xl
        "
      >
        Loading Trains...
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-600
        via-indigo-700
        to-slate-900
        p-6
      "
    >
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() =>
            navigate(-1)
          }
          className="
            bg-white
            px-4
            py-2
            rounded-lg
            mb-6
          "
        >
          ← Back
        </button>

        <h1
          className="
            text-4xl
            text-white
            font-bold
            mb-4
          "
        >
          🚆 Available Trains
        </h1>

        <h2
          className="
            text-white
            text-xl
            mb-8
          "
        >
          📍 {from} → {to}
        </h2>

        <div
          className="
            bg-white
            rounded-3xl
            p-5
            mb-6
          "
        >
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Journey Summary
          </h2>

          <p className="mt-4">
            🚉 From: {from}
          </p>

          <p>
            🏁 To: {to}
          </p>

          <p>
            🚆 Available Trains:
            {" "}
            {trains.length}
          </p>
        </div>

        {trains.length === 0 ? (
          <div
            className="
              bg-white
              rounded-3xl
              p-8
              text-center
            "
          >
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              No Trains Found
            </h2>
          </div>
        ) : (
          <div className="space-y-6">

            {trains.map(
              (
                train: any,
                index: number
              ) => (
                <div
                  key={index}
                  className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-xl
                  "
                >
                  <pre
                    className="
                      bg-black
                      text-white
                      p-4
                      rounded-xl
                      overflow-auto
                      text-xs
                    "
                  >
                    {JSON.stringify(
                      train,
                      null,
                      2
                    )}
                  </pre>

                  <button
                    onClick={() =>
                      navigate(
                        `/train/${
                          train.train_number ||
                          train.trainNo ||
                          train.number
                        }`
                      )
                    }
                    className="
                      mt-5
                      bg-blue-600
                      text-white
                      px-5
                      py-2
                      rounded-xl
                    "
                  >
                    View Details →
                  </button>
                </div>
              )
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default RouteResults;