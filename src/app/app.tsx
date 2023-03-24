import { useRoutes } from 'react-router-dom';
import routes from './app.routes';

export function App() {
  const content = useRoutes(routes);
  return content;
}

export default App;
