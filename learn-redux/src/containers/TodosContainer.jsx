import React, { useCallback } from 'react';
import Todos from '../components/Todos';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo } from './../modules/todos';

function TodosContainer() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const onCreate = useCallback(text => dispatch(addTodo(text)), [dispatch]);
  const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch]);
  // 해당 컴포넌트가 생성될 때마다 onCreate, onToggle를 만들지 않고
  // 재사용하기 위해 useCallback으로 감싸준다. 즉, dispatch될 때만
  // 해당 콜백 함수들이 생성되고 실행됨

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default TodosContainer;
