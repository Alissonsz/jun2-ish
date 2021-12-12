import Layout from '../components/layout';
import Counter from '../components/counter';
import TodosList from '../components/TodosList/todosList';
import { TodosContext } from '../contexts/todosContext';
import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';

const Index = ({ initialTodos }) => {
  const { setTodos, addTodo } = useContext(TodosContext);
  const [todoName, setTodoName] = useState('');

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <Layout home>
      <section className="section">
        <div className="container">
          <h1 className="title">
            Hello World from <a href="https://nextjs.org/">Next.js</a> and{' '}
            <a href="https://bulma.io/">Bulma</a>!
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Counter></Counter>
        </div>
        <div className="container">
          <TodosList />
          <input
            className="input"
            type="text"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <button
            className="button"
            onClick={() => {
              addTodo({ id: Math.random(), name: todoName });
              setTodoName('');
            }}
          >
            Adicionar todo
          </button>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      initialTodos: [
        { id: 1, name: 'gamer' },
        { id: 2, name: 'gamer2' },
      ],
    },
  };
};

export default Index;
