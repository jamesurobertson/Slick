import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PeopleCard from "./PeopleCard";

const PeopleBrowser = (props) => {
  const [userArray, setUserArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { users } = props;

  const searchForm = useRef(null);

  useEffect(() => {
    setUserArray(Object.values(users));
  }, [users]);

  useEffect(() => {
    searchForm.current.focus();
  });

  const searchPeople = (e) => {
    e.preventDefault();
    setSearchInput("");
    setSearchInput("");
    setUserArray(Object.values(users));
  };

  const searchChange = (e) => {
    setSearchInput(e.target.value);
    const searchArray = Object.values(users).filter((user) => {
      console.log(user);
      return (
        user.fullName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });

    setUserArray(searchArray);
  };

  return (
    <div className="people-browser__container">
      <div className="people-browser__header">
        <div className="people-browser__title">People</div>
        <div className="people-browser__members">
          <div className="people-browser__member"> Members</div>
        </div>
        <div className="people-browser__search">
          <div className="message-input-container-inner">
            <form className="people-search-form" onSubmit={searchPeople}>
              <input
                ref={searchForm}
                className="message-input"
                onChange={searchChange}
                value={searchInput}
                placeholder={`Serach by name, email, or title`}
              />
            </form>
          </div>
          <div className="people-browser__people-count">{`${userArray.length} Members`}</div>
        </div>
      </div>
      <div className="people-browser__cards">
        {userArray.map((user) => {
          const { fullName, profileImageUrl, id, title } = user;
          return (
            <div className="peoplecard" key={`peoplecard ${id}`}>
              <PeopleCard
                name={fullName}
                image={profileImageUrl}
                title={title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(PeopleBrowser);
