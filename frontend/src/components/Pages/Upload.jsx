import React, { useState } from "react";
//import '../../assets/css/upload.css'
export const Upload = () => {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);
  return (
    <>
      <div className="dv1">
        <div className="upload-box text-center">
          <div className="mt-5 mb-3">
            <img
              src="outils/pngs/logo_styled.png"
              className="img-fluid mt-5"
              width="150px"
              alt="logo"
              title="Welcome to Pixora."
            />
          </div>
          <form
            method="post"
            encType="multipart/form-data"
            id="photosForm"
            noValidate=""
          >
            {step === 1 && <StepOne next={next} />}
            {step === 2 && <StepTwo next={next} prev={prev} />}
            {step === 3 && <StepThree next={next} prev={prev} />}
            {step === 4 && <StepFour prev={prev} />}
          </form>
        </div>
      </div>
    </>
  );
  function StepOne({ next }) {
    return (
      <>
        <section className="step active" id="step1" data-step={1}>
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
                defaultValue="free"
                hidden=""
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
                defaultValue="licensed"
                hidden=""
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
              <button type="button" onClick={next} className="page-link next">
                Next
              </button>
            </li>
          </div>
        </section>
      </>
    );
  }
  function StepTwo({ prev, next }) {
    return (
      <>
        <section className="step" id="step2" data-step={2}>
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
                    required=""
                  />
                  <p id="uploadErr" />
                  <div id="upload">
                    <div id="choose_photo">
                      <img
                        src="/outils/pngs/upload_image_icon.png"
                        id="icon"
                        width="150px"
                        height="auto"
                        alt="uplaod icon"
                      />
                      <p id="para">Drop your photo here</p>
                      <i>JPG, PNG • Max 10MB</i>
                    </div>
                    <div className="selected_photo">
                      <img src="" style={{ display: "none" }} id="preview" />
                      <table className="table photoInformations">
                        <tbody>
                          <tr>
                            <td>Name</td>
                            <td id="photoName" />
                          </tr>
                          <tr>
                            <td>Size</td>
                            <td id="photoSize" />
                          </tr>
                          <tr>
                            <td>Resolution</td>
                            <td id="photoResolution" />
                          </tr>
                          <tr>
                            <td>Ratio</td>
                            <td id="photoRatio" />
                          </tr>
                          <tr>
                            <td>Orientation</td>
                            <td id="photoOrientation" />
                          </tr>
                        </tbody>
                      </table>
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
                <button type="button" onClick={next} className="page-link next">
                  Next
                </button>
              </li>
            </div>
          </div>
        </section>
      </>
    );
  }
  function StepThree({ prev, next }) {
    return (
      <>
        <section className="step" id="step3" data-step={3}>
          <h2>Photo Details</h2>
          <div className="photo_details">
            <div className="form-floating">
              <textarea
                name="title"
                id="titlePhoto"
                className="form-control"
                placeholder="Title of photo ..."
                required=""
                defaultValue={""}
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
                required=""
                defaultValue={""}
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
                required=""
              />
              <label htmlFor="categoriePhoto" className="form-label">
                Categorie
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
              <button type="button" onClick={next} className="page-link next">
                Next
              </button>
            </li>
          </div>
        </section>
      </>
    );
  }
  function StepFour({ prev }) {
    return (
      <>
        <section className="step" id="step4" data-step={4}>
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
};
