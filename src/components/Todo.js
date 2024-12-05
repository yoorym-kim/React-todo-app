import React, { useState } from "react";
import '../styles/todo.css';

// svg를 상대경로로 불러올 경우 import 해줘야함
import changeIcon from '../assets/write.svg'
import deleteIcon from '../assets/delete.svg'


function Todo({ todo, updateTodo, toggleTodoDone, deleteTodo }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
    <div className={`todo ${todo.isDone ? "done" : ""}`}>
        <input
        type="checkbox"
        className="check-todo"
        checked={todo.isDone}
        onChange={() => toggleTodoDone(todo.id)}
        />


        {/* 상태변수 isEditing의 값에 따라 조건부 렌더링 !!!!!!!! */}
        {isEditing ? (
        <input
            className="input-todo clicked"
            value={todo.text}
            // onChange일때 사용자 입력값을 이벤트 타겟 value로 가져오기
            onChange={(e) => updateTodo(todo.id, e.target.value)}
            //onBlur일때 상태변수 바꿔주기
            onBlur={() => setIsEditing(false)}
            //onkeydown 중 enter누를때,,
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            // input 렌더링시(isEditing이 true일때) 포커스 되도록 !!
            autoFocus
        />
        ) : (
        <span
            className={`input-todo ${todo.isDone ? "done" : ""}`}
            onClick={() => setIsEditing(true)}
        >
            {/* || 연산자: Falsy 값(빈문자열)을 만나면 뒤쪽 값을 반환(space holder처럼) */}
            {todo.text || "클릭하여 작성"}
        </span>
        )}


        <button className="change-todo" onClick={() => setIsEditing(true)}>
            <img src={changeIcon} alt="change-todo" />
        </button>

        <button className="delete-todo" onClick={() => deleteTodo(todo.id)}>
            <img src={deleteIcon} alt="delete-todo" />
        </button>
    </div>
    );
}

export default Todo;
