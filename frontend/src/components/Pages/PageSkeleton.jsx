import React from 'react'

const PageSkeleton = ({ page }) => {
  return (
    <>
      {
        page === "photo" && (
          <div className='container-fluid photo-page mt-3'>
            <div className='photo-viewer skeleton-box skeleton-image'></div>
            <div className='details-panel'>
              <div className='socialActions'>
                <div className="skeleton-circle"></div>
                <div className="skeleton-circle"></div>
                <div className="skeleton-circle"></div>
              </div>

              <ul className='list-group mt-3 skeleton-list'>
                <li>
                  <div className='skeleton-line skeleton-title'></div>
                  <div className='skeleton-line skeleton-short'></div>
                </li>

                <li>
                  <div className="skeleton-line skeleton-text"></div>
                  <div className="skeleton-line skeleton-text"></div>
                  <div className="skeleton-line skeleton-medium"></div>
                </li>

                <li>
                  <div className="skeleton-line skeleton-small"></div>
                </li>
                <li>
                  <div className="skeleton-line skeleton-small"></div>
                </li>
                <li>
                  <div className="skeleton-line skeleton-small"></div>
                </li>
                <li>
                  <div className="skeleton-line skeleton-small"></div>
                </li>
                <li>
                  <div className="skeleton-line skeleton-small"></div>
                </li>
                <li>
                  <div className="skeleton-line skeleton-small"></div>
                </li>
                <li>
                  <div className="skeleton-line skeleton-small"></div>
                </li>
                <div className='d-flex justify-content-end align-items-center flex-column mb-2 gap-2'>
                  <div className="skeleton-btn"></div>
                  <div className="skeleton-btn"></div>
                </div>
              </ul>

              <div className='comments mt-3'>
                <div className='skeleton-line skeleton-medium mb-3'></div>

                <div className='comment-form mb-3'>
                  <div className='input-group'>
                    <div className='skeleton-input'></div>
                  </div>
                </div>

                <div className="skeleton-comment"></div>
                <div className="skeleton-comment"></div>
                <div className="skeleton-comment"></div>
              </div>
            </div>
          </div>
        ) /* : (<div className='skeleton-card'>
        <div className='skeleton-image-second'></div>
        <div className='skeleton-text-second'></div>
    </div>)*/
      }

      {
        page === "gallery" && (
          <div className='skeleton-container container'>
            <div className="skeleton-g-title"></div>
            <div className='skeleton-g-description'></div>
            <div className="skeleton-card">
              <div className="skeleton-image-second"></div>
              <div className="skeleton-text-second"></div>
            </div>
          </div>
        )
      }

      {
        page === "photos" && (<div className='skeleton-card'>
          <div className='skeleton-image-second'></div>
          <div className='skeleton-text-second'></div>
        </div>)
      }
    </>
  )
}

export default PageSkeleton