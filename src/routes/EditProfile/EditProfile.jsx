import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../../components/AuthProvider/AuthProvider";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import {
  getProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
} from "../../firebase/firebase";
import style from "./editprofile.module.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState(null);
  const fileRef = useRef(null);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
    setState(2);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleChangeFile(e) {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;
        const res = await setUserProfilePhoto(currentUser.uid, imageData);

        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileUrl(url);
        }
      };
    }
  }

  if (state !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      ></AuthProvider>
    );
  }

  return (
    <DashboardWrapper>
      <div>
        <h2>Editar Información de usuario</h2>
        <div className={style.profilePictureContainer}>
          <div>
            <img src={profileUrl} alt="profileImg" width={100} />
          </div>
          <div>
            <button className="btn" onClick={handleOpenFilePicker}>
              Elegir imagen de perfil
            </button>
            <input
              className={style.fileInput}
              ref={fileRef}
              type="file"
              onChange={handleChangeFile}
            />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default EditProfile;
