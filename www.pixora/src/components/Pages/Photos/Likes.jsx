import React from 'react'
import PhotosTemplate from '../PhotosTemplate'
import { EmptyContent } from '../EmptyContent'
import { FaHeart } from 'react-icons/fa'
import PageSkeleton from '../PageSkeleton'

const Likes = ({ photosLikes, loading }) => {
    return (
        <div className="tab-pane fade show" id="likes">
            <div className="mt-2 mb-2">
                <h2>
                    Likes{" "}
                    <p className="d-inline text-primary">
                        ( {photosLikes?.length ?? 0} Photos)
                    </p>
                </h2>
            </div>
            <div className="container-fluid">
                <div>
                    {!loading ? Array(6).fill().map((_, i) => <PageSkeleton key={i} page={'photos'} />) : photosLikes.length > 0 ? (
                        <PhotosTemplate photos={photosLikes} />
                    ) : (
                        <EmptyContent icon={<FaHeart className="faIcon" />} text={"No photos liked yet - try again later"} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Likes