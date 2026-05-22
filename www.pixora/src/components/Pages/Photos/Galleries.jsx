import React from 'react'
import GalleriesTemplate from '../Templates/GalleriesTemplate'
import { FaPlus } from 'react-icons/fa'

const Galleries = ({galleries, openModal}) => {
    return (
        <div className="tab-pane fade show" id="galleries">
            <div className="mt-2 mb-2">
                <h2>
                    Galleries{" "}
                    <p className="d-inline text-primary">({galleries?.length ?? 0} galleries)</p>
                    <button className="btn btn-primary rounded-circle add-btn" onClick={() => openModal('create-gallery')}>
                        <FaPlus />
                    </button>
                </h2>
            </div>
            <GalleriesTemplate galleries={galleries} />
        </div>
    )
}

export default Galleries