import { IDrink } from "./api";

export type RootStackTypes = {
  ListScreen: undefined;
  DetailsScreen: { item: IDrink };
};
