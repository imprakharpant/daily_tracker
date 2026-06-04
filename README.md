# ✨ Lumina 

![Lumina Banner](https://via.placeholder.com/1200x400/0a0a0a/D4AF37?text=Lumina+-+Quiet+Luxury+Habit+Tracking)

Lumina (formerly HabitFlow) is a premium, "quiet luxury" habit-tracking application designed to help users build consistency through aesthetic reinforcement. Built with a focus on high-end design, cinematic animations, and lightning-fast optimistic UI updates, Lumina transforms the chore of daily tracking into a rewarding and beautiful experience.

---

## ✨ Features

- **Quiet Luxury Aesthetics:** A deep obsidian and midnight background paired with champagne gold accents, designed using the principles of high-end editorial and modern glassmorphism.
- **Cinematic Transitions:** Fully integrated with `framer-motion` for buttery smooth, Awwwards-style page transitions, staggered list entrances, and beautiful hover states.
- **Optimistic UI:** Powered by React Query, ensuring that checking off a habit happens instantly on the frontend without waiting for server responses.
- **Advanced Habit Tracking:** Track daily goals, maintain streaks, and monitor your consistency over time.
- **Analytics Dashboard:** Visualize your growth with beautifully designed data cards.
- **Personal Reflections:** A dedicated notes section to journal your progress and thoughts alongside your habits.
- **Custom Emoji Picker:** A bespoke, animated dropdown menu replacing native browser selects for a truly premium feel.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (with custom design tokens)
- **Animations:** Framer Motion (`motion/react`)
- **State Management & Fetching:** TanStack React Query v5
- **Form Handling:** React Hook Form + Zod validation
- **Routing:** React Router v6

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Firebase Realtime Database (using Admin SDK)
- **Authentication:** JSON Web Tokens (JWT) + bcrypt

---

## 🚀 Local Development Setup

To run Lumina locally on your machine, follow these steps:

### Prerequisites
- Node.js (v18 or higher recommended)
- A Firebase project with **Realtime Database** enabled (Singapore `asia-southeast1` region recommended)
- A Firebase Service Account private key JSON file

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/lumina.git
cd lumina
```

### 2. Set up the Backend
```bash
cd backend
npm install
```

1. Generate a **Service Account Private Key** JSON file from the Firebase Console (Project Settings -> Service Accounts).
2. Save this JSON file inside the `backend/` folder and name it exactly **`serviceAccountKey.json`**.
3. Create a `.env` file in the `/backend` directory and add the following variables:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.asia-southeast1.firebasedatabase.app
```

Start the backend server:
```bash
npm run dev
```
*The server will start running on `http://localhost:5000`.*

### 3. Set up the Frontend
Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*The React app will start running on `http://localhost:5173`.*

---

## 📚 Project Architecture

Curious about how the project is structured under the hood? Check out our comprehensive [PROJECT_NOTES.md](./PROJECT_NOTES.md) for a deep dive into the routing, component structure, state flow, and backend design.

---

## 📜 License

This project is licensed under the MIT License. Feel free to fork, modify, and use it for your own personal growth!
