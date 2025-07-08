const BASE_URL = "http://localhost:1000";

export const API = {
  LOGIN: `${BASE_URL}/api/v1/log-in`,
  SIGNUP: `${BASE_URL}/api/v1/sign-in`,
  GET_ALL_TASKS: `${BASE_URL}/api/v2/get-all-tasks`,
  GET_COMPLETED_TASKS: `${BASE_URL}/api/v2/get-complete-tasks`,
  GET_IMPORTANT_TASKS: `${BASE_URL}/api/v2/get-imp-tasks`,
  GET_INCOMPLETE_TASKS: `${BASE_URL}/api/v2/get-incomplete-tasks`,
  UPDATE_COMPLETE_TASK: `${BASE_URL}/api/v2/update-complete-task`,
  UPDATE_IMPORTANT_TASK: `${BASE_URL}/api/v2/update-imp-task`,
  DELETE_TASK: `${BASE_URL}/api/v2/delete-task`,
  CREATE_TASK: `${BASE_URL}/api/v2/create-task`,
  UPDATE_TASK: `${BASE_URL}/api/v2/update-task`,
};
