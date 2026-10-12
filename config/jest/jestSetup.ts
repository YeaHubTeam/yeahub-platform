// Custom matchers (`toBeInTheDocument`, `toHaveClass`, ...); types are wired via `tsconfig.types`
import '@testing-library/jest-dom';

// Base URL for RTK Query / msw handlers (see `process.env.API_URL` usages in `__mocks__`)
process.env.API_URL = 'http://localhost/';
