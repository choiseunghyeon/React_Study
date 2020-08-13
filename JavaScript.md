## 비구조화 할당

배열

```javascript
let arr = [1, 2];
let one = arr[0];
let two = arr[1];
```

```javascript
let arr = [1, 2];
let [one, two] = arr;
```

객체

```javascript
let obj = { name: "choi", skill: "react" };
let name = obj.name;
let skill = obj.skill;
```

```javascript
let obj = { name: "choi", skill: "react" };
let { name, skill } = obj;
```

## 변수에 따라 객체 key 설정

```javascript
const name = "choi";
const obj = {
    [name]: "value"
}
-> 결과 { choi: "value" }
```
