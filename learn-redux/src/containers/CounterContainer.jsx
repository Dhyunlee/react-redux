import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff,
    }),
    /*     
      (left, right) => {
        return left.diff === right.diff && left.number === right.number;
      },
      ※ 매번 이렇게 작성해서 비교해주는 것보다 shallowEqual 함수를
        사용하는 것이다. 
        사용법은 shallowEqual를 불러와서 두번째 파라미터에 넣어주면 된다.
    */
    shallowEqual,
  );

  // Container 최적화하는 방법
  // const number = useSelector(state => state.counter.number);
  // const diff = useSelector(state => state.counter.diff);
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
