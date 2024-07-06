import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string | number;
  isCompleted?: boolean;
  text: string;
}
export interface sliceType {
  todos: Todo[];
}
const initialState: sliceType = {
  todos: [],
};
const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    storeAllTodos: (state, { payload }: PayloadAction<Todo[]>) => {
      state.todos = payload;
    },
    pushTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, { payload }: PayloadAction<string | number>) => {
      state.todos=state.todos.filter((item) => item.id !== payload);
    },
    updateTodo: (state, { payload }: PayloadAction<Todo>) => {
      state.todos=state.todos.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },
  },
});

export const { pushTodo, storeAllTodos, deleteTodo, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
