import { cn } from "../utils/cn";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import useGetTodo from "../hooks/useGetTodo";
import { FormEvent, useState } from "react";
import axios from "axios";
import { deleteTodo, pushTodo, Todo, updateTodo } from "../redux/todoslice";
const TodoContainer = () => {
  const [text, setText] = useState("");
  const [savingTodo, setSavingTodo] = useState(false);
  const { todos } = useAppSelector((state) => state.todoReducer);
  const dispatch = useAppDispatch();
  const { isLoading } = useGetTodo();

  const addTodoHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      alert("please enter todo");
      return;
    }
    setSavingTodo(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_NODE_URL}/todo/todos`,
        {
          text,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        // console.log(response.data);
        dispatch(pushTodo(response.data));
        setText("");
        alert("todo added successfully");
        return;
      }
    } catch (err) {
      alert("something went wrong");
    } finally {
      setSavingTodo(false);
    }
  };
  const deleteTodoHandler = async (id: string | number) => {
    setSavingTodo(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_NODE_URL}/todo/todos/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        dispatch(deleteTodo(id));
        alert("todo deleted successfully");
        return;
      }
    } catch (err) {
      alert("something went wrong");
    } finally {
      setSavingTodo(false);
    }
  };
  const todoUpdateHandler = async (todo: Todo) => {
    setSavingTodo(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_NODE_URL}/todo/todos`,
        {
          text: todo.text,
          id: todo.id,
          isCompleted: !todo.isCompleted,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        dispatch(updateTodo(response.data));
        alert("todo updated successfully");
        return;
      }
    } catch (err) {
      alert("something went wrong");
    } finally {
      setSavingTodo(false);
    }
  };
  if (isLoading) return <div>Loading..</div>;
  return (
    <ul
      className={cn(
        "bg-white p-5 w-[40rem] shadow-md flex flex-col gap-4 rounded"
      )}
    >
      <form className={cn("flex self-center gap-3 ")} onSubmit={addTodoHandler}>
        <input
          type="text"
          placeholder="Enter Todo"
          className={cn("p-2 border-2 w-[15rem]")}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className={cn(
            "bg-emerald-500 text-white rounded py-2 px-4 disabled:opacity-40 disabled:cursor-not-allowed"
          )}
          disabled={savingTodo}
          type="submit"
        >
          Add
        </button>
      </form>
      {todos.length === 0 && (
        <p className={cn("text-center")}>No todos yet..</p>
      )}
      {todos?.map((todo) => {
        return (
          <li
            key={todo.id}
            className={cn(
              "flex justify-between items-center border-2 rounded p-2"
            )}
          >
            <span className={cn("text-lg font-semibold")}>{todo.text}</span>
            <div className={cn("flex gap-3")}>
              <input
                type="checkbox"
                className={cn("h-5 w-5 cursor-pointer")}
                onChange={() => todoUpdateHandler(todo)}
                checked={todo.isCompleted}
              />
              <button
                className={cn("text-red-500 text-xl")}
                onClick={() => deleteTodoHandler(todo.id)}
              >
                <RiDeleteBin5Fill />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoContainer;
