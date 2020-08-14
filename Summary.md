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
