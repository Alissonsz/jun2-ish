import "../styles/global.sass";
import { AppProps } from "next/app";
import { TodosProvider } from "../contexts/todosContext";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <TodosProvider> 
      <Component {...pageProps} />
    </TodosProvider>
  );
}
