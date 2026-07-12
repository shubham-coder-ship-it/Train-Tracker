import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  searches: string[];
};

function RecentSearches({ searches }: Props) {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTrains, setSelectedTrains] = useState<string[]>([]);
  const allSelected = searches.length > 0 && selectedTrains.length === searches.length;

  return (
    <div className="mt-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-2xl font-bold"
        >
          Recent Searches

          <span className="text-lg">
            {isOpen ? "⬆️" : "⬇️"}
          </span>
        </button>

        {isOpen && searches.length > 0 && (
          <button
            onClick={() => setShowPopup(true)}
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Delete ({selectedTrains.length})
          </button>
        )}

      </div>

      {/* Search List */}
      {isOpen && (
        <>
        {searches.length > 0 && (

  <div className="mb-3 flex items-center gap-2">

    <input
      type="checkbox"
      checked={allSelected}
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedTrains([...searches]);
        } else {
          setSelectedTrains([]);
        }
      }}
    />

    <span className="font-semibold">
     Select All ({selectedTrains.length})
    </span>

  </div>

)}
          {searches.length === 0 ? (
            <p className="text-gray-500">
              No recent searches
            </p>
          ) : (
            <div className="space-y-3">

              {searches.map((train, index) => (
                <div
                  key={index}
                  onClick={() => {
                    const trainNumber =
                      train.split(" ")[0];

                    navigate(
                      `/train/${trainNumber}`
                    );
                  }}
                  className="
                    rounded-xl
                    border
                    p-3
                    cursor-pointer
                    hover:bg-blue-50
                    transition
                  "
                >
                  <div
  key={index}
  className={`
  rounded-xl
  border
  p-3
  flex
  justify-between
  items-center
  transition

  ${
    selectedTrains.includes(train)
      ? "bg-blue-100 border-blue-500"
      : "hover:bg-blue-50"
  }
`}
>

  <div
    onClick={() => {
      const trainNumber =
        train.split(" ")[0];

      navigate(`/train/${trainNumber}`);
    }}
    className="cursor-pointer flex-1"
  >
    🚆 {train}
  </div>

  <input
  type="checkbox"
  checked={selectedTrains.includes(train)}
  onClick={(e) => e.stopPropagation()}
  onChange={(e) => {
    if (e.target.checked) {
      setSelectedTrains([
        ...selectedTrains,
        train,
      ]);
    } else {
      setSelectedTrains(
        selectedTrains.filter(
          (t) => t !== train
        )
      );
    }
  }}
/>

</div>
                </div>
              ))}

            </div>
          )}
        </>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl">

            <h2 className="text-xl font-bold text-center">
              🗑️ Clear Search History
            </h2>

            <p className="text-gray-500 text-center mt-3">
             Delete selected searches?
            </p>

            <div className="flex justify-center gap-4 mt-6">

              <button
                onClick={() =>
                  setShowPopup(false)
                }
                className="
                  px-4 py-2
                  rounded-lg
                  bg-gray-200
                  hover:bg-gray-300
                "
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  const updated =
  searches.filter(
    (train) =>
      !selectedTrains.includes(train)
  );

localStorage.setItem(
  "recentTrains",
  JSON.stringify(updated)
);

window.location.reload();
                }}
                className="
                  px-4 py-2
                  rounded-lg
                  bg-red-500
                  text-white
                  hover:bg-red-600
                "
              >
                Clear History
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default RecentSearches;