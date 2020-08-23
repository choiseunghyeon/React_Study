# Summary

## 4장 이벤트 핸들링 120P부터

### SyntheticEvent 126p

React에서 Event를 사용할 때 종종 event 객체를 사용할 일이 있다.  
네이티브 이벤트와 인터페이스가 같으므로 React없이 순수 자바스크립트에서 HTML Event를 다룰 때와 똑같이 사용하면 된다.  
단, 이벤트가 끝나고 나면 정보가 초기화 되서 참조할 수 없다.

React에서 다음과 같이 이벤트를 사용해보고 log에 찍힌 event객체를 확인하면 프로퍼티의 값이 비어있는걸 확인할 수 있다.
Ex) onChange ={ e=> console.log(e)}  
하지만, 이벤트 발생 시점에 필요한 값을 참조하면 존재한다.  
Ex) onChange ={ e=> console.log(e.target.value)}  
따라서 이벤트가 끝나고도 이벤트 객체를 참조하고 싶다면(예를 들어, 비동기) e.persist() 함수를 호출해주어야 한다.

## 5장 ref:DOM에 이름 달기

## 143p

Vanilla JS, jQuery로 작업할 때는 특정 Element에 스타일 적용, 특정 작업 수행을 위해서 id를 붙여서 작업을 했다.  
react에서 id를 쓸 경우 DOM에 렌더링 할 경우 그대로 전달 된다 하지만 이 id값은 유일(unique)해야 하는데 react에서 작업하다 보면 유일성이 깨질 수 있기 때문에 ref라는 것을 사용한다.

ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하기 때문에 이런 문제가 발생하지 않는다.

## ref를 사용하는 상황

DOM을 꼭 사용해야 하는 경우는

- 특정 input에 포커스 주기
- 스크롤 박스 조작
- Canvas 요소에 그림 그리기 등이 있다.

## 컴포넌트 배열 렌더링 시 Key를 사용해야 하는 이유 162p

```javascript
const list = ["사자", "곰", "악어"].map((name) => <li>{name}</li>);
return <ul>{list}</ul>;
```

위와 같이 컴포넌트 배열을 렌더링하는 경우 고유 key 값을 설정해줘야 한다.
이 key값은 어떤 원소에 변동이 있었는지 알아내기 위해 사용한다. 즉 어떤 변화가 일어났는지 빠르게 알아낼 수 있다.

설정할 고유한 값이 없다면 index를 활용해도 되지만 효율적으로 리렌더링하지 못한다.

```javascript
const list = ["사자", "곰", "악어"].map((name, idx) => (
  <li key={idx}>{name}</li>
));
return <ul>{list}</ul>;
```

## 라이프사이클 컴포넌트가 업데이트 될 때

- props가 바뀔 때
- state가 바뀔 때
- 부모 컴포넌트가 리렌더링될 때
- this.forceUpdate로 강제로 렌더링을 트리거할 때

## 성능 최적화 290p

**React.memo**  
클래스 컴포넌트의 경우 shouldComponentUpdate를 통해 이후의 라이프 사이클을 수행할지 안할지 결정할 수 있지만,  
함수형 컴포넌트의 경우 그럴 수 없기 때문에 React.memo를 사용한다.  
이 함수는 컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않는다.

사용 예

```javascript
import React from "react";

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;
  return (
    <>
      <div className="TodoListItem" onClick={() => onToggle(id)}>
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        X
      </div>
    </>
  );
};

export default React.memo(TodoListItem);
```

**useState 함수형 업데이트**  
setter함수가 상태를 어떻게 업데이트 할지 정의해주는 업데이트 함수를 사용하면 변수의 의존성을 줄일 수 있다.  
보통 리렌더링 될 때 마다 함수가 만들어지는 것을 막기 위해 useCallback hook을 사용한다.  
useCallback에서도 setter함수를 호출할때 기존 state를 사용하기 때문에 useCallback의 의존성에 state 변수를 추가하게 된다.

사용 예  
todos state를 아래의 useCallback 안의 함수에서 사용하고 있기 때문에 todos값이 바뀌면 해당 함수도 다시 만들어주어야 한다.  
따라서 useCallback의 두 번째 파라미터에 의존성을 넣어준다.

