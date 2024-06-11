/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

import { MdKeyboardArrowUp as UpArrow } from "react-icons/md";
import { MdKeyboardArrowDown as DownArrow } from "react-icons/md";
import Action from "./Action";
const actionClass =
  "p-2 cursor-pointer text-[.8rem] bg-zinc-400 text-white rounded-md font-semibold";
const Comment = ({
  comment,
  handleDeleteNode,
  handleEditNode,
  handleInsertNode,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditmode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);
  const onAddCommentHandler = () => {
    if (input.trim().length === 0 & !editMode) {
      alert("Please enter a comment");
      return;
    }
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setInput("");
      setShowInput(false);
    }
    if (editMode) {
      setEditmode(false);
    }
  };
  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };
  const deleteHandler = () => {
    handleDeleteNode(comment.id);
  };
  return (
    <div>
      <div
        className={
          comment.id === 1
            ? "flex items-center justify-between gap-3 w-[20rem] m-10 "
            : " bg-zinc-200 font-semibold m-3  px-4 rounded-lg w-fit py-3"
        }
      >
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              autoFocus
              placeholder="type..."
              className="p-2 border-2 border-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onAddCommentHandler();
                }
              }}
            />

            <Action
              handleClick={onAddCommentHandler}
              className={
                "py-2 bg-sky-600 rounded-md text-white px-4 cursor-pointer"
              }
              type="COMMENT"
            />
          </>
        ) : (
          // eslint-disable-next-line react/prop-types
          <>
            <span
              className="break-words text-xl font-semibold  px-2 py-1 "
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
            >
              {comment.name}
            </span>
            <div className="flex  mt-3 gap-3 items-center ">
              {editMode ? (
                <>
                  <Action
                    type={"SAVE"}
                    className={actionClass}
                    handleClick={onAddCommentHandler}
                  />
                  <Action
                    type={"CANCEL"}
                    className={actionClass}
                    handleClick={() => {
                      inputRef.current.innerText = comment.name;
                      setEditmode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    type={<>{expand ? <UpArrow /> : <DownArrow />} REPLY</>}
                    className={`flex gap-1 ${actionClass} `}
                    handleClick={handleNewComment}
                  />
                  <Action
                    type={"EDIT"}
                    className={actionClass}
                    handleClick={() => setEditmode(true)}
                  />
                  <Action
                    type={"DELETE"}
                    className={actionClass}
                    handleClick={deleteHandler}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="pl-10 " style={{ display: expand ? "block" : "none" }}>
        {showInput && (
          <div className="flex items-center">
            <input
              type="text"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              className="p-2 border-2 border-black"
            />
            <Action
              type={"REPLY"}
              className={`${actionClass} ml-5`}
              handleClick={onAddCommentHandler}
            />
            <Action
              type={"CANCEL"}
              className={`${actionClass} ml-3`}
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) {
                  setExpand(false);
                }
              }}
            />
          </div>
        )}
        {comment?.items?.map((item) => {
          //   console.log(item);
          return (
            <Comment
              comment={item}
              key={item.id}
              handleDeleteNode={handleDeleteNode}
              handleEditNode={handleEditNode}
              handleInsertNode={handleInsertNode}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
