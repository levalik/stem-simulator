# Code Standards & Best Practices

## 1. Project Structure

The project follows a feature-based architecture combined with a clean separation of concerns.

```
src/
├── app/                # App-wide configuration (store, layouts, providers)
├── features/           # Feature-specific code (logic, ui, model)
│   ├── admin/          # Admin-related features
│   ├── simulation/     # Simulation-related features
│   └── ...
├── routes/             # Route definitions (TanStack Router)
├── shared/             # Shared utilities, UI components, hooks
│   ├── ui/             # Reusable UI components (Buttons, Inputs, etc.)
│   ├── lib/            # Helper functions
│   └── ...
└── widgets/            # Complex components composed of features and shared UI
```

## 2. Naming Conventions

- **Files**:
  - React Components: `PascalCase.tsx` (e.g., `Button.tsx`, `TeacherDashboard.tsx`)
  - Hooks: `camelCase.ts` (prefix with `use`, e.g., `useAuth.ts`)
  - Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
  - Constants: `SCREAMING_SNAKE_CASE` (inside files)

- **Variables & Functions**:
  - `camelCase` for variables and functions.
  - `PascalCase` for React components and interfaces/types.
  - Boolean variables should start with `is`, `has`, `should` (e.g., `isLoading`, `hasError`).

## 3. React & TypeScript

- **Functional Components**: Use functional components with hooks.
- **Types**:
  - Use `interface` for object definitions and `type` for unions/intersections.
  - Explicitly type component props.
  - Avoid `any`. Use `unknown` if necessary, but prefer specific types.

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  // ...
};
```

- **State Management**:
  - Use `useState` for local component state.
  - Use `Zustand` for global state (user session, theme, etc.).
  - Avoid prop drilling; use composition or context/store where appropriate.

## 4. Styling (Tailwind CSS)

- Use Tailwind CSS utility classes for styling.
- Avoid inline styles (`style={{ ... }}`) unless dynamic values are required.
- Use the `cn` (classnames) utility for conditional classes.
- Follow the design system tokens defined in `tailwind.config.js` (colors, spacing, etc.).

```tsx
<div className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
  <h1 className="text-xl font-bold text-surface-900">Title</h1>
</div>
```

## 5. Routing

- Use **TanStack Router** for routing.
- Define routes in `src/routes`.
- Use `createFileRoute` for type-safe routing.
- Use `useNavigate` for programmatic navigation.

## 6. Component Design

- **Atomic Design Principles**:
  - **Atoms**: Basic UI elements (Button, Input, Icon).
  - **Molecules**: Simple combinations (SearchInput, UserCard).
  - **Organisms**: Complex sections (Header, Sidebar).
  - **Templates/Pages**: Full page layouts.

- **Props**:
  - Keep props minimal.
  - Use composition (`children`) to avoid excessive props.

## 7. Performance

- Use `useMemo` and `useCallback` for expensive calculations or stable function references.
- Lazy load routes/components where possible (though Vite handles code splitting well).
- Optimize images (use WebP/AVIF where possible).

## 8. Accessibility (a11y)

- Use semantic HTML (`<button>`, `<nav>`, `<main>`, `<h1>`).
- Add `aria-label` or `title` to interactive elements without text.
- Ensure sufficient color contrast.
- Support keyboard navigation.

## 9. Git Workflow

- **Commits**: Use conventional commits (e.g., `feat: add login`, `fix: resolve click issue`).
- **Branches**: Use feature branches (e.g., `feature/new-dashboard`, `fix/login-bug`).
