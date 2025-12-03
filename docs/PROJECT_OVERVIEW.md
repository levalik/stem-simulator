# Project Overview: STEM Simulator

## 1. Introduction

The **STEM Simulator** is a browser-based interactive platform designed to enhance the cognitive skills of teachers through short, engaging STEM simulations. It utilizes AI to provide real-time feedback and analytics, fostering a deeper understanding of problem-solving and data analysis.

## 2. Key Features

### For Teachers
- **Interactive Scenarios**: Step-by-step simulations covering real-world STEM problems.
- **7-Step Flow**:
  1. **Opening**: Introduction to the scenario.
  2. **Problem**: Presentation of the core challenge.
  3. **Data**: Analysis of relevant data (graphs, tables).
  4. **Analysis**: Open-ended questions to interpret data.
  5. **Solutions**: Decision-making phase.
  6. **Simulation**: Visualization of the outcome.
  7. **Reflection**: Metacognitive review of the process.
- **AI Feedback**: Instant feedback on analysis and reasoning.
- **Dashboard**: Track progress, view completed scenarios, and access performance metrics.

### For Admins
- **Scenario Management**: Create, edit, and delete scenarios.
- **Analytics Dashboard**: View system-wide usage, completion rates, and error trends.
- **User Management**: Manage teacher accounts and permissions.

## 3. Technology Stack

- **Frontend Framework**: React 19 (via Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Design System)
- **Routing**: TanStack Router
- **State Management**: Zustand
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI Integration**: Google GenAI (Gemini)

## 4. Architecture

The application is built as a Single Page Application (SPA).

- **Client-Side Rendering**: Fast transitions and interactive UI.
- **Modular Design**: Components are organized by feature and reusability.
- **Responsive**: Fully responsive design for desktop and tablet use.

## 5. Directory Structure

- `src/app`: Global configurations (Store, Layouts).
- `src/features`: Business logic and UI for specific features (Admin, Simulation).
- `src/routes`: Route definitions.
- `src/shared`: Reusable components and utilities.
- `src/widgets`: High-level components.

## 6. Future Roadmap

- **Multiplayer Mode**: Collaborative simulations.
- **Advanced AI**: More nuanced feedback and scenario generation.
- **Mobile App**: Native mobile experience.
