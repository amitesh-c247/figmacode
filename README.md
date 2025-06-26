# PeerSession Admin Dashboard

A comprehensive admin dashboard built with Next.js 15, React, TypeScript, and Tailwind CSS v4.

## Features

- 🔐 **Authentication System** - Login page with form validation
- 📊 **Dashboard Overview** - KPI cards, charts, and activity monitoring
- 🏢 **Company Management** - CRUD operations for companies
- 👥 **User Management** - User listing, roles, and permissions
- ⚙️ **Settings** - Profile, notifications, and security settings
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design** - Works on all device sizes
- 🌙 **Dark Mode Ready** - Theme support included

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd admin-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Auth/             # Authentication components
│   ├── Companies/        # Company management
│   ├── Dashboard/        # Dashboard components
│   ├── Layout/           # Layout components
│   ├── Settings/         # Settings pages
│   ├── Users/            # User management
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
├── styles/               # Global styles
└── App.tsx               # Main application component
```

## Usage

### Default Login
The application starts with a login page. You can click "Login" with any credentials to access the dashboard.

### Navigation
- Use the collapsible sidebar to navigate between pages
- Click the menu icon in the header to toggle sidebar visibility
- Access user profile and settings from the header dropdown

### Features
- **Dashboard**: View KPIs, charts, and recent activity
- **Companies**: Manage company profiles with full CRUD operations
- **Users**: View and manage user accounts with roles
- **Settings**: Configure profile, notifications, and security

## Customization

### Colors
The dashboard uses a purple color scheme. You can modify colors in `/styles/globals.css`:

```css
:root {
  --purple-600: #7c3aed;
  --purple-700: #6d28d9;
  /* ... other colors */
}
```

### Components
All components are modular and can be easily customized. They're located in the `/components` directory and follow atomic design principles.

### Adding New Pages
1. Create a new component in the appropriate `/components` folder
2. Add the route to the sidebar menu in `/components/Layout/Sidebar.tsx`
3. Add the page case in the `renderPageContent` function in `/App.tsx`

## Dependencies

### Core Dependencies
- `next`: Next.js framework
- `react`: React library
- `typescript`: TypeScript support
- `tailwindcss`: Utility-first CSS framework
- `lucide-react`: Icon library

### UI Dependencies
- `@radix-ui/*`: Unstyled, accessible UI primitives
- `class-variance-authority`: Component variants
- `clsx`: Conditional classes
- `tailwind-merge`: Merge Tailwind classes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.