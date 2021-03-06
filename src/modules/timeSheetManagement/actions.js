import * as Types from "./types";
import { createRequestTypes, createAction } from "../../utils/requestTypes";
import { apiUrl } from "../../utils/apiUrl";
import { pushSnackbarAction } from "../layout/actions";
import API from "../../utils/api";

export const GET_LOCATION_INFORMATION = createRequestTypes(
  Types.GET_LOCATION_INFORMATION
);
export const GET_CHARGECODE_INFORMATION = createRequestTypes(
  Types.GET_CHARGECODE_INFORMATION
);

export const getLocation = (config, data = {}) =>
  createAction(
    GET_LOCATION_INFORMATION.REQUEST,
    { Option: "Main" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.location,
      params: data,
      ...config,
    }
  );

export const getChargeCode = (config, data = {}) =>
  createAction(
    GET_CHARGECODE_INFORMATION.REQUEST,
    { Option: "Main" },
    {
      method: "POST",
      url: apiUrl.eHRService.common.chargecode,
      params: data,
      ...config,
    }
  );

export const addChargeCode = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.chargecode, {
      ChargeCode_Name: values.ChargeCode_Name ? values.ChargeCode_Name : "",
      Description: values.Description ? values.Description : "",
      Option: "Add",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const updateChargeCode = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.chargecode, {
      ChargeCode_id: values.ChargeCode_id ? values.ChargeCode_id : "",
      ChargeCode_name: values.ChargeCode_Name ? values.ChargeCode_Name : "",
      Description: values.Description ? values.Description : "",
      Option: "Update",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const deleteChargeCode = async (id) => {
  return API()
    .post(apiUrl.eHRService.common.chargecode, {
      ChargeCode_id: id ? id : "",
      Option: "Delete",
    })
    .then((response) => {
      pushSnackbarAction("success", "delete success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const addLocation = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.location, {
      Location_Name: values.Location_Name ? values.Location_Name : "",
      Description: values.Description ? values.Description : "",
      Option: "Add",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "add success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const updateLocation = async (values) => {
  return API()
    .post(apiUrl.eHRService.common.location, {
      Location_id:values.Location_id?values.Location_id:"",
      Location_Name: values.Location_Name ? values.Location_Name : "",
      Description: values.Description ? values.Description : "",
      Option: "Update",
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction("success", "update success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};

export const deleteLocation = async (id) => {
  return API()
    .post(apiUrl.eHRService.common.location, {
      Location_id: id ? id : "",
      Option: "Delete",
    })
    .then((response) => {
      pushSnackbarAction("success", "delete success");
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      pushSnackbarAction("error", "Server Error.");
      return { status: "fail" };
    });
};