import React, {
  createContext,
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";
import { Props, State, Success } from "./types";

import { useListCoinValueContext } from "../ListCoinValueContext";
import { api } from "../../services/api";

const ExchangeContext = createContext<State>({} as State);

export const ExchangeProvider: React.FC<Props> = ({ ...props }) => {
  const {
    flow,
    setFlow,
    setSelectedCoin,
    minAmount,
    setSendAmount,
  } = useListCoinValueContext();
  const history = useHistory();
  const [payoutAddress, setPayoutAddress] = useState("");
  const [extraId, setExtraId] = useState("");
  const [propsSelectedCoin, setPropsSelectedCoin] = useState(false);
  const [propsFlow, setPropsFlow] = useState(false);

  const [confirmTransaction, setConfirmTransaction] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<Success | null>({} as Success);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const { amount, from, to } = props.dataURL;

    let checkerFow =
      Number(flow.amount) > 0 && Number(flow.amount) / 2 === minAmount;

    function setFromToProps() {
      setPropsSelectedCoin(true);
      setSelectedCoin({ from, to });
    }

    function setPropsToFlow() {
      setPropsFlow(true);
      setFlow({ amount, from, to });
      setSendAmount(amount);
    }

    !propsSelectedCoin && setFromToProps();
    !propsFlow && checkerFow && setPropsToFlow();
  }, [
    props.dataURL,
    propsSelectedCoin,
    propsFlow,
    flow,
    setFlow,
    setSelectedCoin,
    minAmount,
    setSendAmount,
  ]);

  useEffect(() => {
    const { amount, from, to } = props.dataURL;

    if (propsFlow) {
      if (`${from}_${to}` !== `${flow.from}_${flow.to}`) {
        history.push(`/trocar/${flow.amount}/${flow.from}/${flow.to}`);
        setPayoutAddress("");
        setExtraId("");
      } else if (Number(flow.amount) !== Number(amount)) {
        history.push(`/trocar/${flow.amount}/${flow.from}/${flow.to}`);
      }
    }
  }, [propsFlow, props.dataURL, flow, history]);

  useEffect(() => {
    if (success?.id) {
      history.push(`/transacao/${success.id}`);
    }

    if (error) {
      setSpinner(false);
    }
  }, [flow, success, history, error]);

  function handlaPayoutAddress(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setPayoutAddress(value);
  }

  function handlaExtraId(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setExtraId(value);
  }

  function handlaClick() {
    if (payoutAddress) {
      if (confirmTransaction) {
        success?.id && setSuccess(null);
        setConfirmTransaction(false);
        setError("");
      } else {
        setConfirmTransaction(true);
      }
    }
  }

  function handlaSubmit(event: FormEvent) {
    event.preventDefault();
    setSpinner(true);

    const { amount, from, to } = flow;

    const data = {
      from,
      to,
      amount,
      address: payoutAddress,
      extraId: extraId ? extraId : "",
    };

    if (payoutAddress && Number(flow.amount) >= minAmount) {
      api
        .post<Success>(
          `/transactions/${process.env.REACT_APP_API_KEY}`,
          data
        )
        .then((response) => {
          setSuccess(response.data);
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    }
  }

  const value = {
    propsFlow,
    payoutAddress,
    extraId,
    handlaPayoutAddress,
    handlaExtraId,
    handlaSubmit,
    confirmTransaction,
    handlaClick,
    error,
    spinner,
    setSpinner,
  };

  return (
    <ExchangeContext.Provider value={value}>
      {props.children}
    </ExchangeContext.Provider>
  );
};

export const useExchangeContext = () => {
  const context = useContext(ExchangeContext);
  return context;
};
