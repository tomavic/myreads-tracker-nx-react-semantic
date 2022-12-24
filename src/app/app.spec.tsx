import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', async () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<App />, { wrapper: BrowserRouter });
    expect(baseElement).toBeTruthy();
  });
});
