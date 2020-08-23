# React_Study

## from yarn to npm

책에서는 패키지 관리를 위히 yarn을 쓰고 있지만 이미 익순한 npm이 더 편하기 때문에 yarn명령어를 npm으로 바꿔서 기록

리액트 프로젝트 만들기  
yarn create react-app <프로젝트 이름> -> npm init react-app <프로젝트 이름>

리액트 개발 서버 구동  
yarn start -> npm start

패키지 다운로드  
yarn add node-sass -> npm i node-sass

프로젝트 빌드  
yarn build -> npm run build

package.json 파일 생성  
yarn init -y -> npm init -y

## VS Code Tip

ESLint는 문법 검사 도구, Prettier는 코드 스타일 자동 정리 도구  
ESLint와 Prettier 적용하기 - 77p

## Prettier 및 jsconfig.json 설정(프로젝트 최상위 디렉토리 생성)

.prettierrc

{  
"singleQuote": true,  
"semi": true,  
"useTabs": false,  
"tabWidth": 2,  
"trailingComma": "all",  
"printWidth": 80  
}

jsconfig.json - // import하는 컴포넌트 파일이 열려 있지 않아도 자동 완성

{  
 "compilerOptions": {  
 "target": "es6"  
 }  
}

## Redux DevTools 445p.

크롬 확장 프로그램으로 브라우저에서 리덕스 개발자 도구를 지원한다.  
npm i redux-devtools-extension

적용  
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());
