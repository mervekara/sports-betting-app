type Props = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

const SearchBar = ({ value, onChange, onClear }: Props) => (
  <div className="relative w-full max-w-l mb-6">
    <input
      type="text"
      placeholder="Search teams..."
      className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <button
        onClick={onClear}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 focus:outline-none"
        aria-label="Clear search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    )}
  </div>
);

export default SearchBar;
