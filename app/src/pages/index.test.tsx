import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

describe('Home component', () => {
  it('should render without crashing', async () => {
    const { queryByText } = render(
      <>
        <Home />
      </>
    );

    await waitFor(() => {
      expect(queryByText('Welcome to PiggyBank', { exact: false })).toBeInTheDocument();
    });
  });
});
