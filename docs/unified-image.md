# UnifiedImage Component

The `UnifiedImage` component is a flexible, all-in-one image component that combines the functionality of multiple specialized image components into a single, easy-to-use interface.

## Features

- **Multiple Variants**: Support for standard, hero, responsive, gallery, and lazy-loaded images
- **Responsive Design**: Automatically adapts to different screen sizes
- **Lazy Loading**: Only loads images when they enter the viewport
- **Error Handling**: Gracefully handles loading errors with fallbacks
- **Gallery Mode**: Built-in lightbox functionality for image galleries
- **Loading States**: Visual feedback during image loading
- **TypeScript Support**: Fully typed props for better developer experience

## Basic Usage

\`\`\`tsx
import { UnifiedImage } from "@/components/ui/UnifiedImage"

// Standard image
<UnifiedImage
  src="/path/to/image.jpg"
  alt="Description of image"
  width={800}
  height={600}
/>

// Hero image
<UnifiedImage
  variant="hero"
  src="/path/to/desktop.jpg"
  mobileSrc="/path/to/mobile.jpg"
  alt="Hero image"
  overlayClassName="bg-black"
  overlayOpacity={0.4}
/>

// Lazy-loaded image
<UnifiedImage
  variant="lazy"
  src="/path/to/image.jpg"
  alt="Lazy loaded image"
  width={400}
  height={300}
  threshold={0.2}
/>

// Responsive image
<UnifiedImage
  variant="responsive"
  src="/path/to/image.jpg"
  mobileSrc="/path/to/mobile.jpg"
  alt="Responsive image"
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// Gallery
<UnifiedImage
  variant="gallery"
  images={[
    { src: "/path/to/image1.jpg", alt: "Image 1" },
    { src: "/path/to/image2.jpg", alt: "Image 2" },
    { src: "/path/to/image3.jpg", alt: "Image 3" },
  ]}
  lightbox={true}
/>
\`\`\`

## Props

### Base Props (All Variants)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | Required | The image source URL |
| `alt` | string | Required | Alternative text for the image |
| `fallbackSrc` | string | "/placeholder.svg" | Fallback image to show if the main image fails to load |
| `className` | string | "" | CSS class for the image element |
| `containerClassName` | string | "" | CSS class for the container div |
| `objectFit` | "cover" \| "contain" \| "fill" \| "none" \| "scale-down" | "cover" | How the image should be resized to fit its container |
| `objectPosition` | string | "center" | Position of the image within its container |
| `quality` | number | 85 | Quality of the image (1-100) |
| `variant` | "standard" \| "hero" \| "responsive" \| "gallery" \| "lazy" | "standard" | The type of image component to render |

### Hero Image Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mobileSrc` | string | undefined | Alternative image source for mobile devices |
| `desktopSrc` | string | undefined | Alternative image source for desktop devices |
| `overlayClassName` | string | undefined | CSS class for an optional overlay |
| `overlayOpacity` | number | 0.5 | Opacity of the overlay (0-1) |

### Responsive Image Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `breakpoints` | object | { sm: 640, md: 768, lg: 1024, xl: 1280 } | Screen size breakpoints |
| `sizes` | string | "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw" | Sizes attribute for responsive images |

### Gallery Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | Array | [] | Array of image objects with src and alt properties |
| `lightbox` | boolean | false | Whether to enable lightbox functionality |
| `thumbnailClassName` | string | "" | CSS class for thumbnail images |
| `modalClassName` | string | "" | CSS class for the lightbox modal |
| `aspectRatio` | string | "aspect-square" | Aspect ratio for gallery thumbnails |

### Lazy Loading Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `threshold` | number | 0.1 | Intersection threshold for lazy loading |
| `once` | boolean | true | Whether to load the image only once |
| `placeholderColor` | string | "bg-gray-200" | CSS class for the placeholder color |
| `showLoadingIndicator` | boolean | true | Whether to show a loading spinner |

## Examples

### Hero Section with Overlay

\`\`\`tsx
<UnifiedImage
  variant="hero"
  src="/images/hero-desktop.jpg"
  mobileSrc="/images/hero-mobile.jpg"
  alt="Hero image"
  overlayClassName="bg-gradient-to-r from-black to-transparent"
  overlayOpacity={0.7}
  objectPosition="center 30%"
  priority
/>
\`\`\`

### Responsive Product Image

\`\`\`tsx
<UnifiedImage
  variant="responsive"
  src="/images/product-large.jpg"
  mobileSrc="/images/product-small.jpg"
  alt="Product image"
  width={600}
  height={400}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="rounded-lg"
/>
\`\`\`

### Image Gallery with Lightbox

\`\`\`tsx
<UnifiedImage
  variant="gallery"
  images={productImages}
  lightbox={true}
  thumbnailClassName="hover:scale-105 transition-transform duration-300"
  aspectRatio="aspect-video"
/>
\`\`\`

### Lazy-Loaded Blog Image

\`\`\`tsx
<UnifiedImage
  variant="lazy"
  src="/images/blog-post.jpg"
  alt="Blog post image"
  width={800}
  height={450}
  threshold={0.2}
  className="rounded-xl shadow-md"
  containerClassName="my-8"
/>
