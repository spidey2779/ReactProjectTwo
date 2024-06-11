import { useState } from "react";
import Comment from "./component/Comment";
import useNode from "./hooks/useNode";
const comments = {
  id: 1,
  items: [
    // {
    //   id: 1677252427307,
    //   name: "hello",
    //   items: [
    //     {
    //       id: 1677252434572,
    //       name: "hello world",
    //       items: [{ id: 1677252449713, name: "hello world 123", items: [] }],
    //     },
    //   ],
    // },
    // {
    //   id: 1677252457839,
    //   name: "react js",
    //   items: [{ id: 1677252468098, name: "javascript", items: [] }],
    // },
  ],
};

const App = () => {
  const [commentsData, setCommentsData] = useState(comments);
  const { insertNode, editNode, deleteNode } = useNode();
  const handleInsertNode = (folderId, item) => {
    const finalStructrue = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructrue);
  };
  const handleEditNode = (folderId, item) => {
    const finalStructrue = editNode(commentsData, folderId, item);
    setCommentsData(finalStructrue);
  };
  const handleDeleteNode = (folderId) => {
    const finalStructrue = deleteNode(commentsData, folderId);
    const temp = { ...finalStructrue };
    setCommentsData(temp);
  };
  return (
    <div>
      <Comment comment={commentsData}
      handleDeleteNode={handleDeleteNode}
      handleEditNode={handleEditNode}
      handleInsertNode={handleInsertNode}
      />
    </div>
  );
};

export default App;
