export interface Props {
  id?: string;
}

export interface NameCoin {
  from: string;
  to: string;
}

export interface Date {
  updated: string;
  created: string;
  deposit: string;
}

export interface Status {
  status: string;
  payoutAddress: string;
  payoutExtraId?: string;
  fromCurrency: string;
  toCurrency: string;
  id: string;
  expectedSendAmount: number;
  expectedReceiveAmount: number;
  amountSend: number;
  nameCoin: NameCoin;
  updatedAt: string;
  createdAt: string;
  depositReceivedAt: string;
}
