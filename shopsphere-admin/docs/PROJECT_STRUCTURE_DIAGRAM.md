# Project Structure Diagram
## ShopSphere Admin Dashboard

---

## 📁 Complete Project Structure

```
shopsphere-admin/
│
├── 📄 index.html                          ← HTML entry point
├── 📄 package.json                        ← Dependencies & scripts
├── 📄 vite.config.js                      ← Vite bundler config
├── 📄 eslint.config.js                    ← Code linting rules
├── 📄 .gitignore                          ← Git ignore rules
├── 📄 README.md                           ← Project overview
│
├── 🖼 assets/                             ← Static assets (images)
│   ├── backpack.png
│   ├── luna.png
│   ├── watch.png
│   └── watch.svg
│
├── 🌐 public/                             ← Public static files
│   ├── favicon.svg                        ← Browser tab icon
│   └── icons.svg                          ← SVG icons sprite
│
├── 📦 src/                                ★ MAIN SOURCE CODE
│   ├── 📄 main.jsx                        ← App entry point (ReactDOM)
│   ├── 📄 App.jsx                         ← Root component (Router setup)
│   ├── 📄 App.css                         ← App-level styles
│   └── 📄 index.css                       ← Global CSS variables & theme
│
├── 🧩 components/                         ★ REUSABLE COMPONENTS (~20)
│   │
│   ├── 🎨 ui/                             ← Base UI Kit (5)
│   │   ├── Button.jsx                     ← Reusable button component
│   │   ├── Input.jsx                      ← Form input component
│   │   ├── Badge.jsx                      ← Status badge component
│   │   ├── Modal.jsx                      ← Modal/Popup component
│   │   └── Loader.jsx                     ← Loading spinner component
│   │
│   ├── 📐 layouts/                        ← Layout Components (3)
│   │   ├── Sidebar.jsx                    ← Navigation sidebar
│   │   ├── Navbar.jsx                     ← Top navigation bar
│   │   └── Footer.jsx                     ← Page footer
│   │
│   ├── 📊 charts/                         ← Chart Components (3)
│   │   ├── RevenueChart.jsx               ← Revenue line chart
│   │   ├── SalesChart.jsx                 ← Sales bar chart
│   │   └── CategoryChart.jsx              ← Category bar chart
│   │
│   ├── 📇 cards/                          ← Card Components (4)
│   │   ├── StatCard.jsx                   ← Statistics display card
│   │   ├── ProductCard.jsx                ← Product display card
│   │   ├── UserCard.jsx                   ← User display card
│   │   └── Pagination.jsx                 ← Pagination card
│   │
│   ├── 📋 tables/                         ← Table Components (2)
│   │   ├── OrdersTable.jsx                ← Orders data table
│   │   └── usertable.jsx                  ← Users data table
│   │
│   └── 🔧 common/                         ← Common Components (2)
│       ├── SearchBar.jsx                  ← Global search bar
│       └── Pagination.jsx                 ← Page navigation
│
├── 📄 pages/                              ★ PAGE COMPONENTS (9)
│   ├── Login.jsx                          ← Authentication page
│   ├── Dashboard.jsx                      ← Main dashboard page
│   ├── Analytics.jsx                      ← Sales analytics page
│   ├── Orders.jsx                         ← Order management page
│   ├── Products.jsx                       ← Product management page
│   ├── Users.jsx                          ← User management page
│   ├── Notifications.jsx                  ← Notifications panel
│   ├── Profile.jsx                        ← User profile page
│   └── Settings.jsx                       ← App settings page
│
├── 🗺 routes/                             ← ROUTE DEFINITIONS
│   └── AppRoutes.jsx                      ← All route configurations
│
├── 🏗 layouts/                            ← LAYOUT WRAPPERS
│   └── DashboardLayout.jsx                ← Main dashboard shell
│
├── 🌐 context/                            ★ STATE MANAGEMENT (4)
│   ├── AuthContext.jsx                    ← Authentication state
│   ├── ThemeContext.jsx                   ← Theme (dark/light) state
│   ├── ProductContext.jsx                 ← Product data state
│   └── NotificationContext.jsx            ← Notifications state
│
├── 🪝 hooks/                              ★ CUSTOM HOOKS (2)
│   ├── useAuth.js                         ← Auth hook wrapper
│   └── useTheme.js                        ← Theme hook wrapper
│
├── 🛠 services/                           ★ API SERVICES
│   └── api.js                             ← Axios API client
│
├── 🗄 data/                               ★ MOCK DATA
│   ├── products.js                        ← Product seed data
│   └── users.js                           ← User seed data
│
├── 📚 utils/                              ★ UTILITY FUNCTIONS
│   └── helpers.js                         ← Helper functions
│
└── 📖 docs/                               ★ DOCUMENTATION
    ├── ARCHITECTURE_OVERVIEW.md           ← System architecture
    ├── PERFORMANCE_OPTIMIZATION.md        ← Performance guide (Q1)
    ├── SCALABILITY_GUIDE.md               ← Scalability guide (Q2)
    ├── PROJECT_STRUCTURE_DIAGRAM.md       ← This file
    └── SCREENSHOTS.md                     ← Screenshots guide
```

---

## 🏗 Architecture Flow Diagram

