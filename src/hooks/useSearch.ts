import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useSearchParams = () => {
  const location = useLocation();
  
  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  };

  const getSearchCategory = () => {
    const params = new URLSearchParams(location.search);
    return params.get('category') || 'all';
  };

  return {
    searchQuery: getSearchQuery(),
    searchCategory: getSearchCategory(),
    hasSearchParams: location.search.includes('search=')
  };
};

export const useSearchEffect = (onSearch: (query: string, category: string) => void) => {
  const { searchQuery, searchCategory, hasSearchParams } = useSearchParams();

  useEffect(() => {
    if (hasSearchParams && searchQuery) {
      onSearch(searchQuery, searchCategory);
    }
  }, [searchQuery, searchCategory, hasSearchParams, onSearch]);
};
