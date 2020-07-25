import React from "react";
import { Helmet } from "react-helmet";
import { ListCoinValueProvider } from "../../contexts/ListCoinValueContext";

import { site } from "../../config/site";
import Pages from "../../components/Layout/pages";
import SearchDetails from "../../components/SearchDetails";

import * as S from "./styles";

interface Props {
  match?: {
    params?: {
      id?: string;
    };
  };
}

const Search: React.FC<Props> = ({ ...props }) => {
  return (
    <Pages>
      <Helmet title={`Consulta transação | ${site.title}`} />
      <S.Section>
        <ListCoinValueProvider>
          <SearchDetails id={props.match?.params?.id} />
        </ListCoinValueProvider>
      </S.Section>
    </Pages>
  );
};

export default Search;
