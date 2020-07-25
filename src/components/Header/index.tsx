import React from "react";

import Nav from "../Nav";

import * as S from "./styles";

interface Props {
  page?: string;
}

const Header: React.FC<Props> = ({ ...props }) => (
  <S.Header theme={props.page}>
    <Nav />
    {props.children}
  </S.Header>
);

export default Header;
