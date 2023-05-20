import { store } from "../redux";
const UnitsValidation = () => {
  const remainingUnits =
    Number(store.getState()?.registerUser.selectedTileData.smallerUnitArea) -
    Number(store.getState()?.registerUser.selectedTileData.soldSmallUnits);

  const finalReturn =
    Number(store.getState()?.registerUser?.selectedTileData?.units) < 1 ||
    !store.getState()?.registerUser?.selectedTileData?.units
      ? false
      : Math.floor(
          Number(
            store.getState()?.registerUser?.selectedTileData?.soldPercentage
          )
        ) == 100
      ? false
      : Number(
          Math.floor(
            Number(
              store.getState()?.registerUser?.selectedTileData?.soldPercentage
            )
          )
        ) < 100 &&
        Number(store.getState()?.registerUser?.selectedTileData?.units) >
          remainingUnits
      ? true
      : Number(
          Math.floor(
            Number(
              store.getState()?.registerUser?.selectedTileData?.soldPercentage
            )
          )
        ) < 100 &&
        remainingUnits ==
          Number(store.getState()?.registerUser?.selectedTileData?.units)
      ? true
      : true;

  return finalReturn;
};

export { UnitsValidation };
