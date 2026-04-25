import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import LightBox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

import { notyf } from "../../assets/js/notyf";
import { FaArrowRight, FaCamera, FaCheck, FaRocket } from "react-icons/fa";
import { AiOutlineCamera } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { Truncate } from "./Truncate";

export const Upload = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  // if (!user?.id) return navigate('/login');
  const steps = ['Get started', 'Upload', 'Details', 'Publish'];
  const [photo, setPhoto] = useState({
    title: "",
    type: "",
    file: null,
    filename: "",
    description: "",
    category: "",
    width: "",
    height: "",
    ratio: "",
    size: "",
    orientation: "",
    tags: "",
    preview: null,
    visibility: "",
    gallery_id: ""
  });
  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { file } = photo;
      const payload = {
        title: photo.title,
        description: photo.description,
        category: photo.category,
        type: photo.type,
        width: photo.width,
        height: photo.height,
        ratio: photo.ratio,
        orientation: photo.orientation,
        tags: photo.tags,
        size: photo.size,
        image: photo.preview,
        visibility: photo.visibility,
        gallery_id: photo.gallery_id
      }
      if (file) {
        const res = await axios.post('https://api.pixora.test/upload', { photo_data: payload }, { withCredentials: true, withXSRFToken: true });
        if (res.data.success) {
          navigate(`/user/${user.username}/myphotos`, { state: { uploaded: true, message: res.data.message } });
        } else {
          notyf.error(res.data.message);
        }
      }
    } catch (err) {
      console.log(err.response?.data);
    }
  }

  function getColors(step) {
    switch (step) {
      case 1:
        return "#ef4444";
      case 2:
        return "#f97316";
      case 3:
        return "#eab308";
      case 4:
        return "#22c55e";
      default:
        return "#ddd";
    }
  }

  return (
    <div data-bs-page="upload">
      <div className="dv1">
        <div className="text-center">
          <div className="container d-flex justify-content-center">
            <div className="progress mb-3">
              <div className="progress-bar" style={{ width: `${progress}%`, background: getColors(step) }}>
                {progress} %
              </div>
            </div>
          </div>
          <div className="step-bar mt-2 mb-2">
            {
              steps.map((s, index) => (
                <span key={index} className={`step-item ${index < step ? 'done' : ''} ${step === index ? 'active' : ''}`}>
                  <span className="step-content">*{index < step ? (<FaCheck className="stepDone" />) : (<span className="step-number">{index + 1}</span>)} <span>{s}</span> {index < steps.length - 1 && (<FaArrowRight className="step-arrow" />)}</span>
                </span>
              ))
            }
          </div>
          <form
            onSubmit={handleSubmit}
            id="photosForm"
          >
            <div className="mb-3">
              {step === 0 && <StepZero next={next} step={step} />}
              {/* {step === 1 && <StepOne next={next} step={step} prev={prev} photo={photo} setPhoto={setPhoto} />} */}
              {step === 1 && <StepTwo next={next} prev={prev} step={step} photo={photo} setPhoto={setPhoto} />}
              {step === 2 && <StepThree next={next} prev={prev} step={step} photo={photo} setPhoto={setPhoto} />}
              {step === 3 && <StepFour prev={prev} step={step} photo={photo} user={user} />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
function StepZero({ step, next }) {
  return (
    <section className={`step ${step === 0 ? "active" : ""}`} id="step0" data-step={0}>
      {/* <div className="welcome-card">
        <div>
          <AiOutlineCamera className="icon" />
          <h2>Welcome to Pixora</h2>
          <p>Upload your asset in minutes</p>
        </div>
      </div> */}
      <div className="step-one-container">
        <div className="hero-content">
          {/* Icon Wrapper m3a Glow Effect */}
          <div className="icon-illustration">
            <div className="glass-circle">
              <FaCamera className="camera-icon" />
            </div>
            <div className="pulse-ring"></div>
          </div>
          <div className="text-group">
            <h1 className="welcome-title">
              Ready to share your <span className="gradient-text">Vision?</span>
            </h1>
            <p className="welcome-subtitle">
              Join our community of creators. Your high-quality assets deserve a professional home.
            </p>
          </div>
          <div className="action-area">
            <button onClick={next} className={`page-link next pixora-primary-btn`}>
              Get Started
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ms-2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <p className="hint-text">Estimated time: 2 minutes</p>
          </div>
        </div>
      </div>
      {/* <div className="pagination">
        <li className="page-item">
          <button type="button" onClick={next} className={`page-link next`}>
            Next
          </button>
        </li>
      </div> */}
    </section>
  )
}


// function StepOne({ step, next, prev, photo, setPhoto }) {
//   return (
//     <>
//       <section className={`step ${step === 1 ? "active" : ""}`} id="step1" data-step={1}>
//         <div>
//           <p style={{ fontWeight: 500 }}>
//             Choose how you want your photo to be shared on Pixora.
//           </p>
//         </div>
//         <div className="cards">
//           <label className="card">
//             <input
//               type="radio"
//               name="typePhoto"
//               value="free"
//               onChange={(e) => setPhoto({ ...photo, type: e.target.value })}
//               hidden
//             />
//             <div className="card-body">
//               <img
//                 src="/outils/svg/image.svg"
//                 className="chooseTypeIcon mt-2 mb-3"
//                 width="50px"
//                 alt=""
//               />
//               <h3>free photo</h3>
//               <p>
//                 Choose this option if you want to publish your photo for free.
//                 The photo will be available for public use according to
//                 Pixora’s usage guidelines.
//               </p>
//               <i>Free to use, no licensing fees.</i>
//             </div>
//           </label>
//           <label className="card">
//             <input
//               type="radio"
//               name="typePhoto"
//               value="licensed"
//               onChange={(e) => setPhoto({ ...photo, type: e.target.value })}
//               hidden
//             />
//             <div className="card-body">
//               <img
//                 src="outils/svg/scale.svg"
//                 className="chooseTypeIcon mt-2 mb-3"
//                 width="50px"
//                 alt=""
//               />
//               <h3>Licensed Photo</h3>
//               <p>
//                 Choose this option if you want to sell your photo or control
//                 how it is used. You can set licensing terms, pricing, and
//                 usage rights, including commercial use.
//               </p>
//               <i>Sell your photo with defined usage rights.</i>
//             </div>
//           </label>
//           <input type="hidden" name="photoType" id="photoType" />
//         </div>
//         <div className="pagination">
//           <li className="page-item">
//             <button type="button" onClick={prev} className="page-link prev">
//               Prev
//             </button>
//           </li>
//           <li className="page-item">
//             <button type="button" onClick={next} className={`page-link next ${photo.type === "" ? "disabled" : ""}`}>
//               Next
//             </button>
//           </li>
//         </div>
//       </section>
//     </>
//   );
// }
function StepTwo({ step, prev, next, photo, setPhoto }) {
  const fileRef = React.useRef(null);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    fileRef.current.click();
  }
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;

          const info = {
            filename: file.name,
            size: (file.size / 1024 / 1024).toFixed(2),
            width: width,
            height: height,
            resolution: (width * height).toLocaleString(),
            ratio: (width / height).toFixed(2),
            orientation: (width > height) ? "Landscape" : (width < height) ? "Portrait" : "Square",
            preview: reader.result,
            file
          };

          setPhoto((photo) => ({
            ...photo,
            ...info
          }));
        };
        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className={`step ${step === 1 ? "active" : ""}`} id="step2" data-step={1}>
        <div className="container mt-2 mb-2">
          <div className="card uploadCard">
            <div className="card-body">
              <div>
                <input
                  type="file"
                  name="photoFile"
                  className="form-control d-none"
                  id="uploadPhoto"
                  accept=".png, .jpg, .jpeg"
                  required
                  ref={fileRef}
                  onChange={handleChange}
                />
                <p id="uploadErr" />
                <div id="upload">
                  <div className="selected_photo">
                    {photo.preview ? (<div><LightBox
                      open={open}
                      close={() => setOpen(false)}
                      slides={[{ src: `${photo.preview}`, title: photo.title }]}
                      plugins={[Zoom]}
                      carousel={{
                        arrows: false
                      }}
                    /><img src={photo.preview} className="img-fluid" onClick={() => setOpen(true)} alt={"preview"} style={{ display: "block" }} id="preview" /><table className="table table-bordered photoInformations">
                        <tbody>
                          <tr>
                            <td>Name</td>
                            <td style={{ textTransform: 'lowercase' }}>{photo.filename}</td>
                          </tr>
                          <tr>
                            <td>Size</td>
                            <td>{photo.size}</td>
                          </tr>
                          <tr>
                            <td>Resolution</td>
                            <td>{`${photo.width} × ${photo.height}`}</td>
                          </tr>
                          <tr>
                            <td>Ratio</td>
                            <td>{photo.ratio}</td>
                          </tr>
                          <tr>
                            <td>Orientation</td>
                            <td>{photo.orientation}</td>
                          </tr>
                        </tbody>
                      </table></div>) : (<div id="choose_photo" onClick={handleClick}>
                        <img
                          src="/outils/pngs/upload_image_icon.png"
                          id="icon"
                          width="150px"
                          height="auto"
                          alt="uplaod icon"
                        />
                        <p id="para">Drop your photo here</p>
                        <i>JPG, PNG • Max 10MB</i>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pagination">
            <li className="page-item">
              <button type="button" onClick={prev} className="page-link prev">
                Prev
              </button>
            </li>
            <li className="page-item">
              <button type="button" onClick={next} className={`page-link next ${photo.preview === null ? "disabled" : ""}`}>
                Next
              </button>
            </li>
          </div>
        </div>
      </section>
    </>
  );
}
function StepThree({ step, prev, next, photo, setPhoto }) {
  const [categories, setCategories] = useState([]);
  const [galleries, setGalleries] = useState([]);
  useEffect(() => {
    try {
      axios.get('https://api.pixora.test/get_galleries', { withCredentials: true, withXSRFToken: true })
        .then(res => {
          if (res.data.success) {
            setGalleries(res.data.galleries);
          }
        });
    } catch (err) {
      console.log(err.response?.data);
    }
  }, []);
  const url = 'https://api.pixora.test/get_categories';
  useEffect(() => {
    try {
      axios.get(url)
        .then(res => {
          if (res.data.success) {
            setCategories(res.data.categories);
          }
        })
    } catch (err) {
      console.log(err.response?.data)
    }
  }, []);
  return (
    <>
      <section className={`step ${step === 2 ? "active" : ""}`} id="step3" data-step={3}>
        <div className="text-center mx-auto d-flex justify-content-center align-items-center flex-column mt-3 mb-3">
          <h2 className="fw-bold welcome-title">
            <FiInfo className="me-2 text-primary" /> Photo Details
          </h2>
          <p className="text-muted">Tell us more about your masterpiece.</p>
        </div>
        <div className="container">
          <div className="photo_details mx-auto">
            <div className="input-group-custom">
              <label htmlFor="titlePhoto" className="form-label">
                Title *
              </label>
              <input
                name="title"
                type="text"
                // id="titlePhoto"
                className="form-control"
                placeholder="Give it a catchy name..."
                required
                value={photo.title}
                maxLength={100}
                onChange={(e) => setPhoto({ ...photo, title: e.target.value })}
              />

              <p id="titleErr" />
            </div>
            <div className="input-group-custom">
              <label htmlFor="descriptionPhoto" className="form-label">
                Description (optional)
              </label>
              <textarea
                name="description"
                // id="descriptionPhoto"
                className="form-control"
                placeholder="The story behind this shot..."
                required
                value={photo.description}
                onChange={(e) => setPhoto({ ...photo, description: e.target.value })}
              />

              <p id="descriptionErr" />
            </div>
            <div className="row w-100 g-3">
              <div className="col-md-6">

                <div className="input-group-custom">
                  <label htmlFor="categoriePhoto" className="form-label">
                    Category *
                  </label>
                  <select name="categorie" value={photo.category} className="form-select" id="categoriePhoto" onChange={(e) => setPhoto({ ...photo, category: e.target.value })}>
                    <option>Select category</option>
                    {
                      categories?.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))
                    }
                  </select>

                  <p id="categorieErr" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group-custom">
                  <label htmlFor="galleryPhoto" className="form-label">
                    Gallery (Optional)
                  </label>
                  <select name="gallery" value={photo.gallery_id} className="form-select" id="galleryPhoto" onChange={(e) => setPhoto({ ...photo, gallery_id: e.target.value })}>
                    <option value={null}>Select gallery</option>
                    {
                      galleries?.map(g => (
                        <option key={g.id} value={g.id}>{g.title}</option>
                      ))
                    }
                  </select>

                  <p id="galleryErr" />
                </div>
              </div>
            </div>
            <div className="input-group-custom">
              <label htmlFor="tagsPhoto" className="form-label">Tags (optional)</label>
              <textarea
                name="tags"
                id="tagsPhoto"
                className="form-control"
                placeholder="Tags of photo ..."
                required
                value={photo.tags}
                onChange={(e) => setPhoto({ ...photo, tags: e.target.value })}
              />

            </div>
            <div className="input-group-custom">
              <label htmlFor="categoriePhoto" className="form-label">
                Who can see this?
              </label>
              <select name="visibility" value={photo.visibility} className="form-select" id="visibilityPhoto" onChange={(e) => setPhoto({ ...photo, visibility: e.target.value })}>
                <option value="" disabled hidden>Select who can see this...</option>
                <option value="private">Private (Only you)</option>
                <option value="public">Public (Anyone can discover)</option>
              </select>

              <p id="categorieErr" />
            </div>
          </div>
        </div>
        <div className="pagination">
          <li className="page-item">
            <button type="button" onClick={prev} className="page-link prev">
              Prev
            </button>
          </li>
          <li className="page-item">
            <button type="button" onClick={next} className={`page-link next ${photo.title === "" || photo.category === "" ? "disabled" : ""}`}>
              Next
            </button>
          </li>
        </div>
      </section>
    </>
  );
}
function StepFour({ step, prev, photo, user }) {
  return (
    <>
      <section className={`step ${step === 3 ? "active" : ""}`} id="step4" data-step={4}>
        <h3 className="fw-bold">Your file is ready to be published <FaRocket /></h3>
        <p>Review the information below, then click Publish to make it available.</p>
        <div className="publish-card">
          <div className="details">
            <ul className="list-group publish-list">
              <li className="list-group-item">
                <span>Name</span>
                <strong>{photo.filename}</strong>
              </li>
              <li className="list-group-item">
                <span>Size</span>
                <strong>{photo.size} MB</strong>
              </li>
              {
                photo.title && (<li className="list-group-item">
                  <span>Title</span>
                  <strong>{photo.title}</strong>
                </li>)
              }
              {
                photo.description && (<li className="list-group-item">
                  <span>Description</span>
                  <Truncate text={photo?.description} maxLines={3}>
                    {({ text, open, toggle, showMore, className, style }) => (
                      <><strong className={className} style={style}>{text}</strong></>
                    )}
                  </Truncate>
                  {/* <strong>{photo.description}</strong> */}
                </li>)
              }
              {
                photo.type && (<li className="list-group-item">
                  <span>Type</span>
                  <strong>{photo.type}</strong>
                </li>)
              }
              {
                photo.category && (<li className="list-group-item">
                  <span>Category</span>
                  <strong>{photo.category}</strong>
                </li>)
              }
              {
                photo.tags && (<li className="list-group-item">
                  <span>Tags</span>
                  <strong>{photo.tags}</strong>
                </li>)
              }
              <li className="list-group-item">
                <span>By</span>
                <strong>{user.username}</strong>
              </li>
            </ul>
          </div>
        </div>
        <div className="pagination">
          <li className="page-item">
            <button type="button" onClick={prev} className="page-link prev">
              Prev
            </button>
          </li>
          <li className="page-item">
            <button type="submit" className="page-link prev">
              Publish
            </button>
          </li>
        </div>
        {/* <button type="submit" className="btn" id="uploadButton">
          Upload
        </button> */}
      </section>
    </>
  );
}
