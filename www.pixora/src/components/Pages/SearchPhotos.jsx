import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Footer } from './Layouts/Footer';
import PhotosTemplate from './PhotosTemplate';
import { Navbar } from './Layouts/Navbar';
import { BiSearchAlt } from 'react-icons/bi';
import Spinner from './Spinner';
import { EmptyContent } from './EmptyContent';
import { FaPhotoFilm } from 'react-icons/fa6';

const SearchPhotos = () => {
    const [searchParams] = useSearchParams();
    const searchTerme = searchParams.get('searchTerme') || '';
    const [search, setSearch] = useState('');
    const [visible,setVisible] = useState(16);
    const fetchPhotos = async ({ queryKey }) => {
        const [_, term] = queryKey;
        if (!term) return [];
        try {
            const res = await axios.get(`https://api.pixora.test/search`, { params: { terme: term } }, { withCredentials: true });
            if (res.data.success) {
                return res.data.result;
            }
        } catch (err) {
            console.log(err?.response?.data);
        }
    }
    const { data: photos = [], isLoading, error } = useQuery({
        queryKey: ['photos', searchTerme],
        queryFn: fetchPhotos,
        enabled: !!searchTerme
    });

    const filtredPhotos = photos.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setVisible(5);
        return;
    }
    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className='mt-3'>
                    <h1 className="fw-bold text-center">All photos <span className='text-primary'>({photos?.length ?? 0} photo)</span></h1>
                    <div className="search-container mb-5">
                        <div className="search-box">
                            <BiSearchAlt className='search-icon' />
                            <input
                                type="text"
                                className='search-input'
                                placeholder='Search photos ...'
                                value={search}
                                onChange={handleSearch}
                            />
                            {
                                search && (
                                    <button className='clear-btn' onClick={() => setSearch('')}>
                                        &times;
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <hr />
                </div>
                {
                    !isLoading ? filtredPhotos?.length > 0 ? ((<PhotosTemplate photos={filtredPhotos} />) ) : (<EmptyContent icon={<FaPhotoFilm className="faIcon" />} text={"No photos found for this term !"} />) : (<Spinner type={'mini'} />)
                }
            </div>
            <Footer type={'footer'} />
        </>
    )
}

export default SearchPhotos