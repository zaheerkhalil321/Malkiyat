import { Dispatch } from "redux";
import { DocumentsI, PropertyAllDataI } from "@src/services/model";
import { UnRegUserType } from "../action-types";
import { UnRegisterUserAction } from "../actions/unregisteruser";
/**
 * @param  {PropertyDetailI[]} data
 */
export const allPropertyDataSave = (data: PropertyAllDataI) => {
  return (dispatch: Dispatch<UnRegisterUserAction>) => {
    dispatch({
      type: UnRegUserType.ALL_PROPERTY_DATA,
      payload: data,
    });
  };
};

export const saveDoucmentDetail = (data: DocumentsI[]) => {
  return (dispatch: Dispatch<UnRegisterUserAction>) => {
    dispatch({
      type: UnRegUserType.GET_DOCUMENT_BY_ID,
      payload: data,
    });
  };
};
