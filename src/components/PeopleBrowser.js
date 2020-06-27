import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PeopleCard from "./PeopleCard";

const PeopleBrowser = (props) => {
  const [userArray, setuserArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { users } = props;

  const searchForm = useRef(null);

  useEffect(() => {
    setuserArray(Object.values(users));
  }, [users]);

  useEffect(() => {
    searchForm.current.focus();
  });

  const searchPeople = (e) => {
    e.preventDefault();
    console.log(`search for ${searchInput}`);
    setSearchInput("");
  };

  const searchChange = (e) => {
    setSearchInput(e.target.value);
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
                placeholder={`Serach by name or title`}
              />
            </form>
          </div>
          <div className="people-browser__people-count">{`${userArray.length} Members`}</div>
        </div>
      </div>
      <div className="people-browser__cards">
        {userArray.map((user) => {
          const { fullName, profileImageUrl, userId: id, title } = user;
          return (
            <div className="peoplecard" key={id}>
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
