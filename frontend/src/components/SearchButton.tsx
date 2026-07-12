type SearchButtonProps = {
  onSearch: () => void;
};

function SearchButton({ onSearch }: SearchButtonProps) {
  return (
    <button
      onClick={onSearch}
      className="w-full mt-5 rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition"
    >
      🔍 Search Train
    </button>
  );
}

export default SearchButton;