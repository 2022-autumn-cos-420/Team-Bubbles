import { render, screen } from '@testing-library/react';
import App from './App';

// test('background is dark gray', () => {
//   render(<App />);
//   const backgroundColor = screen.getByTestId(".app");
//   expect(backgroundColor).toHaveStyle('background-color: #434343');
// });

test('sign in with Google button is rendered', () => {
  render(<App />);
  const signInWithGoogleButton = screen.getByText(/Sign in/);
  expect(signInWithGoogleButton).toBeInTheDocument();
});

test('not logged in text is rendered', () => {
  render(<App/>);
  const notLoggedIn = screen.getByText(/Not Logged In/);
  expect(notLoggedIn).toBeInTheDocument();
});
