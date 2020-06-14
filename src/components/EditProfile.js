import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField, FormHelperText } from "@material-ui/core";
import {
  postImage,
} from "../actions/index";

const EditProfile = (props) => {
  const {
    userInfo,
    closeModal,
    postImage,
    closeDropDown
  } = props;

  const [imageUrl, setImageUrl] = useState(userInfo.userInfo.profileImageUrl);
  const [imageFile, setImageFile] = useState('');

  const [fullName, setFullName] = useState(userInfo.userInfo.fullName);
  const [displayName, setDisplayName] = useState(userInfo.userInfo.displayName);
  const [title, setTitle] = useState(userInfo.userInfo.title);
  const [email, setEmail] = useState(userInfo.userInfo.email);

  const onChange = (e) => {
    const file = e.currentTarget.files[0];
    setImageFile(file);
    const fileReader = new FileReader();

    if (file) {
        fileReader.readAsDataURL(file);
    }
            fileReader.onloadend = () => {
              setImageUrl(fileReader.result);
            };
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    let formData;
    if (imageFile) {
        formData = new FormData();
        formData.append("img", imageFile);
    }

    const user = {
      fullName,
      displayName,
      title,
      email,
    };
    postImage(formData, user)
    setImageFile('')

    closeModal();

    if (closeDropDown) {
        closeDropDown()
    }
  };


  const closeAll = () => {
      closeModal()

      if (closeDropDown) {
          closeDropDown()
      }
  }

  const formChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "displayName":
        setDisplayName(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        return;
    }
  };

  if (!userInfo) return null;
  return (
    <div className="edit-profile-container">
      <div className="edit-profile-title">Edit Your Profile</div>
      <form id="edit-profile-form" className="edit-profile-form">
        <div className="edit-form-input">
          <TextField
            name="fullName"
            onChange={formChangeHandler}
            fullWidth
            id="edit-form-fullName"
            label="Full Name"
            variant="outlined"
            defaultValue={fullName}
          />
          <FormHelperText id="edit-form-fullName-helper">
            If you don't have a Display Name, this will be it
          </FormHelperText>
        </div>
        <div className="edit-form-input">
          <TextField
            name="displayName"
            onChange={formChangeHandler}
            fullWidth
            id="edit-form-displayName"
            label="Display Name"
            variant="outlined"
            defaultValue={displayName}
          />
          <FormHelperText id="edit-form-displayName-helper">
            This could be your first name, or a nickname - however you'd like
            people to refer to you in Slick
          </FormHelperText>
        </div>
        <div className="edit-form-input">
          <TextField
            name="title"
            onChange={formChangeHandler}
            fullWidth
            id="edit-form-Title"
            label="What I do"
            variant="outlined"
            defaultValue={title}
          />
          <FormHelperText id="edit-form-title-helper">
            Let people at Slick know what you do
          </FormHelperText>
        </div>
        <div className="edit-form-input">
          <TextField
            name="email"
            onChange={formChangeHandler}
            fullWidth
            id="edit-form-email"
            label="Email"
            variant="outlined"
            defaultValue={email}
          />
          <FormHelperText id="edit-form-email-helper">
            We'll never share your email.
          </FormHelperText>
        </div>
      </form>
      <div className="edit-form-picture-container">
        <h1>Profile Picture</h1>
        <div className="edit-form-image-display">
          <img className="edit-form-image" alt="newProfilePic" src={imageUrl} />
        </div>
        <label htmlFor="icon-button-file" id="upload-image-label">
          <input
            accept="image/*"
            type="file"
            onChange={onChange}
            id="icon-button-file"
          />
          Upload Image
        </label>
        <div className="edit-profile-buttons-container">
          <button
            onClick={closeAll}
            className="edit-profile-button edit-profile-cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={submitFormHandler}
            form="edit-profile-form"
            className="edit-profile-button edit-profile-save-button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postImage: (formData, user) => dispatch(postImage(formData, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
