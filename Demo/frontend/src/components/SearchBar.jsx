function SearchBar({ search, setSearch }) {

  return (

    <div className="mb-4">

      <input
        type="text"
        placeholder="Search by name or id..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded-lg outline-none"
      />

    </div>

  );
}

export default SearchBar;
