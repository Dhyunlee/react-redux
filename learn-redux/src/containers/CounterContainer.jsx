import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  const { number, diff } = useSelector(state => ({
    // 여기 파라미터로 전달된 state는 리덕스의 현재 state이다.
    number: state.counter.number,
    diff: state.counter.diff,
  }));

  const dispatch = useDispatch();

  // 디스패치하는 함수들 생성
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
