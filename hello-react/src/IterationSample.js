import React, { useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5);
  const nameList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
  ));
  const onChange = (e) => {
    setInputText(e.target.value);
  };
  const onClick = () => {
    setNames(names.concat({ id: nextId, text: inputText }));
    setInputText("");
    setNextId(nextId + 1);
  };
  const onRemove = (id) => {
    let newNames = names.filter((name) => id !== name.id);
    setNames(newNames);
  };
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );
};

export default IterationSample;
