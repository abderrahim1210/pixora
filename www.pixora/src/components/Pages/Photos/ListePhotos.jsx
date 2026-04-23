import React from 'react'
import PhotosTemplate from '../PhotosTemplate'
import PageSkeleton from '../PageSkeleton'
import { EmptyContent } from '../EmptyContent'
import { FaCamera } from 'react-icons/fa'

const ListePhotos = ({photos, loading}) => {
    return (
        <div className="tab-pane fade show active" id="photos">
            <div className="mt-2 mb-2">
                <h2>
                    My photos{" "}
                    <p className="d-inline text-primary">
                        ( {photos?.length} photos)
                    </p>
                </h2>
            </div>
            <div>
                {!loading ? Array(6).fill().map((_, i) => <PageSkeleton key={i} page={'photos'} />) : photos.length > 0 ? (
                    <PhotosTemplate photos={photos} />
                ) : (
                    <EmptyContent icon={<FaCamera className="faIcon" />} text={"No photos yet — start sharing your moments!"} />
                )}
            </div>
        </div>
    )
}

export default ListePhotos