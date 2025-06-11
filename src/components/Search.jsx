import { Search } from "lucide-react";
import { useState, useEffect} from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import ProductCard from "./ProductCard";
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { useProducts } from '../contexts/ProductContext';

const SearchBar = () => {
    const [products, setProducts] = useState([])
    const { searchTerm, setSearchTerm } = useProducts(); // Get searchTerm and its setter from context

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    return (
        <div className='relative flex  justify-center items-center'>
            <input 
            className="border border-gray-400 md:w-76 w-48 pl-2 h-9 rounded-xl  focus:outline-none focus:border-gray-600 text-xs md:text-sm" 
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='What are you looking for'
            />
            <Search className="absolute md:ml-68 ml-40 top-4 transform -translate-y-1/2 w-4" />
        </div>
    );
}

export default SearchBar;
