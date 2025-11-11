import { setUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "sonner";

export const logOuthandler = async (dispatch, navigate) => {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
      withCredentials: true,
    });
    if (res.data.success) {
      navigate("/");
      dispatch(setUser(null));
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
};