```javascript
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "할 일", checked: false },
  ]);
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  return (...) {/*중략 */}
}
```

함수형 업데이트 사용 예  
하지만, 아래와 같이 setter함수에 대체될 변수를 넣어주는게 아니라 상태를 어떻게 업데이트 할지 정의해주는 함수를 넣어준다면 의존성을 없앨 수 있다.
이렇게 되면 해당 함수는 초기에 렌더링 될때만 생성 된다.

```javascript
function App() {
const [todos, setTodos] = useState([
  { id: 1, text: "할 일", checked: false },
]);
const onRemove = useCallback((id) => {
  setTodos((todos) => todos.filter((todo) => todo.id !== id));
}, []);

return (...) {/*중략 */}
}
```

**useReducer 사용**  
useState의 함수형 업데이트를 사용하는 대신에 쓸 수 있는 방법이다.  
성능상 비슷하기 때문에 편한걸로 선택해서 사용하면 된다.

```javascript
function todoReducer(todos, action) {
  switch (action.type) {
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [
  { id: 1, text: "할 일", checked: false },
  ]);
  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

return (...) {/*중략 */}
}
```

## 불변성 유지 immer 318p

setter함수와 immer을 사용하는 것은 다음과 같다.

immer의 produce함수는 두 가지 파라미터를 받는다.  
첫 번째는 수정하고 싶은 상태, 두 번째는 함수이다. 이 함수는 내부에서 값을 원하는대로 변경한다.  
핵심은 불변성에 신경 쓰지 않는 것처럼 코드를 작성하되 불변성 관리를 해준다라고 한다.  
따라서 아래처럼 변수의 값을 직접적으로 변경해주어도 불변성이 유지가 된다.  
ex) draft[name] = value;

```javascript
function App() {
  const [form, setForm] = useState({ name: "", username: "" });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      produce(form, draft => {
        draft[name] = value;
      })
    );
  }, [form]);

return (...) {/*중략 */}
}
```

위의 코드에서 produce는 form 값에 의존적이기 때문에 useCallback에서 form 변수를 의존성에 넣어 주었다.  
이러한 의존성을 없애기 위해서는 useState의 함수형 업데이트를 사용해야 하는데 immer와도 함께 쓰일 수 있다.  
produce의 첫 번째 파라미터에 함수를 넣어주면 업데이트 함수를 반환해 준다.

```javascript
function App() {
  const [form, setForm] = useState({ name: "", username: "" });

   const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(
      produce((draft) => {
        draft[name] = value;
      })
    );
  }, []);
return (...) {/*중략 */}
}
```

## Function as a child 또는 Rnder Props 패턴 396p.

```javascript
import React from 'react';

const RenderPropsSample ({children}) => {
  return <div>children(5)</div>;
}

export default RenderPropsSample

//RenderPropsSample가 위의 코드 처럼 있다면 다른 컴포넌트에서 다음과 같이 사용할 수 있다.
<RenderPropsSample>{value=>value*2}</RenderPropsSample>
```

## Redux 흐름

**상태(state)를 변경할 때**

dispatch에 액션 객체를 넘겨준다.  
dispatch는 액션 객체를 가지고 store의 reducer 함수에게 건내준다.  
reducer는 현재 상태(state)와 액션 객체를 받아서 새로운 상태(state)를 만들어서 return 한다. 새로운 state를 만들때 action객체가 가지고 있는 값을 활용하여 만들 수 있다.  
store의 state가 바뀔 때 마다 구독(subscribe) 하고 있는 함수가 실행된다.

## Redux의 세 가지 규칙 427p

- 단일 스토어
- 읽기 전용 상태  
  상태를 업데이트 할 때는 기존의 객체는 건드리지 않고 새로운 객체를 생성해 주어야 한다.  
  이렇게 불변성을 유지해 주는 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(shallow equality)검사를 하기 때문이다. 깊숙하게 검사하지 않는게 좋은 성능을 유지할 수 있기 때문
- 리듀서는 순수한 함수
  1. 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는다.
  2. 파라미터 외의 값에 의존하면 안된다.
  3. 이전 상태는 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어 반환한다.
  4. 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환한다.

## Container에서 Redux 상태와 dispatch 사용하기 - connect 447p.

