import { useContext } from 'react';
import { TodosContext } from '../../contexts/todosContext';

const TodosList = () => {
  const { todos, setTodos } = useContext(TodosContext);

  return (
    <div>
      {todos?.map((todo, index) => {
        return <p key={index} >{todo.name}</p>;
      })}
    </div>
  );
};

export default TodosList;
