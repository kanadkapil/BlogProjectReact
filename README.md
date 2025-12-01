# Mini Blog Viewer

A modern, responsive blog viewer application built with React, TypeScript, Vite, TailwindCSS, and DaisyUI.

## Features

- **Dynamic Search**: Filter blogs by title, content, summary, and tags with URL synchronization.
- **Dark Mode**: Enforced dark mode for a premium aesthetic.
- **Authentication**: Simulated login system with session persistence.
- **Responsive Design**: Mobile-friendly navbar and layout.
- **Code Splitting**: Lazy loading for optimized performance.
- **TypeScript**: Fully typed codebase for better developer experience and code quality.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4, DaisyUI 5
- **Routing**: React Router DOM 7
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd mini-blog-viewer
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

## Project Structure

```
src/
├── components/     # Reusable UI components (Navbar, BlogCard, etc.)
├── contexts/       # React Contexts (AuthContext)
├── pages/          # Page components (Home, Login, BlogDetails, etc.)
├── types.ts        # TypeScript interfaces
├── App.tsx         # Main application component
└── main.tsx        # Entry point
```

## Data Sources

The application uses local JSON files in the `public/` directory to simulate a backend:

- `blogs.json`: Blog posts data
- `users.json`: User credentials
- `authors.json`: Author profiles

## License

ISC

https://myblogreact-steel.vercel.app/
