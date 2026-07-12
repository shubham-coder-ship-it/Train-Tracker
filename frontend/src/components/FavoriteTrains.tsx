import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  favorites: any[];
};

function FavoriteTrains({ favorites }: Props) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFavorites, setSelectedFavorites] =
    useState<any[]>([]);

  const allSelected =
    favorites.length > 0 &&
    selectedFavorites.length === favorites.length;

  return (
    <div className="mt-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-2xl font-bold"
        >
          ⭐ Favorite Trains

          <span>
            {isOpen ? "⬆️" : "⬇️"}
          </span>
        </button>

        {isOpen && favorites.length > 0 && (
          <button
            onClick={() => setShowPopup(true)}
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Delete ({selectedFavorites.length})
          </button>
        )}

      </div>

      {/* List */}
      {isOpen && (
        <>

          {favorites.length > 0 && (
            <div className="mb-3 flex items-center gap-2">

              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFavorites([
                      ...favorites,
                    ]);
                  } else {
                    setSelectedFavorites([]);
                  }
                }}
              />

              <span className="font-semibold">
                Select All (
                {selectedFavorites.length}
                )
              </span>

            </div>
          )}

          {favorites.length === 0 ? (
            <p className="text-gray-500">
              No favorite trains
            </p>
          ) : (
            <div className="space-y-3">

             {favorites
  .filter((train) => train)
  .map(
                (train, index) => (
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
                        selectedFavorites.some(
                          (fav) =>
                            fav?.number === train?.number
                        )
                          ? "bg-yellow-100 border-yellow-500"
                          : "hover:bg-yellow-50"
                      }
                    `}
                  >

                    <div
                      onClick={() =>
                        navigate(
                          `/train/${train.number}`
                        )
                      }
                      className="cursor-pointer flex-1"
                    >
                      🚆 {train.number}{" "}
                      {train.name}
                    </div>

                    <input
                      type="checkbox"
                      checked={selectedFavorites.some(
                        (fav) =>
                          fav?.number === train?.number
                      )}
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                      onChange={(e) => {
                        if (
                          e.target.checked
                        ) {
                          setSelectedFavorites(
                            [
                              ...selectedFavorites,
                              train,
                            ]
                          );
                        } else {
                          setSelectedFavorites(
                            selectedFavorites.filter(
                              (fav) =>
                                fav.number !==
                                train.number
                            )
                          );
                        }
                      }}
                    />

                  </div>
                )
              )}

            </div>
          )}

        </>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl">

            <h2 className="text-xl font-bold text-center">
              ⭐ Delete Favorites
            </h2>

            <p className="text-gray-500 text-center mt-3">
              Delete selected favorite trains?
            </p>

            <div className="flex justify-center gap-4 mt-6">

              <button
                onClick={() =>
                  setShowPopup(false)
                }
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  const updated =
                    favorites.filter(
                      (train) =>
                        !selectedFavorites.some(
                          (fav) =>
                            fav?.number === train?.number
                        )
                    );

                  localStorage.setItem(
                    "favoriteTrains",
                    JSON.stringify(updated)
                  );

                  window.location.reload();
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default FavoriteTrains;