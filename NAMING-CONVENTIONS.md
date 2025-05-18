# Naming Conventions

This document outlines the naming conventions used in the Palm Tree Garage Door project to ensure consistency across the codebase.

## Files and Directories

- **React Components**: Use PascalCase for component files (e.g., `ServiceCard.tsx`, `HeroSection.tsx`)
- **Utility Functions**: Use kebab-case for utility files (e.g., `image-utils.ts`, `form-validation.ts`)
- **Hooks**: Use camelCase with `use` prefix (e.g., `useFormValidation.ts`, `useImageLoader.ts`)
- **Types and Interfaces**: Use PascalCase for type files (e.g., `ServiceTypes.ts`, `FormTypes.ts`)
- **Constants**: Use UPPER_SNAKE_CASE for constant files (e.g., `API_ENDPOINTS.ts`)
- **Test Files**: Append `.test.tsx` or `.test.ts` to the file being tested (e.g., `Header.test.tsx`)

## Code Elements

### TypeScript/JavaScript

- **Variables**: Use camelCase (e.g., `userData`, `isLoading`)
- **Constants**: Use UPPER_SNAKE_CASE for true constants (e.g., `MAX_RETRY_COUNT`, `API_URL`)
- **Functions**: Use camelCase (e.g., `handleSubmit`, `formatPhoneNumber`)
- **Classes**: Use PascalCase (e.g., `ErrorBoundary`, `ImageLoader`)
- **Interfaces**: Use PascalCase with no prefix (e.g., `UserData`, `ServiceProps`)
- **Types**: Use PascalCase (e.g., `FormState`, `ButtonVariant`)
- **Enums**: Use PascalCase (e.g., `FormSteps`, `ServiceCategories`)

### React Specific

- **Components**: Use PascalCase (e.g., `Header`, `ServiceCard`)
- **Props**: Use camelCase for prop names (e.g., `onClick`, `isDisabled`)
- **Custom Hooks**: Use camelCase with `use` prefix (e.g., `useFormState`, `useLocalStorage`)
- **Context**: Use PascalCase with `Context` suffix (e.g., `UserContext`, `ThemeContext`)
- **Event Handlers**: Use camelCase with `handle` prefix (e.g., `handleClick`, `handleSubmit`)

### CSS/Tailwind

- **CSS Classes**: Use kebab-case (e.g., `hero-section`, `service-card`)
- **CSS Variables**: Use kebab-case with double dash prefix (e.g., `--primary-color`, `--font-size-lg`)
- **Tailwind Custom Classes**: Use kebab-case (e.g., `btn-primary`, `card-shadow`)

## Examples

### Component File
\`\`\`tsx
// ServiceCard.tsx
import React from 'react';
import type { ServiceCardProps } from '@/types/ServiceTypes';
import { formatPrice } from '@/utils/format-utils';

export default function ServiceCard({ title, price, description }: ServiceCardProps) {
  const formattedPrice = formatPrice(price);
  
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p className="price">{formattedPrice}</p>
      <p>{description}</p>
    </div>
  );
}
\`\`\`

### Hook File
\`\`\`tsx
// useFormValidation.ts
import { useState } from 'react';
import type { FormErrors, ValidationRules } from '@/types/FormTypes';

export function useFormValidation(initialValues: Record<string, any>, validationRules: ValidationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Hook implementation...
  
  return { values, errors, handleChange, validate };
}
\`\`\`

## Enforcement

- ESLint rules are configured to enforce many of these conventions
- Code reviews should check for adherence to these conventions
- Automated tests may be added to verify naming conventions in critical areas
\`\`\`

## 3. Unit and Integration Test Setup

Let's set up a comprehensive testing framework:
