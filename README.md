# TABA - Modern Task Board Application

TABA is a premium, highly interactive Kanban-style task management application built with a focus on Frontend Engineering excellence. It combines sleek aesthetics with a robust, performant architecture.

![TABA Preview](https://via.placeholder.com/800x450?text=TABA+Task+Board+Preview)

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

This project was built with a specific focus on scalability, maintainability, and user experience. Below are the key technical decisions made during development:

### 1. State Management: Zustand

**Rationale**: We chose **Zustand** over Redux or Context API for several reasons:

- **Zero Boilerplate**: Unlike Redux, Zustand allows us to define stores in a few lines of code without unnecessary actions, reducers, or types.
- **Performance**: It uses a subscription-based model that prevents unnecessary re-renders of components that don't need the updated data.
- **Persistence Middleware**: Integrated easily with `localStorage` to ensure tasks and projects are saved across sessions automatically.

### 2. Drag & Drop: @dnd-kit

**Rationale**: For the core Kanban board functionality, we utilized **@dnd-kit**:

- **Modularity**: It is a collection of narrow-purpose packages, meaning we only import what we need (core, sortable, utilities).
- **Accessibility**: Built-in support for keyboard sensors and screen readers out of the box.
- **Performance**: Modern architecture that feels significantly snappier than the now-legacy `react-beautiful-dnd`.

### 3. Styling: Tailwind CSS

**Rationale**: To achieve the "Wow Factor" design:

- **Utility-First**: Allowed for rapid prototyping of complex UI elements like glassmorphic cards and custom gradients without leaving the TSX files.
- **Consistency**: Used a tailored color palette and shadow system to ensure a premium, cohesive look throughout the application.
- **Dark Mode**: Native support enabled a seamless transition between light and dark themes with minimal extra code.

### 4. Component-Based Architecture

**Rationale**: The application is broken down into small, focused components (`Column.tsx`, `TaskCard.tsx`, `ContextMenu.tsx`):

- **Reusability**: The `ContextMenu` was designed as a generic, recursive component that handles nested sub-menus for any part of the app.
- **Separation of Concerns**: Logic for individual tasks is encapsulated within `TaskCard`, while the overall board flow is managed by `TaskBoard`.

---

## ✨ Key Features

- **Interactive Kanban Board**: Drag and drop tasks across "Todo", "Doing", and "Done" columns.
- **Customization**: Set unique background colors for individual tasks and entire project boards via right-click context menus.
- **Search & Filter**: Find tasks instantly by title, description, or tags. Filter by priority levels.
- **Nested Context Menus**: A custom-built menu system that supports deep nesting for intuitive feature discovery.
- **Authentication Flow**: Secure login with "Remember Me" functionality.
- **Responsive & Dynamic**: Fully responsive layout with smooth micro-animations and a sleek dark mode.

---

## 📂 Project Structure

```text
src/
├── components/       # UI Components (TaskBoard, Column, TaskCard, etc.)
├── store/            # Zustand stores (useTaskStore, useAuthStore)
├── App.tsx           # Route management and global layout
└── index.tsx         # Application entry point
```

---

_Created with ❤️ by Aditya_
