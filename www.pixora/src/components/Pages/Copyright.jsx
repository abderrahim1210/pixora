import React from "react";

export const Copyright = () => {
  const p = document.querySelectorAll("#copyrightText");
  let date = new Date();
  let year = date.getFullYear();
  p.forEach(
    (el) => (el.innerHTML = `&copy;${year} Pixora All Rights Reserved.`)
  );
  return <div className="text-center"><p id="copyrightText" style={{color:'white'}}></p></div>;
};
