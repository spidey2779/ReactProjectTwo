import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { storeAllTodos } from "../redux/todoslice";
const useGetTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const abortController = new AbortController();
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_NODE_URL}/todo/todos`,
          {
            withCredentials: true,
            signal: abortController.signal,
          }
        );
        if (response.data) {
        //   console.log(response.data);
          dispatch(storeAllTodos(response.data));
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
    return () => {
      abortController.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading, error };
};

export default useGetTodo;