```javascript
// 액션 생성 함수
import { increase, decrease } from "../modules/counter";
import { connect } from "react-redux";
const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

const mapStateToProps = (state) => ({
  number: state.counter.number,
});
const mapDispatchToProps = (dispatch) => ({
  increase: () => dispatch(increase()),
  decrease: () => dispatch(decrease()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
```

액션 생성 함수를 호출하고 dispatch로 감싸는 작업이 번거롭다면 bindActionCreators 유틸 함수를 사용하면 간편

```javascript
import { bindActionCreators } from 'redux';
import { increase, decrease } from '../modules/counter';
import { connect } from 'react-redux';

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

export default connect(
  (state) => ({ number: state.counter.number }),
  (dispatch) => bindActionCreators({ increase, decrease }, dispatch),
)(CounterContainer);

또는

// 이런식으로 액션 생성 함수를 객체 형태로 넣어주면 connect함수에서 내부적으로 bindActionCreators 작업을 대신 해준다.
export default connect(
  (state) => ({ number: state.counter.number }),
  { increase, decrease }),
)(CounterContainer);
```

## module(액션 생성 함수, 리듀서) 더 쉽게 작성하기 457p.

기존의 작성 코드

```javascript
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = (num) => ({ type: INCREASE, payload: num });
export const decrease = () => ({ type: DECREASE });

const initialState = {
  number: 0,
};

function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + action.payload,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}

export default counter;
```

redux-actions에서 createAction과 handleActions를 사용한 후

```javascript
import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = createAction(INCREASE, (num) => num);
export const decrease = createAction(DECREASE);

const initialState = {
  number: 0,
};

const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + action.payload }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
);

export default counter;
```

## connect함수 대신 Hooks를 사용하여 스토어에 상태 및 디스패치 가져오기

**액션을 디스패치 하는 함수가 많아지면 468p. 참고**

```javascript
import { increase, decrease } from "../modules/counter";
import { useSelector, useDispatch } from "react-redux";

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  return (
    <Counter
      number={number}
      onIncrease={() => dispatch(increase())}
      onDecrease={() => dispatch(decrease())}
    />
  );
};

export default CounterContainer;
```

하지만 위 컴포너트는 숫자가 바뀌어 컴포넌트가 리렌더링 될 때마다 onIncrease, onDecrase함수가 새로 만들어지므로 useCallback으로 최적화 해주면 좋다.

```javascript
import React, { useCallback } from "react";
import { increase, decrease } from "../modules/counter";
import { useSelector, useDispatch } from "react-redux";

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => {
    dispatch(increase());
  }, [dispatch]);
  const onDecrease = useCallback(() => {
    dispatch(decrease());
  }, [dispatch]);
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
```

## What is Middleware? 476p.

액션을 디스패치했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업들을 실행. 미들웨어는 액션과 리듀서 사이의 중간자  
여러 종류의 작업 처리 가능

- 특정 조건에 따라 액션 무시
- 특정 액션에 기반하여 새로운 액션을 여러번 디스패치 등

## redux-thunk, redux-saga 482p.

두 미들웨어는 비동기 작업을 처리할 떄 가장 많이 사용  
redux-thunk: 객체가 아닌 함수 형태의 액션을 디스패치할 수 있게 해준다.  
redux-saga: 특정 액션이 디스패치되었을 때 정해진 로직에 따라 다른 액션을 디스패치 시키는 규칙을 작성

**redux-saga의 강점**

- 기존 요청 취소 처리할 때(불필요한 중복 요청 방지)
- 웹 소켓을 사용할 때
- 특정 액션이 발생했을 때 다른 액션을 발생시키거나, API 요청 등 리덕스와 관계 없는 코드를 실행할 때
- API 요청 실패 시 재요청해야 할 때

## 코드 스플리팅 522p.

리액트 프로젝트에 별도의 설정이 없다면 A, B, C에 대한 코드가 모두 한 파일에 저장된다.
이렇게 되면 애플리케이션 규모가 커질 경우 당장 필요하지 않은 정보도 가지고 오면서 로딩이 오래 걸린다.
다른 예로, 사용자가 A페이지에 접근할 때 B, C 페이지의 정보는 필요하지 않으므로 A페이지만 우선 로드하도록 한다.

해결 방법으로는 코드 비동기 로딩이 있다.
