import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateTransactionInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTransaction: Transaction;
  transact: Transaction;
};


export type MutationCreateTransactionArgs = {
  createTransactionInput: CreateTransactionInput;
};


export type MutationTransactArgs = {
  amount: Scalars['Int'];
  currency: Scalars['String'];
  from: Scalars['String'];
  to: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  transaction: Transaction;
  transactions: Array<Transaction>;
};


export type QueryTransactionArgs = {
  id: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  FIAT: Scalars['Float'];
  chain: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  currencyType: Scalars['String'];
  fiatTransactioId: Maybe<Scalars['String']>;
  from: Maybe<Scalars['String']>;
  gas: Maybe<Scalars['String']>;
  id: Scalars['String'];
  payerId: Scalars['String'];
  receiverAddress: Scalars['String'];
  receiverVPA: Scalars['String'];
  status: Scalars['String'];
  txnHash: Maybe<Scalars['String']>;
};

export type GetTransactionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTransactionQuery = { __typename?: 'Query', transaction: { __typename?: 'Transaction', id: string, from: string | null, status: string, fiatTransactioId: string | null, txnHash: string | null, chain: string | null, gas: string | null, currency: string, FIAT: number } };


export const GetTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fiatTransactioId"}},{"kind":"Field","name":{"kind":"Name","value":"txnHash"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"gas"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"FIAT"}}]}}]}}]} as unknown as DocumentNode<GetTransactionQuery, GetTransactionQueryVariables>;