import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { useHistory } from "react-router-dom";
import {
  State,
  Coins,
  Flow,
  SelectedCoin,
  EstimatedAmount,
  MinAmount,
} from "./types";

import { api } from "../../services/api";

export const ListCoinValueContext = createContext<State>({} as State);

export const ListCoinValueProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [coins, setCoins] = useState<Coins[]>([]);
  const [marketInfo, setMarketInfo] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<SelectedCoin>({
    from: "btc",
    to: "eth",
  });
  const [minAmount, setMinAmount] = useState(0);
  const [estimatedAmount, setEstimatedAmount] = useState(0);
  const [sendAmount, setSendAmount] = useState("");
  const [flow, setFlow] = useState<Flow>({
    amount: "0",
    from: "btc",
    to: "eth",
  });
  const [idExternal, setIdExternal] = useState(false);

  useEffect(() => {
    async function loadCoins() {
      const response = await api.get<Coins[]>(
        `/currencies?active=true`
      );
      setCoins(response.data);
    }
    loadCoins();
  }, []);

  useEffect(() => {
    async function marketValidation() {
      const response = await api.get(
        `/market-info/available-pairs/?includePartners=false`
      );
      setMarketInfo(response.data);
    }
    marketValidation();
  }, []);

  useEffect(() => {
    const { from, to } = selectedCoin;

    async function minAmount() {
      const response = await api.get<MinAmount>(
        `/min-amount/${from}_${to}`
      );

      const data = {
        amount: String(response.data.minAmount * 2),
        from,
        to,
      };

      const external = coins.filter(
        (item) => to === item.ticker && item.hasExternalId
      );

      setMinAmount(response.data.minAmount);
      setFlow({ ...data });
      setSendAmount(data.amount);
      setIdExternal(Boolean(external[0]));
    }

    const market = marketInfo.filter(
      (fromTo) => fromTo === `${from}_${to}` && fromTo
    );

    if (market[0]) {
      minAmount();
    }
  }, [coins, selectedCoin, marketInfo]);

  useEffect(() => {
    const { amount, from, to } = flow;

    async function exchangeAmount() {
      const response = await api.get<EstimatedAmount>(
        `/exchange-amount/${amount}/${from}_${to}/?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setEstimatedAmount(response.data.estimatedAmount);
    }

    if (Number(amount) !== 0) {
      exchangeAmount();
    }
  }, [flow]);

  function handlaSelectedCoin(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    const { from, to } = flow;

    if (name === "from" && value === to) {
      setSelectedCoin({
        ...selectedCoin,
        to: from,
        [name]: value,
      });
    } else if (name === "to" && value === from) {
      setSelectedCoin({
        ...selectedCoin,
        from: to,
        [name]: value,
      });
    } else {
      setSelectedCoin({ ...selectedCoin, [name]: value });
    }
  }

  function handlaSendValue(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (value === "") {
      setFlow({ ...flow, amount: "0" });
      setSendAmount("");
    } else if (Number(value) || Number(value) === 0) {
      setSendAmount(value);
      setFlow({ ...flow, amount: value });
    }
  }

  function handlaExchange() {
    setSelectedCoin({
      ...selectedCoin,
      from: flow.to,
      to: flow.from,
    });
  }

  function handlaSubmit(event: FormEvent) {
    event.preventDefault();

    const { amount, from, to } = flow;

    if (Number(flow.amount) >= minAmount) {
      history.push(`/trocar/${amount}/${from}/${to}`);
    }
  }

  const value = {
    coins,
    minAmount,
    estimatedAmount,
    flow,
    setFlow,
    selectedCoin,
    setSelectedCoin,
    handlaSendValue,
    handlaSelectedCoin,
    handlaExchange,
    idExternal,
    handlaSubmit,
    sendAmount,
    setSendAmount,
  };

  return (
    <ListCoinValueContext.Provider value={value}>
      {children}
    </ListCoinValueContext.Provider>
  );
};

export const useListCoinValueContext = () => {
  const context = useContext(ListCoinValueContext);
  return context;
};
