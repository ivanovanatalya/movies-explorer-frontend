import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { failMsg } from "../App/App";
import Preloader from "../Preloader/Preloader";
import "./Profile.css";

const Profile = ({ onSignOut, onProfileEdit, setTooltipSettings, setInfoTooltipPopupOpen }) => {
  const userContext = useContext(CurrentUserContext);
  const [name, setName] = useState(userContext.userName);
  const [email, setEmail] = useState(userContext.userMail);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nameInputRef = useRef(false);

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value)
  }

  const handleEdit = (event) => {
    event.preventDefault();
    setIsEdit(true);
    nameInputRef.current.focus()
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === userContext.userName && email === userContext.userMail) {
      setIsEdit(false);
      return;
    }
    setIsLoading(true);
    onProfileEdit(name, email)
    .then(() => {
      console.log('edit')
      setIsEdit(false);
    })
    .catch(err => {
      console.log(err);
      setTooltipSettings({
        // message: AppMessage.BAD_REQUEST,
        message: failMsg,
        isSuccess: false,
      })
      setInfoTooltipPopupOpen(true);
    })
    .finally(() => setIsLoading(false))
  }

  // const isButtonActive = isValid
  //   && !isLoading
    // && (values.username !== initialValues.username || values.email !== initialValues.email);

  return (
    <main className="profile">
      <div className="profile__title">
        {`Привет, ${name}!`}
      </div>
      <form className="profile__form" onSubmit={(e) => handleSubmit(e)} method="" action="">
        <div>
          <div className="profile__form-item">
            <label htmlFor="name" className="profile__text profile__text_bold">
              Имя
            </label>
            <input
              id="name"
              className={`profile__text${
                isEdit ? ' profile__text_editable' : ''
              }`}
              type="text"
              name="username"
              ref={nameInputRef}
              value={name || ''}
              minLength="2"
              maxLength="30"
              onChange={(e) => handleNameChange(e)}
              disabled={isLoading || !isEdit}
            />
          </div>
          <div className="profile__form-item">
            <label htmlFor="email" className="profile__text profile__text_bold">
              E-mail
            </label>
            <input
              id="email"
              className={`profile__text${
                isEdit ? ' profile__text_editable' : ''
              }`}
              type="text"
              name="email"
              value={email || ''}
              onChange={(e) => handleEmailChange(e)}
              disabled={isLoading || !isEdit}
            />
          </div>
        </div>
        {isLoading ? <Preloader /> : ''}
        {/* <p className='profile__error'>{errors.username || errors.email}</p> */}
        <nav className="profile__navigation">
          {isEdit
            ? 
            <button className="profile__link" disabled={isLoading}>
              Save
            </button>
            :
            <button type="button" onClick={(e) => handleEdit(e)} className="profile__link">
              Редактировать
            </button>
          }
          {!isEdit ?
            <Link to="/sign-in" onClick={onSignOut} className="profile__link profile__link_alert">
              Выйти из аккаунта
            </Link>
            : ''
          }
        </nav>
      </form>
    </main>
  );
};

export default Profile;