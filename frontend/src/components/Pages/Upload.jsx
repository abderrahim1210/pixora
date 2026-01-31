import React, { useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import LightBox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

import { notyf } from "../../assets/js/notyf";

export const Upload = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const {user} = useAuth();
  if (!user.id) return navigate('/login');
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
    preview: null
  });
  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

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
        image: photo.preview
      }
      if (file) {
        const res = await axios.post('http://localhost/Pixora/backend/api/upload_photo.php', { photo_data: payload }, { withCredentials: true });
        if (res.data.success) {
          navigate(`/${user.username}/myphotos`,{state:{uploaded:true,message:res.data.message}});
        } else {
          notyf.error(res.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div data-bs-page="upload">
      <div className="dv1">
        <div className="upload-box text-center">
          <div className="mt-3 mb-3">
            <img
              src="/outils/pngs/logo_styled.png"
              className="img-fluid mt-5"
              width="150px"
              alt="logo"
              title="Welcome to Pixora."
            />
          </div>
          <form
            onSubmit={handleSubmit}
            id="photosForm"
          >
            <div className="mb-3">
              {step === 1 && <StepOne next={next} step={step} photo={photo} setPhoto={setPhoto} />}
              {step === 2 && <StepTwo next={next} prev={prev} step={step} photo={photo} setPhoto={setPhoto} />}
              {step === 3 && <StepThree next={next} prev={prev} step={step} photo={photo} setPhoto={setPhoto} />}
              {step === 4 && <StepFour prev={prev} step={step} />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
function StepOne({ step, next, photo, setPhoto }) {
  return (
    <>
      <section className={`step ${step === 1 ? "active" : ""}`} id="step1" data-step={1}>
        <div>
          <p style={{ fontWeight: 500 }}>
            Choose how you want your photo to be shared on Pixora.
          </p>
        </div>
        <div className="cards">
          <label className="card">
            <input
              type="radio"
              name="typePhoto"
              value="free"
              onChange={(e) => setPhoto({ ...photo, type: e.target.value })}
              hidden
            />
            <div className="card-body">
              <img
                src="/outils/svg/image.svg"
                className="chooseTypeIcon mt-2 mb-3"
                width="50px"
                alt=""
              />
              <h3>free photo</h3>
              <p>
                Choose this option if you want to publish your photo for free.
                The photo will be available for public use according to
                Pixora’s usage guidelines.
              </p>
              <i>Free to use, no licensing fees.</i>
            </div>
          </label>
          <label className="card">
            <input
              type="radio"
              name="typePhoto"
              value="licensed"
              onChange={(e) => setPhoto({ ...photo, type: e.target.value })}
              hidden
            />
            <div className="card-body">
              <img
                src="outils/svg/scale.svg"
                className="chooseTypeIcon mt-2 mb-3"
                width="50px"
                alt=""
              />
              <h3>Licensed Photo</h3>
              <p>
                Choose this option if you want to sell your photo or control
                how it is used. You can set licensing terms, pricing, and
                usage rights, including commercial use.
              </p>
              <i>Sell your photo with defined usage rights.</i>
            </div>
          </label>
          <input type="hidden" name="photoType" id="photoType" />
        </div>
        <div className="pagination">
          <li className="page-item">
            <button type="button" onClick={next} className={`page-link next ${photo.type === "" ? "disabled" : ""}`}>
              Next
            </button>
          </li>
        </div>
      </section>
    </>
  );
}
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
            size: (file.size / 1024 / 1024).toFixed(2) + " MB",
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
      <section className={`step ${step === 2 ? "active" : ""}`} id="step2" data-step={2}>
        <div className="container-fluid mt-2 mb-2">
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
  return (
    <>
      <section className={`step ${step === 3 ? "active" : ""}`} id="step3" data-step={3}>
        <h2>Photo Details</h2>
        <div className="photo_details">
          <div className="form-floating">
            <textarea
              name="title"
              id="titlePhoto"
              className="form-control"
              placeholder="Title of photo ..."
              required
              value={photo.title}
              onChange={(e) => setPhoto({ ...photo, title: e.target.value })}
            />
            <label htmlFor="titlePhoto" className="form-label">
              Title
            </label>
            <p id="titleErr" />
          </div>
          <div className="form-floating">
            <textarea
              name="description"
              id="descriptionPhoto"
              className="form-control"
              placeholder="Description of photo ..."
              required
              value={photo.description}
              onChange={(e) => setPhoto({ ...photo, description: e.target.value })}
            />
            <label htmlFor="descriptionPhoto" className="form-label">
              Description
            </label>
            <p id="descriptionErr" />
          </div>
          <div className="form-floating">
            <input
              name="categorie"
              type="text"
              className="form-control"
              id="categoriePhoto"
              placeholder="Categorie photo ..."
              required
              value={photo.category}
              onChange={(e) => setPhoto({ ...photo, category: e.target.value })}
            />
            <label htmlFor="categoriePhoto" className="form-label">
              Category
            </label>
            <p id="categorieErr" />
          </div>
        </div>
        <div className="pagination">
          <li className="page-item">
            <button type="button" onClick={prev} className="page-link prev">
              Prev
            </button>
          </li>
          <li className="page-item">
            <button type="button" onClick={next} className={`page-link next ${photo.title === "" || photo.description === "" || photo.category === "" ? "disabled" : ""}`}>
              Next
            </button>
          </li>
        </div>
      </section>
    </>
  );
}
function StepFour({ step, prev }) {
  return (
    <>
      <section className={`step ${step === 4 ? "active" : ""}`} id="step4" data-step={4}>
        <div className="pagination">
          <li className="page-item">
            <button type="button" onClick={prev} className="page-link prev">
              Prev
            </button>
          </li>
        </div>
        <button type="submit" className="btn" id="uploadButton">
          Upload
        </button>
      </section>
    </>
  );
}
