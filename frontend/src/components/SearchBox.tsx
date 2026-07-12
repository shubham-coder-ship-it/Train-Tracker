import { useState } from "react";
import { trains } from "../data/trains";


type SearchBoxProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBox({ query, setQuery }: SearchBoxProps) {
  
  const [isOpen, setIsOpen] = useState(false);

  const filteredTrains = trains.filter((train) =>
  `${train.number} ${train.name}`
    .toLowerCase()
    .includes(query.toLowerCase())
);


  return (
    <div className="mt-10 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}  
        placeholder="Search Train Number or Name"
        className="w-full rounded-2xl border-2 border-gray-200 p-4 text-lg outline-none focus:border-blue-600"
      />

   {query && isOpen && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl border bg-white shadow-lg z-20">
          {filteredTrains.length > 0 ? (
            filteredTrains.map((train) => (
              <div
                key={train.number}
                className="cursor-pointer px-4 py-3 hover:bg-blue-50"
                onMouseDown={() => {
  console.log("Clicked:", train.number);

  setQuery(`${train.number} ${train.name}`);

  setIsOpen(false);
}}
              >
                🚆 {train.number}-{train.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">
              No train found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;