import axios from 'axios';
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Spinner from './Spinner';
import { EmptyContent } from './EmptyContent';
import { FaPhotoFilm } from 'react-icons/fa6';
import PhotosTemplate from './Templates/PhotosTemplate'
export const PhotosLikeOriginal = ({ photos, isLoading, error }) => {

    if (error) return (<EmptyContent icon={<FaPhotoFilm className='faIcon' />} text={'Somthing is wrong at fetching photos - try again later'} />);
    if (photos.length === 0) return (<></>);
    return (
        <>
            {
                isLoading ? (<Spinner text='Wait a few seconds for load the photos like this ...' />) : (
                    <>
                        <hr />
                        <div className="section-header">
                            <h4>More like this</h4>
                        </div>
                        <PhotosTemplate photos={photos} />
                    </>
                )
            }
        </>
    )
}
