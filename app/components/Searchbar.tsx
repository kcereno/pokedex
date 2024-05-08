'@remix-run/react';

import { CgPokemon } from 'react-icons/cg';

type SearchBarProps = {
  filterPokemon: (query: string) => void;
};

const Searchbar = ({ filterPokemon }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    filterPokemon(query);
  };

  return (
    <form className="flex items-center mx-auto p-4 pb-0">
      <label
        htmlFor="simple-search"
        className="sr-only"
      >
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <CgPokemon />
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
          placeholder="Search Pokemon name or number"
          required
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Searchbar;
