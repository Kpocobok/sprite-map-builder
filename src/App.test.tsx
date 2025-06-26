import { render, screen } from '@testing-library/react';

function Hello() {
  return <div>Hello world</div>;
}

test('renders hello', () => {
  render(<Hello />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
