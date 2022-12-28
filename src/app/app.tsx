import { useRoutes } from 'react-router-dom';
import routes from './app.routes';

/**
 * App Component
 *
 * Contain direct definition to the Application Component Graph
 * @returns React.ReactElement<any, string | React.JSXElementConstructor<any>> | null
 */
export function App() {
  const content = useRoutes(routes);
  return content;
}

export default App;
