import axios from "axios";

export const checkUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_NODE_URL}/user/auth`,
      {
        withCredentials: true,
      }
    );
    if (response.data) {
      return response.data;
    } else {
      return;
    }
  } catch (error) {
    // console.error(error);
    return;
  }
};
