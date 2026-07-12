import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getPnrStatus,
} from "../services/railwayApi";

function PnrDetails() {
  const navigate =
    useNavigate();

  const { pnrNumber } =
    useParams();

  const [loading,
    setLoading] =
    useState(true);

 const [passenger,
  setPassenger] =
  useState<Record<string , any > | null>(null);
  useEffect(() => {
    const loadPnr =
      async () => {
        try {

          if (!pnrNumber)
            return;

          const data =
            await getPnrStatus(
              pnrNumber
            );

          console.log(
            "PNR DATA:",
            data
          );

          if (
            !data.success
          ) {
            setPassenger({
              error:
                data.message,
            });

            return;
          }

          setPassenger(
            data.data
          );

        } catch (error) {
          console.log(
            error
          );

          setPassenger({
            error:
              "Unable to fetch PNR",
          });
        } finally {
          setLoading(
            false
          );
        }
      };

    loadPnr();

  }, [pnrNumber]);

  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        justify-center
        items-center
      "
      >
        <h1
          className="
          text-3xl
        "
        >
          Loading PNR...
        </h1>
      </div>
    );
  }

  if (
    passenger?.error
  ) {
    return (
      <div
        className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-slate-100
      "
      >
        <div
          className="
          bg-white
          p-8
          rounded-3xl
          shadow-xl
          text-center
        "
        >
          <h1
            className="
            text-3xl
            mb-4
          "
          >
            ❌ PNR Not Available
          </h1>

          <p
            className="
            text-gray-600
          "
          >
            {
              passenger.error
            }
          </p>

          <button
            onClick={() =>
              navigate("/")
            }
            className="
              mt-6
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!passenger) {
    return (
      <div
        className="
        min-h-screen
        flex
        justify-center
        items-center
      "
      >
        <h1
          className="
          text-3xl
        "
        >
          No PNR Data Found
        </h1>
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
      flex
      justify-center
      items-center
      p-6
    "
    >
      <div
        className="
        bg-white
        rounded-3xl
        shadow-2xl
        p-10
        w-full
        max-w-2xl
      "
      >
        <button
          onClick={() =>
            navigate(-1)
          }
          className="
            mb-6
            rounded-lg
            bg-gray-100
            px-4
            py-2
            font-semibold
          "
        >
          ← Back
        </button>

        <h1
          className="
          text-4xl
          font-bold
          text-blue-700
          mb-8
        "
        >
          🎫 PNR Details
        </h1>

        <div
          className="
          rounded-2xl
          bg-blue-50
          p-6
          shadow-sm
          space-y-4
        "
        >
          <div className="flex justify-between">
            <span className="font-semibold">
              PNR Number
            </span>

            <span className="font-bold underline">
              {pnrNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Train Number
            </span>

            <span className="text-red-600 font-bold">
              {
                passenger?.trainNumber
              }
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Train Name
            </span>

            <span>
              {
                passenger?.trainName
              }
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Booking Status
            </span>

            <span>
              {
                passenger
                  ?.passengerList?.[0]
                  ?.bookingStatus
              }
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Current Status
            </span>

            <span className="text-green-600 font-bold">
              {
                passenger
                  ?.passengerList?.[0]
                  ?.currentStatus
              }
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Coach
            </span>

            <span>
              {
                passenger
                  ?.passengerList?.[0]
                  ?.coachPosition
              }
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Departure Date
            </span>

            <span>
              {
                passenger
                  ?.departureDate
              }
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Chart Prepared
            </span>

            <span>
              {
                passenger
                  ?.chartPrepared
                  ? "✅ Yes"
                  : "❌ No"
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PnrDetails;
