# Migration Plan for Removing Deprecated Files

This document outlines the plan for safely removing deprecated files from the codebase.

## Deprecated Files

1. `lib/analytics.ts` → Replace with `lib/dataLayer.ts`
2. `lib/image-optimization.ts` → Replace with `lib/image-utils.ts`
3. `lib/image-helpers.ts` → Replace with `lib/image-utils.ts`
4. `components/GTMContainer.tsx` → Replace with `components/GoogleTagManager.tsx`
5. `components/SEO.tsx` → Replace with Next.js App Router metadata API
6. `components/ImageTest.tsx` → Remove (test component)
7. `components/ImageDebug.tsx` → Remove (debug component)
8. `components/TestImage.tsx` → Remove (test component)

## Migration Steps

### 1. For each file that imports from deprecated files:

\`\`\`typescript
// BEFORE
import { trackPageView } from '@/lib/analytics';

// AFTER
import { trackPageView } from '@/lib/dataLayer';
\`\`\`

### 2. For image utilities:

\`\`\`typescript
// BEFORE
import { getResponsiveImageUrl } from '@/lib/image-optimization';
// or
import { getResponsiveImageUrl } from '@/lib/image-helpers';

// AFTER
import { getResponsiveImageUrl } from '@/lib/image-utils';
\`\`\`

### 3. For GTM Container:

\`\`\`typescript
// BEFORE
import GTMContainer from '@/components/GTMContainer';

// AFTER
import { GoogleTagManager } from '@/components/GoogleTagManager';
\`\`\`

### 4. For SEO Component:

\`\`\`typescript
// BEFORE
import SEO from '@/components/SEO';

// AFTER
// In layout.tsx or page.tsx, use the metadata export:
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  // other metadata
};
\`\`\`

### 5. For test image components:

Remove all imports and usages of these components as they are for testing only.
\`\`\`

Now, let's create a consolidated image-utils.ts file that combines the functionality from the deprecated image utility files:
