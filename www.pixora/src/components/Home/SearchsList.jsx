import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { EmptyContent } from '../Pages/EmptyContent'
import { Search } from 'lucide-react'

export const SearchsList = ({ term, onSelect }) => {
    const fetchList = async () => {
        try {
            const res = await axios.get(`https://api.pixora.test/get_search_suggestions`, { params: { term: term } }, { withCredentials: true });
            return res.data;
        } catch (err) {

        }
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ['suggestions', term],
        queryFn: fetchList,
        enabled: term.length > 2,
        staleTime: 1000 * 60 * 5,
    });
    const suggestions = data?.suggestions || [];
    return (
        <ul className='suggestionsList'>
            {
                suggestions?.length > 0 ? suggestions.map((s, index) => (
                    <li className='suggestionItem' key={index} onClick={() => onSelect(s.term)}>{s.term}</li>
                )) : (
                    <EmptyContent icon={<Search className='faIcon' />} text={'No terms found like this !'} />
                )
            }
        </ul>
    )
}
