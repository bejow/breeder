/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AddPlantModal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Plants: undefined;
  Seeds: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type plantState = {
  title: string;
  startDate: string;
  flowerDate: string;
  harvestDate: string;
  note: string;
  strain: string;
  uuid: string;
  father: string;
  mother: string;
  properties: [string];
};
export type seedState = {
  title: string;
  amount: number;
  harvestDate: string;
  note: string;
  strain: string;
  uuid: string;
  father: string;
  mother: string;
  properties: [string];
};
export type plantsReducer = [plantState];
export type seedsReducer = [seedState];
export interface rootState {
  plants: plantsReducer;
  seeds: seedsReducer;
}
