import React, { useState } from 'react'
import GalleriesTemplate from './Templates/GalleriesTemplate'
import { useQuery } from '@tanstack/react-query'
import { api } from '../utils/api';

import { Footer } from './Layouts/Footer'
import { Navbar } from './Layouts/Navbar'
import { BiChevronDown, BiSearchAlt } from 'react-icons/bi'
import { Helmet } from 'react-helmet-async'
import Spinner from './Spinner'
const GalleriesSection = () => {
    const [visible, setVisible] = useState(5);
    const [searchTerme,setSearchTerme] = useState('');
    const fetchGalleries = async () => {
        const res = await api.get('/get_all_galleries', { withCredentials: true, withXSRFToken: true });
        if (!res.data.success) {
            throw new Error(res.data.message || 'Unable to load galleries.');
        }
        return res.data.galleries || [];
    }
    const { data: galleries = [], isLoading, error, refetch } = useQuery({
        queryKey: ['galleries'],
        queryFn: fetchGalleries
    });

    const filtreGalleries = galleries.filter(g => g.title.toLowerCase().includes(searchTerme.toLowerCase()) || (g.description && g.description.toLowerCase().includes(searchTerme.toLowerCase())))

    const showMoreProducts = () => {
        setVisible(prev => prev + 5);
    }

    const handleSearch = (e) => {
        setSearchTerme(e.target.value);
        setVisible(5);
        return;
    }

    return (
        <>
            <Helmet>
                <title>Pixora | Galleries</title>
            </Helmet>
            <Navbar />
            <div
                className="container-fluid tab-pane fade show mt-3 mb-3"
                id="galleries"
            >
                <h1 className="text-center fw-bold">Galleries <span className='text-primary'>({galleries.length ?? 0})</span></h1>
                <div className="search-container mb-5">
                    <div className="search-box">
                        <BiSearchAlt className='search-icon'/>
                        <input
                        type="text"
                        className='search-input'
                        placeholder='Search Galleries ...'
                        value={searchTerme}
                        onChange={handleSearch}
                        />
                        {
                            searchTerme && (
                                <button className='clear-btn' onClick={() => setSearchTerme('')}>
                                    &times;
                                </button>
                            )
                        }
                    </div>
                </div>
                <hr />
                {isLoading ? (
                    <Spinner type="mini" text="Loading galleries..." />
                ) : error ? (
                    <div className="text-center" role="alert">
                        <p>Unable to load galleries. {error.message}</p>
                        <button type="button" className="btn-show-more" onClick={() => refetch()}>
                            Try again
                        </button>
                    </div>
                ) : (
                    <>
                        <GalleriesTemplate galleries={filtreGalleries} visible={visible} showMoreProducts={showMoreProducts} />
                        {
                            visible < filtreGalleries.length && (
                                <div className='show-more-wrapper'>
                                    <button className='btn-show-more' onClick={showMoreProducts}>
                                        Show more <BiChevronDown size={18} />
                                    </button>
                                </div>
                            )
                        }
                    </>
                )}
            </div>
            <Footer type={'footer'} />
        </>
    )
}

export default GalleriesSection