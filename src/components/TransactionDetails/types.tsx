export interface Props {
  id: string;
}

export interface NameCoin {
  from: string;
  to: string;
}

export interface Status {
  status: string;
  payinAddress: string;
  payinExtraId?: string;
  payoutAddress: string;
  payoutExtraId?: string;
  fromCurrency: string;
  toCurrency: string;
  id: string;
  updatedAt: string;
  expectedSendAmount: number;
  expectedReceiveAmount: number;
  createdAt: string;
  amountSend: number;
  nameCoin: NameCoin;
}
