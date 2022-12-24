import { act, render, renderHook } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useBooksContext } from 'src/app/context/books-context';

import { describe, expect, it } from 'vitest';
import HomePage from './home-page';

describe('Home Page', () => {
  it('should render', () => {
    const { baseElement } = render(<HomePage />, { wrapper: BrowserRouter });
    expect(baseElement).toBeTruthy();
  });
});
