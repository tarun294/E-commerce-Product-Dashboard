# E-commerce Dashboard

A modern, responsive e-commerce dashboard built with React, TypeScript, and TailwindCSS, featuring infinite scrolling, advanced filtering, and optimized performance.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:
```bash
npm install
```

### Development

To start the development server:
```bash
npm run dev
```

The application will be available at the provided local URL.

### Build

To create a production build:
```bash
npm run build
```

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

### Linting

To run the linter:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── types/         # TypeScript type definitions
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## Design Decisions

### Architecture
- **Component Structure**: Follows a modular approach with clear separation of concerns:
  - `components/`: Reusable UI components
  - `hooks/`: Custom hooks for data fetching and business logic
  - `types/`: TypeScript interfaces and types
  - `lib/`: Utility functions and helpers

### Design Patterns

1. **Container-Presenter Pattern**
   - Dashboard component handles data and logic
   - ProductCard and ProductModal components focus purely on presentation
   - Separates data management from UI rendering

2. **Custom Hook Pattern**
   - `useProducts` hook encapsulates product fetching logic
   - Provides reusable data fetching with built-in filtering and pagination
   - Centralizes API interaction and state management

3. **Render Props Pattern**
   - Used with `react-intersection-observer` for infinite scrolling
   - Provides clean separation between intersection logic and UI

4. **Singleton Pattern**
   - Single QueryClient instance for React Query
   - Ensures consistent cache management across the application

## Optimizations

### Performance
1. **Data Fetching**
   - React Query for efficient data caching and invalidation
   - Infinite scroll implementation to load data in chunks
   - Debounced filter updates to prevent excessive API calls

2. **Image Optimization**
   - Lazy loading images using native `loading="lazy"`
   - Maintaining aspect ratio using percentage padding trick
   - Image optimization through proper sizing and loading strategies

3. **Component Optimization**
   - Memoized category list to prevent unnecessary recalculations
   - Efficient sorting and filtering on the client side
   - Modal rendering using React Portal for better performance

### UI/UX Optimizations
1. **Responsive Design**
   - Mobile-first approach using Tailwind CSS
   - Grid layout adapts from 1 to 3 columns based on viewport
   - Smooth transitions and hover effects

2. **Loading States**
   - Skeleton loading for initial data fetch
   - Infinite scroll loading indicator
   - Smooth transitions for modal and filter updates

### Code Optimization
1. **Bundle Size**
   - Tree-shakeable icon imports from lucide-react
   - Proper code splitting with dynamic imports
   - Optimized dependency management

2. **Type Safety**
   - Comprehensive TypeScript types for all components
   - Strict type checking enabled
   - Type inference for better developer experience

## Best Practices

1. **Error Handling**
   - Graceful error states for failed API requests
   - User-friendly error messages
   - Proper error boundaries implementation

2. **Accessibility**
   - Semantic HTML structure
   - ARIA labels where necessary
   - Keyboard navigation support

3. **State Management**
   - Local component state for UI-specific state
   - React Query for server state
   - Proper prop drilling prevention

4. **Code Quality**
   - ESLint configuration for code consistency
   - Proper TypeScript configuration
   - Clear component and function naming

## Troubleshooting

If you encounter navigation issues in Chrome:

1. Try opening the preview in a new tab using the "Open in New Tab" button
2. Use a private/incognito window in Chrome
3. Temporarily disable browser extensions that might interfere with the preview

## Future Improvements

1. **Performance**
   - Implement server-side filtering and sorting
   - Add request caching with service workers
   - Optimize bundle size further with code splitting

2. **Features**
   - Add search functionality
   - Implement user authentication
   - Add shopping cart functionality

3. **Testing**
   - Add unit tests for components
   - Implement integration tests
   - Add end-to-end testing