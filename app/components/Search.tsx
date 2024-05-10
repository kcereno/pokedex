import { useState } from 'react';
import { CgPokemon } from 'react-icons/cg';
import { FaSort } from 'react-icons/fa';
import { capitalizeString } from '~/utils/transformers';

type SearchBarProps = {
  filterPokemon: (query: string) => void;
  sortPokemon: (sortOption: string) => void;
};

const SearchBar = ({ filterPokemon, sortPokemon }: SearchBarProps) => {
  const [value, setValue] = useState('');
  const [sortBy, setSortBy] = useState('number');
  const [showSort, setShowSort] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = capitalizeString(e.target.value);
    setValue(query);
    filterPokemon(query);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const option = e.target.value;
    setSortBy(option);
    sortPokemon(option);
  };

  return (
    <div className=" mx-auto p-4 w-full bg-red-600">
      <div className="flex items-center">
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
            value={value}
          />
        </div>
        <button
          onClick={() => {
            setShowSort((prevVal) => !prevVal);
          }}
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaSort />
        </button>
      </div>
      {showSort ? (
        <div className="mt-4 text-white">
          <div className="font-semibold">Sort By:</div>
          <div className="flex mt-2 gap-6 ml-4">
            <div className="flex items-center">
              <input
                id="number-option"
                type="radio"
                value="number"
                name="default-radio"
                className="w-4 h-4"
                checked={sortBy === 'number'}
                onChange={handleSelect}
              />
              <label
                htmlFor="number-option"
                className="ms-2 text-sm font-medium"
              >
                Number
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="name-option"
                type="radio"
                value="name"
                name="default-radio"
                className="w-4 h-4"
                onChange={handleSelect}
                checked={sortBy === 'name'}
              />
              <label
                htmlFor="name-option"
                className="ms-2 text-sm font-medium"
              >
                Name
              </label>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
