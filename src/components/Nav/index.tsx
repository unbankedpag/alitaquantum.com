import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";

import { site, listLinks } from "../../config/site";

import * as S from "./styles";

const Header = () => {
  const width = 550;
  const [slideOut, setSlideOut] = useState("");
  const [btn, setBtn] = useState(false);

  window.addEventListener("resize", () => {
    if (window.innerWidth <= width) {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  });

  useEffect(() => {
    if (window.innerWidth <= width) {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [btn]);

  function handlaButton() {
    slideOut === "slide-out" ? setSlideOut("") : setSlideOut("slide-out");
  }

  return (
    <S.Nav>
      <S.Logo>
        <S.LogoLink to="/">{site.title}</S.LogoLink>
      </S.Logo>

      <S.Ul className={slideOut} size={width}>
        {listLinks.map((item) => (
          <S.Li key={item.title}>
            <S.A to={item.url} size={width}>
              {item.title}
            </S.A>
          </S.Li>
        ))}
      </S.Ul>

      {btn && (
        <S.Button onClick={handlaButton}>
          <FiMenu size={30} />
        </S.Button>
      )}
    </S.Nav>
  );
};

export default Header;
