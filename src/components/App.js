// 함수형 컨포넌트를 사용하므로 useState를 사용
// this.state는 클래스 컴포넌트에서 사용, useState는 함수형 컴포넌트에서 사용
import React, { useState } from "react";
import "../styles/App.css"
import Todo from "./Todo.js"



// React의 루트 컴포넌트 App. 시작시 최초 호출
function App() {
  // useState의 상태변수배열 & 호출시 상태변수값 변화시키는 함수(setter함수) 설정, 초기화
  const [todos, setTodos] = useState([
    { id: 1, text: "", isDone: false },
  ]);

  // state 업데이트 함수 ////

  // 새로운 Todo 추가
  // id는 todos배열을 리스트로 랜더링할때 key값으로 쓸거라 고유값으로 설정.
  const addTodo = () => {
    const newTodo = { id: Date.now(), text: "", isDone: false };
    setTodos([...todos, newTodo]);
  };

  // Todo 업데이트
  // 스프레드 연산자로 나머지 속성은 그대로 두고, text속성만 변경처리함
  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  // Todo 상태 변경
  const toggleTodoDone = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  // Todo 삭제
  const deleteTodo = (id) => {
    //js의 filter 메서드. 콜백함수가 true 반환하는 요소만 포함된 배열 반환
    setTodos(todos.filter(todo => todo.id !== id));
  };


  // JSX 문법 사용으로 UI 반환 /////////

  // map으로 todos 배열 순회 -> todos 배열의 요소개수만큼 <Todo /> 컴포넌트를 생성해서 반환
  // todo.id를 key값(리스트 렌더링에 필수!)으로 사용(고유값으로 씀)
  // 부모(App)컴포넌트가 자식컴포넌트(<Todo />)에게 부모의 함수를 props로 전달해야함
  // => 그래야 자식컴포넌트가 부모컴포넌트의 상태 조작 가능
  return (
    <main className="main">
      <header className="header">
        <h1>Todo's App</h1>
        <button className="plus-todo" onClick={addTodo}>
          새로운 TODO 추가하기
        </button>
      </header>
      <div className="todo-list">
        {todos.map(todo => ( 
          <Todo
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            toggleTodoDone={toggleTodoDone}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </main>
  );
}

// App 컴포넌트를 index.js에서 모듈로 불러올 수 있도록 하기 <- 없으면 에러뜸
export default App;
