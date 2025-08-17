// Import necessary modules and setup
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Unit Tests
describe('Unit Tests', () => {
  test('Renders the hero section correctly', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /John Doe/i })).toBeInTheDocument();
    expect(screen.getByText(/Freelance Developer/i)).toBeInTheDocument();
  });

  test('Renders the projects section correctly', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Projects/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  test('Renders the skills section correctly', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Skills/i })).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(6);
  });

  test('Renders the contact section correctly', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Contact/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /john@example.com/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeInTheDocument();
  });
});

// Integration Tests
describe('Integration Tests', () => {
  test('Smooth scrolling between sections', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const heroSection = screen.getByRole('region', { name: /hero/i });
    const projectsSection = screen.getByRole('region', { name: /projects/i });

    fireEvent.click(screen.getByRole('link', { name: /projects/i }));
    await waitFor(() => expect(projectsSection).toBeInTheDocument());
    expect(heroSection).not.toBeInTheDocument();
  });

  test('Dark mode functionality', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const darkModeToggle = screen.getByRole('button', { name: /toggle dark mode/i });
    fireEvent.click(darkModeToggle);

    await waitFor(() => {
      expect(document.body).toHaveStyle('background-color: #1a202c');
      expect(screen.getByRole('button', { name: /toggle dark mode/i })).toHaveTextContent('Light Mode');
    });
  });
});

// E2E Tests
describe('E2E Tests', () => {
  test('User can navigate through the site and submit the contact form', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Navigate to the contact section
    fireEvent.click(screen.getByRole('link', { name: /contact/i }));
    await waitFor(() => expect(screen.getByRole('region', { name: /contact/i })).toBeInTheDocument());

    // Fill out the contact form
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const messageInput = screen.getByRole('textbox', { name: /message/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent