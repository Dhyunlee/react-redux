import { legacy_createStore as createStore } from 'redux';
// import { createStore } from 'redux';

// 버전업이 되어 버전을 다운그레이드 하거나
// 위와 같이 import 해줘야한다.

// createStore는 스토어를 만들어주는 함수이다.
// 리액트 프로젝트에서는 단 하나의 스토어를 만든다.

/* 리덕스에서 관리 할 상태 정의 */
const initialState = {
  counter: 0,
  text: '',
  list: [],
};

/* 액션 타입 정의 */
// 액션 타입은 주로 대문자로 작성한다.
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

/* 액션 생성함수 정의 */
// 액션 생성함수는 주로 camelCase 로 작성한다.
function increase() {
  return {
    type: INCREASE, // 액션 객체에는 type 값이 필수이다.
  };
}

// 화살표 함수로 작성하는 것이 더욱 코드가 간단하기에,
// 이렇게 쓰는 것을 추천!
const decrease = () => ({
  type: DECREASE,
});

const changeText = text => ({
  type: CHANGE_TEXT,
  text, // 액션안에는 type 외에 추가적인 필드를 마음대로 넣을 수 있다.
});

const addToList = item => ({
  type: ADD_TO_LIST,
  item,
});

/* 리듀서 만들기 */
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수를 만들어보자!
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 한다.!

function reducer(state = initialState, action) {
  /* 
    state 의 초깃값을 initialState 로 지정한다.
    이렇게 기본 매개변수로 초깃값(= initialState)을 지정하지 않으면 
    state에 undefined가 되어 default에서 undefined로 리턴되어 초기 
    상태가 만들어지지 않으므로 주의해야한다.
  */
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

/* 스토어 만들기 */
const store = createStore(reducer);
console.log(store.getState()); // 현재 store 안에 들어있는 상태를 조회한다.

// 스토어에 구독하기 위해 listener 함수를 생성한다.
// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
  const state = store.getState();
  console.log(state);
};

// 구독해주려면 아래와 같이 작성
const unsubscribe = store.subscribe(listener);
// → 구독을 해제하고 싶을 때는 unsubscribe() 를 호출하면된다.
//   unsubscribe 함수를 호출하면 디스패치하면 변화는 되지만 콘솔에 확인할 수 없다.
//   즉, listener 함수가 호출되지 않는다.

// 액션들을 디스패치(= 상태 변경) 하자!
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(addToList({ id: 1, text: '와우' }));

// 디스패치가 될 때 마다 listener 함수가 호출되어
// 콘솔에 현재 상태가 출력된다.

/* 
  전역 객체에 담아서 디스패치 실습하기
  전역 객체에 담으면 store 인스턴스를 콘솔에서 사용 가능

  window.store = store;
  콘솔에 아래와 같이 한번 입력해서 디스패치를 되도록 해보자!
  store.dispatch({type: 'INCREASE'})
*/
