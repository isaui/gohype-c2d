"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type SearchSectionProps = {
    ticketPath: string;
    searchText: string;
    ticketName: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({ ticketPath, searchText, ticketName }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchText);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setSearch(searchText);
    }, [searchText]);

    const handleSearch = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        
        if (search) {
            current.set('search', search);
            current.delete('page');
        } else {
            current.delete('search');
        }
        
        const searchString = current.toString();
        const query = searchString ? `?${searchString}` : '';
        router.replace(window.location.pathname + query);
    };

    useEffect(() => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(() => {
            handleSearch();
        }, 1000);

        setDebounceTimeout(timeout);

        return () => {
            clearTimeout(timeout);
        };
    }, [search]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className="flex flex-col md:flex-row w-full mx-auto max-w-7xl items-start px-4 mt-8 mb-4 md:items-center">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">{ticketName}</h1>
            <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md md:ml-auto">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={handleChange}
                        placeholder="Search..."
                        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-primary text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchSection;
