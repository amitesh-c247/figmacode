# Admin Dashboard Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.local.example .env.local
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with global CSS
│   └── page.tsx          # Main application page
├── components/           # React components
│   ├── Auth/            # Authentication components
│   ├── Dashboard/       # Dashboard components
│   ├── Layout/          # Layout components
│   ├── Settings/        # Settings components
│   ├── Users/           # User management components
│   └── ui/              # Reusable UI components (shadcn/ui)
├── lib/                 # Utility functions and schemas
├── styles/              # Global CSS and Tailwind styles
└── public/              # Static assets
```

## Key Features

### 🔐 Authentication
- Login page with form validation
- Demo credentials: admin@peersession.com / Admin123!

### 📊 Dashboard
- KPI cards with metrics
- Interactive charts using Recharts
- Recent activity feed

### 👥 User Management
- User listing with search and filters
- Add/Edit user functionality
- Role and status management

### 🏢 Company Management
- Company listing table
- Add company with file upload
- Status management

### ⚙️ Settings
- Profile settings
- Password change with validation
- Notification preferences

## Form Validation

All forms use **React Hook Form** with **Yup** validation:
- Real-time validation
- Proper error handling
- Loading states
- Clear error messages

## Styling

- **Tailwind CSS v3** for utility-first styling
- **shadcn/ui** components for consistent UI
- **Custom purple theme** (#7c3aed)
- **Responsive design** (mobile-first approach)

## Troubleshooting

### CSS Not Loading
1. Ensure `styles/globals.css` is imported in `app/layout.tsx`
2. Restart the development server
3. Clear browser cache

### Component Errors
1. Check all dependencies are installed
2. Verify import paths are correct
3. Ensure TypeScript types are resolved

### Build Issues
1. Run `npm run build` to check for build errors
2. Fix any TypeScript or ESLint errors
3. Ensure all required files are present

## Demo Login

Use these credentials to access the dashboard:
- **Email**: admin@peersession.com
- **Password**: Admin123!

## Next Steps

1. **Backend Integration**: Replace mock data with real API calls
2. **Authentication**: Implement proper JWT authentication
3. **Database**: Connect to your preferred database
4. **Deployment**: Deploy using Vercel, Netlify, or your preferred platform
5. **Testing**: Add unit and integration tests

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all dependencies are correctly installed
3. Ensure you're using Node.js 18+
4. Clear node_modules and reinstall if needed
```

<figma type="summary">
I've fixed the CSS and classes not working issue by properly setting up the Next.js project structure:

**Key Fixes Made:**
- ✅ **CSS Import**: Added `../styles/globals.css` import in `app/layout.tsx`
- ✅ **Next.js Structure**: Moved main app logic to `app/page.tsx` with `'use client'` directive
- ✅ **Tailwind Config**: Created proper `tailwind.config.js` with all custom colors and utilities
- ✅ **PostCSS Setup**: Added `postcss.config.js` for Tailwind processing
- ✅ **Package Dependencies**: Updated to Tailwind CSS v3 (stable) with proper PostCSS setup
- ✅ **Custom CSS Classes**: Restructured global CSS with proper Tailwind layers
- ✅ **Build Configuration**: Updated `next.config.js` for optimal performance

**What Should Work Now:**
- All purple theme colors (`bg-purple-600`, `text-purple-700`, etc.)
- Gray color utilities (`bg-gray-50`, `text-gray-500`, etc.)
- Form input styling with proper borders and focus states
- All shadcn/ui components with consistent styling
- Responsive design classes

**To Fix Your Local Setup:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Run `npm run dev`
4. The dashboard should now display with proper styling

The issue was that Tailwind CSS wasn't properly configured and the global CSS wasn't being imported in the Next.js App Router structure.