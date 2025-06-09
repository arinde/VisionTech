import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className='relative flex  justify-center items-center'>
            <input 
            className="border border-gray-400 w-76 pl-5 h-9 rounded-xl  focus:outline-none focus:border-gray-600 text-sm" 
            type="text"
            placeholder='What are you looking for'
            />
            <Search className="absolute ml-60 top-4 transform -translate-y-1/2 w-4" />
        </div>
    );
}

export default SearchBar;
