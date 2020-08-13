# 4장 이벤트 핸들링 120P부터

### SyntheticEvent 126p

React에서 Event를 사용할 때 종종 event 객체를 사용할 일이 있다.  
네이티브 이벤트와 인터페이스가 같으므로 React없이 순수 자바스크립트에서 HTML Event를 다룰 때와 똑같이 사용하면 된다.  
단, 이벤트가 끝나고 나면 정보가 초기화 되서 참조할 수 없다.

React에서 다음과 같이 이벤트를 사용해보고 log에 찍힌 event객체를 확인하면 프로퍼티의 값이 비어있는걸 확인할 수 있다.
Ex) onChange ={ e=> console.log(e)}  
하지만, 이벤트 발생 시점에 필요한 값을 참조하면 존재한다.  
Ex) onChange ={ e=> console.log(e.target.value)}  
따라서 이벤트가 끝나고도 이벤트 객체를 참조하고 싶다면(예를 들어, 비동기) e.persist() 함수를 호출해주어야 한다.
