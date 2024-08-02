import { faPersonHalfDress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./NavSearching.css";
import { useNavigate } from "react-router";
import { ServiceData } from "../../../utils/ServiceData";

const NavSearching = () => {
  const navigate = useNavigate();
  const navItems = ServiceData;
  return (
    <div id="NavSearching">
      <ul className="vendor-list">
        {navItems?.map((item, index) => {
          return (
            <li
              className="vendor-item"
              onClick={() => {
                navigate(`${item.navigate}`);
              }}
              key={index}
            >
              <img className="vendor-img" src={item.imageIcon} alt={item.alt} />
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavSearching;
