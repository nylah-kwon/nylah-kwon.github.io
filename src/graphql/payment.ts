import { gql } from 'graphql-tag';

type PayInfo = {
  id: String;
  amount: number;
};

type PaymentInfos = {
  payInfo: PayInfo[];
};
export const EXECUTE_PAY = gql`
  mutation EXECUTE_PAY($info: PaymentInfos) {
    payInfo(info: $info)
  }
`;
