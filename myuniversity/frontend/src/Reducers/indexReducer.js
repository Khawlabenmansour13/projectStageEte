import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import noteReducer from "./noteReducer";
import notificationSlice from "./notificationSlice";
import sectionSlice from "./sectionSlice";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  user:userReducer,
  notes:noteReducer,
  notifications:notificationSlice,
  section:sectionSlice
});
