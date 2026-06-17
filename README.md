# ZapShift Frontend

ZapShift frontend is the client-side application for users, riders, and admins to manage parcel delivery operations, payments, and tracking.

## Overview

- Built with **React + Vite**
- Uses **React Router** for navigation
- Integrates **Firebase Authentication** for login and signup
- Uses **TanStack React Query** for API data fetching
- Styled with **Tailwind CSS** and **DaisyUI**
- Includes animation support from **Framer Motion** and **Swiper**

## Tech Stack

- `react` / `react-dom` — UI framework
- `react-router-dom` — routing and layout navigation
- `@tanstack/react-query` — API caching and async data handling
- `axios` — HTTP requests
- `firebase` — authentication setup
- `framer-motion` — animations
- `swiper` — sliders and carousels
- `sweetalert2` — alerts/modals
- `lucide-react` and `react-icons` — icons

## Project Structure

- [src/main.jsx](src/main.jsx) — application bootstrap
- [src/routes/router.jsx](src/routes/router.jsx) — route definitions
- [src/contexts](src/contexts) — auth and theme providers
- [src/hooks](src/hooks) — custom hooks for auth and secure API access
- [src/layouts](src/layouts) — public/auth/dashboard layouts
- [src/pages](src/pages) — page-level components
- [src/components](src/components) — reusable UI sections
- [public](public) — static JSON and assets

## Installation

1. Go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the required values.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Required Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_APIKEY` | Firebase API key |
| `VITE_AUTHDOMAIN` | Firebase auth domain |
| `VITE_PROJECTID` | Firebase project ID |
| `VITE_STORAGEBUCKET` | Firebase storage bucket |
| `VITE_MESSAGINGSENDERID` | Firebase messaging sender ID |
| `VITE_APPID` | Firebase app ID |
| `VITE_SITE_DOMAIN` | Backend API base URL |
| `VITE_IMGBB_API` | Optional image upload API key |

## Core App Flow

### Authentication

The app initializes Firebase in [src/firebase/firebase.config.js](src/firebase/firebase.config.js) and wraps the application in [src/contexts/AuthProvider.jsx](src/contexts/AuthProvider.jsx).

This provider manages:

- login/logout
- Google sign-in
- password reset
- user state tracking
- email verification helpers

### Secure API Access

The secure request hook in [src/hooks/useAxiosSecure.jsx](src/hooks/useAxiosSecure.jsx) adds the Firebase bearer token to API requests and redirects the user to login if the token is invalid.

### Role-Based Access

The app uses custom route guards:

- [src/routes/PrivateRoute.jsx](src/routes/PrivateRoute.jsx) — checks login state
- [src/routes/UserRoute.jsx](src/routes/UserRoute.jsx) — allows user-level access
- [src/routes/RiderRoute.jsx](src/routes/RiderRoute.jsx) — allows rider-level access
- [src/routes/AdminRoute.jsx](src/routes/AdminRoute.jsx) — allows admin-level access

## Route Overview

### Public Routes

- `/` — Home page
- `/services` — Services page
- `/coverage` — Coverage map/data page
- `/about-us` — About us
- `/pricing` — Pricing
- `/send-parcel` — Send parcel form
- `/be-a-rider` — Rider application page (protected)
- `/blog` — Blog listing
- `/contact` — Contact page
- `/parcel-track` / `/parcel-track/:trackingId` — Parcel tracking pages

### Auth Routes

- `/login`
- `/register`
- `/forgot-password`

### Dashboard Routes

- `/dashboard` — default dashboard/profile view
- `/dashboard/edit-profile` — profile editing
- `/dashboard/my-parcels` — user parcel history
- `/dashboard/admin-parcels` — admin parcel management
- `/dashboard/payments/:parcelId` — payment page
- `/dashboard/payment-success` — payment success page
- `/dashboard/payment-cancel` — payment cancellation page
- `/dashboard/my-payments` — user payments
- `/dashboard/assigned-deliveries` — rider deliveries
- `/dashboard/rider-payments` — rider payout page
- `/dashboard/completed-deliveries` — completed rider deliveries
- `/dashboard/payment-history` — admin payment history
- `/dashboard/rider-applications` — admin rider applications
- `/dashboard/assign-riders` — admin rider assignment page
- `/dashboard/users-management` — admin user management

## Main UI Areas

- [src/components/Navbar.jsx](src/components/Navbar.jsx) — top navigation with theme toggle and profile actions
- [src/components/Footer.jsx](src/components/Footer.jsx) — footer links and branding
- [src/layouts/DashboardLayout.jsx](src/layouts/DashboardLayout.jsx) — dashboard shell with role-based navigation
- [src/components/StatusBadge.jsx](src/components/StatusBadge.jsx) — parcel status display helper

## Data Sources

The frontend loads some static content from [public](public), including:

- `services.json`
- `warehouses.json`
- `reviews.json`

## Build and Production

Run a production build with:

```bash
npm run build
```

The generated build can be previewed locally with:

```bash
npm run preview
```

## Notes

- The frontend expects the backend API to be reachable via the `VITE_SITE_DOMAIN` value.
- The app uses role-based routing to control access to dashboard sections.
- Theme preference and auth state are handled through dedicated context providers.