```
┌─────────────────────────────────────────────────┐
│                   index.html                     │
│              (HTML Entry Point)                  │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                 main.jsx                         │
│         (ReactDOM.createRoot)                    │
│          <StrictMode> <App />                    │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                App.jsx                           │
│          <BrowserRouter>                         │
│            <AuthProvider>                        │
│              <ThemeProvider>                     │
│                <Routes> ...                      │
│              </ThemeProvider>                    │
│            </AuthProvider>                       │
│          </BrowserRouter>                        │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
┌───────────────┐   ┌───────────────────┐
│   Login Page  │   │  DashboardLayout   │
│  (Public)     │   │  (Protected)       │
└───────────────┘   └─────────┬─────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │Dashboard │   │ Analytics│   │  Orders  │
        │   Page   │   │   Page   │   │   Page   │
        └──────────┘   └──────────┘   └──────────┘

              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ Products │   │  Users   │   │Notifications
        │   Page   │   │   Page   │   │   Page   │
        └──────────┘   └──────────┘   └──────────┘

              ▼               ▼
        ┌──────────┐   ┌──────────┐
        │ Profile  │   │ Settings │
        │   Page   │   │   Page   │
        └──────────┘   └──────────┘
```

---

## 🧩 Component Hierarchy Diagram

```
App.jsx
├── AuthProvider (Context)
│   └── ThemeProvider (Context)
│       └── Routes
│           ├── Login Page
│           │   ├── Input (email)
│           │   ├── Input (password)
│           │   └── Button (submit)
│           │
│           └── DashboardLayout
│               ├── Sidebar
│               │   ├── NavLink (Dashboard)
│               │   ├── NavLink (Analytics)
│               │   ├── NavLink (Orders)
│               │   ├── NavLink (Products)
│               │   ├── NavLink (Users)
│               │   ├── NavLink (Notifications)
│               │   ├── NavLink (Profile)
│               │   └── NavLink (Settings)
│               │
│               ├── Navbar
│               │   ├── SearchBar
│               │   ├── Button (Filters)
│               │   ├── Button (Theme toggle)
│               │   └── Button (Add product)
│               │
│               └── <Outlet /> (Page Content)
│                   ├── Dashboard Page
│                   │   ├── StatCard (×3)
│                   │   ├── RevenueChart
│                   │   ├── SalesChart
│                   │   ├── CategoryChart
│                   │   ├── ProductCard (×3)
│                   │   └── OrdersTable
│                   │
│                   ├── Analytics Page
│                   │   ├── RevenueChart
│                   │   ├── SalesChart
│                   │   └── CategoryChart
│                   │
│                   └── ... other pages
│
└── Footer
```

---

## 🗄 Data Flow Diagram

```
┌──────────────────────────────────────────────────┐
│                  STATE LAYER                      │
├──────────────────────────────────────────────────┤
│                                                    │
│   ┌──────────────┐   ┌───────────────────┐       │
│   │ AuthContext   │   │  ThemeContext     │       │
│   │ - user        │   │  - theme          │       │
│   │ - login()     │   │  - toggleTheme()  │       │
│   │ - logout()    │   └───────────────────┘       │
│   └──────────────┘                                │
│                                                    │
│   ┌──────────────┐   ┌───────────────────┐       │
│   │ProductContext │   │NotificationContext│       │
│   │ - products    │   │ - notifications   │       │
│   │ - addProduct()│   │ - addNotif()      │       │
│   │ - deleteProd()│   │ - clearNotif()    │       │
│   └──────────────┘   └───────────────────┘       │
│                                                    │
└──────────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────┐
│                 COMPONENT LAYER                   │
├──────────────────────────────────────────────────┤
│                                                    │
│   Pages → use Context hooks → render Components   │
│                                                    │
│   Example:                                         │
│   ProductsPage → use ProductContext →              │
│     → filteredProducts (useMemo)                   │
│     → <ProductCard /> (mapped)                     │
│     → <Pagination />                               │
│                                                    │
└──────────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────┐
│                  SERVICE LAYER                    │
├──────────────────────────────────────────────────┤
│                                                    │
│   api.js → Axios HTTP calls to backend             │
│                                                    │
│   GET  /api/products      → fetch all products     │
│   POST /api/products      → create product         │
│   PUT  /api/products/:id  → update product         │
│   DELETE /api/products/:id → delete product        │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## 📊 Component Count Breakdown

| Category | Count | Percentage |
|----------|-------|------------|
| 🎨 UI Components (Button, Input, Badge, Modal, Loader) | 5 | 25% |
| 📐 Layout Components (Sidebar, Navbar, Footer) | 3 | 15% |
| 📊 Chart Components (Revenue, Sales, Category) | 3 | 15% |
| 📇 Card Components (Stat, Product, User, Pagination) | 4 | 20% |
| 📋 Table Components (Orders, Users) | 2 | 10% |
| 🔧 Common Components (SearchBar, Pagination) | 2 | 10% |
| 📄 Page Components | 9 | N/A |
| **Total Components** | **19** | **100%** |

---

## 🔐 Routing Map

```
/login              → Login Page (Public)
/                   → Dashboard (Protected)
/analytics          → Analytics (Protected)
/orders             → Orders (Protected)
/products           → Products (Protected)
/users              → Users (Protected)
/notifications      → Notifications (Protected)
/profile            → Profile (Protected)
/settings           → Settings (Protected)
*                   → Redirect to /login
```

---

## 🎨 Theme Architecture

```
Theme System (CSS Variables)
├── Dark Theme (default)
│   ├── --bg: #0c1223
│   ├── --surface: #111827
│   ├── --text: #cbd5e1
│   ├── --accent: #7c3aed
│   └── HTML: data-theme="dark"
│
└── Light Theme
    ├── --bg: #eff3f8
    ├── --surface: #ffffff
    ├── --text: #475569
    ├── --accent: #4f46e5
    └── HTML: data-theme="light"
```

---

*This diagram represents the current architecture designed for scalability up to 200+ components.*
