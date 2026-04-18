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
        )
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

      {
        page === "myprofile" && (
          <div className="profile-skeleton-container container mt-3">
            <div className="d-flex justify-content-center gap-2 mb-4">
              <div className="sk-btn active"></div> 
              <div className="sk-btn"></div>
              <div className="sk-btn"></div>
              <div className="sk-btn"></div>
            </div>

            <div className="sk-cover-wrapper position-relative">
              <div className="sk-cover">
                <div className="sk-camera-icon"></div>
              </div>

              <div className="sk-avatar-circle"></div>
            </div>

            <div className="sk-info-card mt-5 p-4 text-center">
              <div className="sk-line sm mx-auto mt-2"></div>
              <div className="sk-line md mx-auto my-3"></div>

              <div className="d-flex justify-content-center gap-4 mt-2">
                <div className="sk-stat"></div>
                <div className="sk-stat"></div>
                <div className="sk-stat"></div>
                <div className="sk-stat"></div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <div className="sk-btn-manage"></div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default PageSkeleton