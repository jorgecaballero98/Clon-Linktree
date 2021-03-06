import React from "react";
import style from "./publicLinks.module.css";
const PublicLink = ({ url, title }) => {
  return (
    <>
      <a href={url} className={style.publicLinkContainer}>
        <div>{title}</div>
      </a>
    </>
  );
};

export default PublicLink;
