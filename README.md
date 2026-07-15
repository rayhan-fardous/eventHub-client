# 🎪 EventHub - Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15%2F16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![HeroUI](https://img.shields.io/badge/HeroUI-3.2-FF8A65?style=for-the-badge)](https://heroui.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Better-Auth](https://img.shields.io/badge/Better--Auth-1.6-9C27B0?style=for-the-badge)](https://better-auth.com/)

EventHub Frontend is a modern, high-performance, and visually stunning web application built on **Next.js** (App Router), **React 19**, and **Tailwind CSS v4**. It features an elegant user interface component system designed with **HeroUI** (formerly NextUI) and smooth interactive experiences powered by **Framer Motion**.

The application serves as an event discovery, booking, review, and hosting platform. It integrates securely with MongoDB using **Better-Auth** for authentication and connects to the EventHub Express.js backend API for core event administration.

---

## 🔗 Links

| Resource | Link |
|----------|------|
| 🌍 Live Website | https://eventhub-bd.vercel.app |
| 💻 Frontend Repository | https://github.com/rayhan-fardous/eventHub-client |
| ⚙️ Backend Repository | https://github.com/rayhan-fardous/eventHub-server |

---

## 🌟 Key Features

*   **✨ Captivating Home Page**: Complete with a high-impact Hero banner, interactive event category badges, featured and upcoming event carousels, testimonials, FAQ dropdowns, stats counters, and newsletter subscription widgets.
*   **🔍 Advanced Event Discovery**: Easily browse, search, and filter events by name, location, category, or event creator.
*   **🎫 Real-time Booking System**: Reserve seats for upcoming events and automatically update host/event occupancy levels.
*   **📊 Rich User Dashboard**:
    *   *Attendees*: View and manage current bookings, access reservation details, and leave ratings/reviews.
    *   *Creators/Hosts*: Track created events, manage booking lists, view performance analytics using visual charts (**Recharts**), and perform event creation/modification.
*   **🔐 Modern Authentication Flow**: Ultra-secure, modern authorization powered by **Better-Auth** using password credentials and stateful sessions stored directly in a MongoDB collection.
*   **✍️ Event Review System**: Provide valuable feedback, submit ratings (1-5 stars), and read reviews left by other community members.
*   **⚡ Premium User Experience**:
    *   Page route transitions and component scroll reveals utilizing **Framer Motion**.
    *   Responsive layouts optimized for desktop, tablet, and mobile displays.
    *   Safe form state validation using **React Hook Form** paired with **Zod** schema validation.

---

## 🛠️ Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | [Next.js (App Router)](https://nextjs.org/) | Hybrid SSR/Static generation, layout systems, and page routing. |
| **View Layer** | [React 19](https://react.dev/) | Reactivity engine, using React Compiler for optimized builds. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strong typing, autocompletion, and static bug prevention. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) | Next-generation utility-first CSS rendering. |
| **UI Kit** | [HeroUI v3](https://heroui.com/) | Tailwind-integrated accessible component library. |
| **Authentication** | [Better-Auth v1](https://better-auth.com/) | Advanced, developer-friendly auth client & server middleware. |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Production-ready interactive animations and page transitions. |
| **Forms & Verification**| [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) | High-performance forms with strict schema verification. |
| **Analytics** | [Recharts](https://recharts.org/) | Redefined charts for React apps, powering the dashboard graphs. |
| **Notifications** | [React Toastify](https://fkhadra.github.io/react-toastify/) | Beautiful, non-blocking toast alerts for user interactions. |

---

## ⚙️ Installation & Setup

### 1. Prerequisites
Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18.x or newer recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   A running [MongoDB Instance](https://www.mongodb.com/) (Local or Atlas cloud cluster)
*   A running [EventHub Backend Server](https://github.com/your-username/eventhub-backend)

### 2. Clone the Repository
```bash
git clone <repository-url>

```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a file named `.env` in the root of the `frontend/` directory (you can use `.env.example` as a template if available).

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=your_32_character_better_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Database Configuration (Used by Better-Auth MongoDB adapter)
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/event-hub

# External API Integration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> [!IMPORTANT]
> `BETTER_AUTH_URL` must point to your local frontend address (usually `http://localhost:3000`), and `NEXT_PUBLIC_API_URL` must point to your running EventHub Backend (Express.js) server (usually `http://localhost:5000/api`).

### 5. Running the Application

#### Development Mode
To start the hot-reloading Next.js development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the page.

#### Production Build
To test or deploy the optimized production bundle locally:
```bash
# 1. Compile and build the project
npm run build

# 2. Run the server in production mode
npm run start
```

---


---

## 👨‍💻 Author

*   **Rayhan Fardous** - *Core Development and UI/UX Architecture*
