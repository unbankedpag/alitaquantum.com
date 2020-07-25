import React from "react";

import * as S from "./styles";

export const err = (e: string, one: string, tow: string) => {
  if (e === "not_valid_address") {
    return (
      <S.ErrContent>
        <S.ErrSpanWeight>{one}</S.ErrSpanWeight> não é um endereço{" "}
        <S.ErrSpan>{tow}</S.ErrSpan> válido.
      </S.ErrContent>
    );
  }

  if (e === "out_of_range") {
    return (
      <S.ErrContent>
        Montante é inferior ao mínimo:{" "}
        <S.ErrSpan>
          {one} {tow}.
        </S.ErrSpan>
      </S.ErrContent>
    );
  }

  if (e === "not_valid_extra_id") {
    return (
      <S.ErrContent>
        <S.ErrSpanWeight>{one}</S.ErrSpanWeight>: Não é um ID extra válido de{" "}
        <S.ErrSpan>{tow}</S.ErrSpan>.
      </S.ErrContent>
    );
  }
};
