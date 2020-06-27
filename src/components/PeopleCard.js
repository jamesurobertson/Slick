import React from "react";
import { connect } from "react-redux";

const PeopleCard = (props) => {
    const {name, image, title} = props
  return (
      <div className='peoplecard__container'>
          <div className='peoplecard__picture'>
              <img src={image} alt={name}/>
          </div>
          <div className='peoplecard__footer'>
              <div className='peoplecard__fullName'>{name}</div>
              <div className='peoplecard__title'>{title}</div>
          </div>
      </div>
  );
};

export default connect()(PeopleCard);
