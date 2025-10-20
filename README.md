# Frontier Dental - Product Dashboard

A modern React + TypeScript product management dashboard built for dental supply management. This application provides a comprehensive solution for managing dental products with advanced filtering, search capabilities, and full CRUD operations.

## About this Project

This is a single-page application (SPA) built as part of an interview assessment to demonstrate front-end development skills, clean code practices, and modern React patterns. The application simulates a real-world product management system for a dental supply company.

### Key Features

- **Product Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Advanced Search**: Real-time search with debouncing and suggestion dropdown
- **Smart Filtering**: Filter by category, stock availability, and price range
- **Sorting Options**: Multiple sorting criteria (A-Z, price, etc.)
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Toast Notifications**: Professional feedback system for user actions
- **Performance Optimized**: Loading states, pagination, and efficient state management

### Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Context API + useReducer pattern
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **URL State**: nuqs for persistent filter states
- **Development**: ESLint, TypeScript compiler

## Installation & Setup

### Prerequisites

- Node.js 20.19+ or 22.12+ (current version requirements)
- npm or yarn package manager
- Git

### Cloning the Repository

```bash
# Clone the repository
git clone https://github.com/samowolabi/frontier-dental.git

# Navigate to the project directory
cd frontier-dental/frontierdental-app
```

### Installing Dependencies

```bash
# Install all dependencies
npm install

# Or using yarn
yarn install
```

### Environment Setup

The application uses JSONBin as an external API for data persistence. No additional environment variables are required as the API key is included for demonstration purposes.

## Running the Application

### Development Mode

```bash
# Start the development server
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
frontierdental-app/
├── public/                     # Static assets
│   ├── products/              # Product images
│   └── logo/                  # Brand assets
├── src/                       # Source code
│   ├── pages/                 # Route components
│   │   ├── Home.tsx          # Main product listing
│   │   └── admin/            # Admin-only pages
│   │       ├── ProductManagement.tsx
│   │       └── AddUpdateDeleteProduct.tsx
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Application entry point
├── components/                # Reusable components
│   ├── admin/                # Admin-specific components
│   ├── layout/               # Layout components (Header, etc.)
│   ├── products/             # Product-related components
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── FilterBar.tsx
│   │   └── SearchBar.tsx
│   └── shared/               # Shared UI components
│       ├── Buttons.tsx
│       ├── Forms.tsx
│       ├── Modal.tsx
│       └── Icons.tsx
├── contexts/                  # State management
│   ├── productContext.tsx
│   ├── productReducer.tsx
│   └── productReducerTypes.ts
├── services/                  # API and data services
│   ├── api/
│   │   ├── client.ts
│   │   └── products.api.ts
│   └── db.json               # Local backup data
├── types/                    # TypeScript type definitions
│   └── types.ts
└── hooks/                    # Custom React hooks
    └── useDebounce.ts
```

## Core Processes & Features

### Product Management Workflow

1. **Viewing Products**
   - Navigate to the home page to view all products
   - Products display with images, names, categories, prices, and stock status
   - Responsive grid layout adapts to screen size

2. **Filtering & Search**
   - Use the search bar (click search icon) for real-time product search
   - Apply filters by category and stock availability
   - Sort products by name (A-Z, Z-A) or price (low-high, high-low)
   - All filters persist in the URL for bookmarking/sharing

3. **Admin Operations**
   - Navigate to `/admin/products` for product management
   - **Add Products**: Click "Add Product" button, fill form, submit
   - **Edit Products**: Click on any product card to edit
   - **Delete Products**: Click delete button, confirm in modal

### State Management Flow

The application uses a centralized state management pattern:

```typescript
// State Structure
{
  products: ProductType[],
  searchQueries: string[],
  loading: boolean
}

// Actions
- SET_PRODUCTS: Load initial product data
- ADD_PRODUCT: Add new product to state
- UPDATE_PRODUCT: Update existing product
- REMOVE_PRODUCT: Delete product from state
- SET_LOADING: Manage loading states
```

### API Integration

The application integrates with JSONBin for data persistence:

- **Endpoint**: `https://api.jsonbin.io/v3/b/68f5306eae596e708f1d5205`
- **Operations**: Currently read-only (fetch products)
- **Fallback**: Local `db.json` file for development

## Testing & Quality Assurance

### Manual Testing Checklist

- [ ] Product listing displays correctly
- [ ] Search functionality works with debouncing
- [ ] Filters work independently and in combination
- [ ] Pagination works correctly
- [ ] Add product form validation
- [ ] Edit product form pre-population and validation
- [ ] Delete confirmation modal
- [ ] Toast notifications for all actions
- [ ] Responsive design on mobile/tablet/desktop
- [ ] URL state persistence for filters

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Configuration

### Tailwind CSS

The project uses Tailwind CSS v4 with custom configuration for:
- Custom color palette
- Typography scales
- Component utilities
- Responsive breakpoints

### TypeScript

Strict TypeScript configuration with:
- Strict null checks
- No implicit any
- Exact optional property types
- Path mapping for clean imports

### Vite Configuration

Optimized Vite setup with:
- React plugin for fast refresh
- Path aliases for clean imports
- Build optimizations
- Development server configuration

## Usage Examples

### Adding a New Product

```typescript
// Example product data structure
{
  name: "Dental Implant Kit",
  description: "Complete titanium implant system",
  category: "Implants",
  price: 299.99,
  oldPrice: 349.99,
  imageUrl: "https://example.com/implant.jpg",
  available: true
}
```

### Filtering Products

```bash
# URL examples with filters
/?search=implant&categories=Implants&availability=inStock&sort=price-low-high
```

## Author

**Sam Owolabi**
- GitHub: [@samowolabi](https://github.com/samowolabi)
- Project: [frontier-dental](https://github.com/samowolabi/frontier-dental)
