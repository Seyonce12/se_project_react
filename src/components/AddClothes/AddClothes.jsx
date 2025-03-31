import './AddClothes.css';

const AddClothes = () => {
  return (
    <>
      <label className="modal__input">
        Name
        <input
          id="modal__input-name"
          className="modal__input-form"
          name="name"
          type="text"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
        />
      </label>
      <span className=""></span>
      {/* Image URL Input */}
      <label className="modal__input">
        Image
        <input
          id="modal__input-url"
          className="modal__input-form"
          name="link"
          type="url"
          placeholder="Image URL"
          required
        />
      </label>
      <span className=""></span>
      {/* Select weather and radio inputs */}
      <p className="modal__radio-title">Select weather type:</p>
      <div className="modal__radio-container">
        <div className="radio__btn-container">
          <input
            className="radio__btns"
            type="radio"
            id="hot"
            name="weather"
            value="hot"
          />
          <label
            htmlFor="hot"
            className="radio__btn-label"
          >
            Hot
          </label>
        </div>
        <div className="radio__btn-container">
          <input
            className="radio__btns"
            type="radio"
            id="warm"
            name="weather"
            value="warm"
          />
          <label
            htmlFor="warm"
            className="radio__btn-label"
          >
            Warm
          </label>
        </div>
        <div className="radio__btn-container">
          <input
            className="radio__btns"
            type="radio"
            id="cold"
            name="weather"
            value="cold"
          />
          <label
            htmlFor="cold"
            className="radio__btn-label"
          >
            Cold
          </label>
        </div>
      </div>
    </>
  );
};

export default AddClothes;