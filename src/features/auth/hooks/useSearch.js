import { useState } from "react";
import convocatoriaService from '../../../api/convocatoriaService'; 

const useSearch = (userId) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSearch = async () => {
        setIsLoading(true);
        setMessage('');
        try {
            const results = await convocatoriaService.search(searchTerm, userId);
            if (results.length > 0) {
                setSearchResults(results);
                setMessage('');
            } else {
                setSearchResults([]);
                setMessage('No se encontraron convocatorias.');
            }
        } catch (error) {
            setMessage('Ocurrió un error al buscar.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        searchTerm,
        setSearchTerm,
        searchResults,
        isLoading,
        message,
        handleSearch
    };
};

export default useSearch;