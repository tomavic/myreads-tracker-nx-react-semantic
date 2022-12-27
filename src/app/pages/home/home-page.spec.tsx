import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { describe, expect, it } from 'vitest';
import HomePage from './home-page';

describe('Home Page', async () => {
  it('should render the component', () => {
    const { baseElement } = render(<HomePage />, { wrapper: BrowserRouter });

    expect(baseElement).toBeTruthy();
  });
});
