# ✨ Lumina (formerly HabitFlow)

Lumina is a premium, "quiet luxury" habit-tracking application designed to help users build consistency through aesthetic reinforcement. It features a beautifully animated React frontend and a robust Node.js/Express backend.

## 🚀 Deployment Guide

This guide provides a step-by-step process for deploying the Lumina stack to production using **MongoDB Atlas** (Database), **Render** (Backend API), and **Vercel** (Frontend UI).

---

### Step 1: Set up MongoDB Atlas (Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Click **Build a Database** and select the **M0 Free** cluster.
3. Choose your preferred cloud provider (AWS, Google Cloud, or Azure) and a region closest to your users. Click **Create**.
4. **Security Setup:**
   - Under **Database Access**, add a new database user. Create a secure username and password (save this, you will need it later).
   - Under **Network Access**, click **Add IP Address**. Choose **Allow Access from Anywhere** (or specifically whitelist your backend server's IP later for more security).
5. Once your cluster is provisioned, click **Connect**, select **Drivers**, and copy your connection string. 
   - *It will look like this:* `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with the password you just created.

---

### Step 2: Deploy the Backend to Render.com
1. Create a GitHub repository and push your entire Lumina project (both `frontend` and `backend` folders) to it.
2. Go to [Render.com](https://render.com) and sign in with GitHub.
3. Click **New** and select **Web Service**.
4. Connect the GitHub repository containing your Lumina project.
5. **Configure the Web Service:**
   - **Name:** `lumina-backend`
   - **Root Directory:** `backend` (This is crucial so Render knows where your backend code lives).
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start` (Make sure your backend `package.json` has a `"start": "node server.js"` script).
6. **Environment Variables:**
   - Scroll down to Environment Variables and add the following:
     - `PORT` = `5000`
     - `MONGODB_URI` = `[Your MongoDB Atlas Connection String from Step 1]`
     - `JWT_SECRET` = `[A long, random secure string of your choice]`
7. Click **Create Web Service**. Render will now build and deploy your backend. 
8. Once live, copy the URL Render gives you (e.g., `https://lumina-backend.onrender.com`). You will need this for the frontend.

---

### Step 3: Deploy the Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New** -> **Project**.
3. Import the exact same GitHub repository you used for the backend.
4. **Configure the Project:**
   - **Project Name:** `lumina-app`
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click Edit and select `frontend`.
5. **Environment Variables:**
   - Add the following variable so your frontend knows where your live backend is:
   - `VITE_API_URL` = `https://lumina-backend.onrender.com/api` (Use the exact URL you got from Render in Step 2, ensuring it ends with `/api`).
6. Click **Deploy**. Vercel will build the frontend and generate a live URL for your application!

🎉 **Congratulations! Lumina is now live in production.**

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Query, Lucide Icons.
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT).
