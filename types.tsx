/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams, ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Asset } from 'expo-media-library';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type PlantPropertyModalParams = {
  setPlantProperties: (properties: plantProperty[]) => void;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AddPlantModal: undefined;
  EditPlantModal: plantState | undefined;
  EditSeedModal: seedState | undefined;
  NotFound: undefined;
  PropertyModal: NavigatorScreenParams<PlantPropertyModalParams>;
  PlantDetailScreen: { id: string };
  SeedDetailScreen: { id: string };
  SeedScreen: undefined;
  AddSeedModal: undefined;
};

export interface ParamList extends ParamListBase {
  DetailScreenParams: { id: string };
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Plants: undefined;
  Seeds: undefined;
  PlantDetailScreen: { id: string };
  SeedDetailScreen: { id: string };
  EditSeedModal: seedState | undefined;
  EditPlantModal: plantState | undefined;
  PlantListItem: undefined;
  SeedScreen: undefined;
  AddSeedModal: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type plantPropertyWeight = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type plantProperty = {
  title: string;
  note: string;
  weight: plantPropertyWeight;
  inheritance: 'dominant' | 'recessive' | undefined;
  uuid: string;
};

export type plantState = {
  title: string;
  startDate: Date | undefined;
  flowerDate: Date | undefined;
  harvestDate: Date | undefined;
  note: string;
  strain: string;
  uuid: string;
  father: string;
  mother: string;
  images: Asset[];
  properties: plantProperty[];
};
export type seedState = {
  title: string;
  amount: number;
  harvestDate: Date | undefined;
  note: string;
  strain: string;
  breeder: string;
  uuid: string;
  father: string;
  mother: string;
  type: SeedType;
};

export type SeedType = 'feminized' | 'regular' | 'autoflowering' | undefined;

export type plantsReducer = plantState[];

export type seedsReducer = seedState[];
export interface rootState {
  plants: plantsReducer;
  seeds: seedsReducer;
}
