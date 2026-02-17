# TABA - Modern Task Board Application

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-black?logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Live Site](https://img.shields.io/badge/Live-Demo-brightgreen?logo=netlify&logoColor=white)](https://taba-app.netlify.app/)
[![Watch Demo](https://img.shields.io/badge/Watch-Demo-red?logo=googledrive&logoColor=white)](https://drive.google.com/file/d/1wF1Z6EgvTC_4UOdtGeiDUL6PaAB_GlRI/view?usp=sharing)

TABA is a premium, highly interactive Kanban-style task management application built with a focus on Frontend Engineering excellence. It combines sleek aesthetics with a robust, performant architecture.


## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd taba
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### 🔐 Demo Credentials

To explore the application, use the following hardcoded credentials:

- **Email**: `intern@demo.com`
- **Password**: `intern123`

---

## 🛠️ Tech Stack & Decision Rationale

This project was built with a specific focus on scalability, maintainability, and user experience.

### 1. State Management: Zustand

**Rationale**: We chose **Zustand** over Redux for its simplicity and power:

- **Zero Boilerplate**: Define stores in a few lines without actions/reducers.
- **Selective Subscriptions**: Only components that use specific state slices re-render, significantly boosting performance.
- **Persistence**: Leverages middleware to sync state with `localStorage` automatically, preventing data loss on refresh.

### 2. Drag & Drop: @dnd-kit

**Rationale**: For the core Kanban board functionality:

- **Modular Design**: Reduces bundle size by only including necessary logic for sorting and basic dragging.
- **Accessibility**: Includes broad ARIA support, making the board usable for everyone.
- **Extensible**: Allows for custom sensors (Mouse, Touch, Keyboard) for a truly multi-platform feel.

### 3. Styling: Tailwind CSS & Dark Mode

**Rationale**: Achieving a state-of-the-art look:

- **Design Systems**: Tailwind allows us to codify spacing and colors, ensuring the UI stays consistent as it grows.
- **Dynamic Themes**: Uses CSS variables and class-based dark mode for instant, smooth theme switching.

---

## ⚡ Performance Optimizations

- **Memoized Filtering**: Task filtering and sorting are handled via `useMemo` to ensure the UI remains responsive even with hundreds of tasks.
- **Recursive Rendering**: The `ContextMenu` component is built to recursively render sub-menus, minimizing memory overhead and maximizing code reuse.
- **Context-Free State**: By using Zustand, we avoid "Prop Drilling" and "Context Hell", keeping the component tree flat and easy to debug.

---

## ✨ Key Features

- **Interactive Kanban Board**: Drag and drop tasks across workflow stages.
- **Visual Customization**: Right-click tasks or board areas to apply custom pastel color palettes.
- **Search & Tagging**: Instant searching by title, description, or tags with auto-save functionality.
- **Authentication**: Secure flow with error validation and persistent "Remember Me" session management.
- **Nested Menus**: Sophisticated context menu system with hoverable sub-options.

---

## 📂 Project Structure

```text
src/
├── components/       # Atomic and complex UI Components
├── store/            # State stores (Auth & Task management)
├── App.tsx           # Entry router and global theme wrapper
└── index.tsx         # Root mounting point
```

---

## 🚀 Upcoming Features

- **User Accounts & Teams**: Implement multi-user support with team collaboration features.
- **Real-time Updates**: Integrate WebSockets for live updates across multiple clients.
- **Customizable Workflows**: Allow users to define their own columns and workflow stages.
- **Due Dates & Reminders**: Add functionality for setting task deadlines and notifications.
- **Advanced Filtering**: More robust filtering options, including date ranges and assignee.

---

_Created with ❤️ by Aditya_
