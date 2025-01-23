# Healthy Maternity Enrollment Form

## Project Purpose
A modern, user-friendly multi-step enrollment form for maternity program registration. Built with Next.js and TypeScript, featuring a clean and accessible interface that guides users through the enrollment process with ease.

### Key Features
- 🎯 Multi-step form with progress tracking
- ✨ Modern, responsive UI with custom Tailwind styling
- ✅ Real-time form validation using React Hook Form + Yup
- 📧 Automated email notifications on form submission
- 🔒 Type-safe development with TypeScript
- 🧪 Comprehensive test coverage with Jest and Cypress

## Setup Instructions

### Prerequisites
- Node.js 18.x or higher
- npm/yarn/pnpm

### Environment Variables
Create a `.env.local` file in the root directory with:
```bash
# General Configuration
GM_EMAIL=your-email@example.com

# EmailJS Configuration (Required for email functionality)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key

# Add any additional environment variables here
```

> **Note**: This project uses EmailJS for handling email notifications. To enable email functionality, you'll need to:
> 1. Sign up for an [EmailJS account](https://www.emailjs.com/)
> 2. Create an email service and template
> 3. Copy your service ID, template ID, and public key
> 4. Add them to your `.env.local` file as shown above

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Testing

The project uses a comprehensive testing strategy combining unit tests (Jest + React Testing Library) and end-to-end tests (Cypress).

### Unit Tests

Unit tests are written using Jest and React Testing Library, focusing on component and utility function testing.

```bash
# Run all unit tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

#### Test Structure
- `__tests__/unit/` - Contains all unit tests
- `jest.setup.ts` - Jest configuration and global test setup
- Coverage reports are generated in the `coverage/` directory

#### Writing Unit Tests
- Use React Testing Library for component testing
- Follow the AAA pattern (Arrange, Act, Assert)
- Mock external dependencies using Jest's mocking capabilities
- Focus on testing behavior rather than implementation details

Example:
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepOne from '@/components/steps/StepOne';

describe('StepOne', () => {
  it('validates required fields', async () => {
    render(<StepOne />);
    await userEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
  });
});
```

### End-to-End Tests

E2E tests use Cypress to test the complete application flow from a user's perspective.

```bash
# Open Cypress Test Runner (interactive mode)
npm run cypress

# Run Cypress tests headlessly (CI mode)
npm run cypress:headless

# Run E2E tests with dev server
npm run test:e2e

# Run E2E tests headlessly with dev server
npm run test:e2e:headless
```

#### Test Structure
- `cypress/e2e/` - Contains all E2E test files
- `cypress/support/` - Custom commands and global configurations
- `cypress.config.ts` - Cypress configuration

#### Key Test Scenarios
1. Form Navigation
   - Step navigation (Next/Previous)
   - Data persistence between steps
   - Form validation

2. Form Submission
   - Complete form submission
   - Error handling
   - Success confirmation

3. Accessibility
   - Keyboard navigation
   - Screen reader compatibility
   - ARIA attributes

4. Data Validation
   - Required fields
   - Format validation
   - Error messages

#### Custom Commands
Cypress custom commands are available for common operations:
```typescript
// Fill out personal information
cy.fillPersonalInformation();

// Fill out pregnancy information
cy.fillPregnancyInformation();

// Fill out insurance information
cy.fillInsuranceInformation();
```

### Continuous Integration

Tests are run automatically in the CI pipeline:
1. Unit tests with coverage reporting
2. E2E tests in headless mode
3. Type checking and linting

### Code Coverage

Coverage reports are generated for:
- Unit tests (Jest)
- Integration tests
- E2E tests (optional)

Target coverage metrics:
- Statements: >80%
- Branches: >80%
- Functions: >80%
- Lines: >80%

## Project Structure
```
src/
├── app/                  # Next.js app directory
├── components/          
│   ├── steps/           # Form step components
│   └── ui/              # Reusable UI components
├── lib/                 # Utilities and validation schemas
└── styles/              # Global styles and Tailwind config
```

## Styling Guide
The project uses a custom Tailwind configuration with a specific color palette:
- Primary: #005EB9 (Main actions, buttons)
- Secondary: #5DC1FD (Supporting elements)
- Neutral: #333333 (Text, borders)
- Success: #508316 (Confirmation messages)
- Error: #EB001B (Error states)
- Warning: #FFA500 (Warning messages)

Components are styled using Tailwind CSS classes following these color schemes for consistency.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
[Add your license information here]

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
