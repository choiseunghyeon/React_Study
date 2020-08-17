import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>현재 값은 {state.value} </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>더하기</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>빼기</button>
    </div>
  );
};

export default Counter;
