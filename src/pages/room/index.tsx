import Layout from '../../components/layout';
import Counter from '../../components/counter';
import TodosList from '../../components/TodosList/todosList';
import { TodosContext } from '../../contexts/todosContext';
import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import classNames from 'classnames';
import styles from "./Room.module.scss";

const Index = ({ initialTodos }) => {
  const { setTodos, addTodo } = useContext(TodosContext);
  const [todoName, setTodoName] = useState('');

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <Layout home>
      <section className={classNames("section columns is-fullwidth")}>
        <div className="column is-9"><VideoPlayer  /></div>
        
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
