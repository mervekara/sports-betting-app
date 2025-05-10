# 🏆 Sports Betting App

This is a responsive sports betting web application built with **React**, **Redux**, **Tailwind CSS**, and **Framer Motion**. The application also integrates **Firebase Authentication** and **Firebase Analytics**.

## 🔗 Live Demo

➡️ [View Live App](https://sports-betting-app-sooty.vercel.app/)

## 🚀 Technologies Used

- **React 19** – UI development
- **Redux** – State management
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Animations
- **Firebase** – Authentication & Analytics

## 📱 Features

- **Responsive Design** – Works smoothly across devices.
- **Component-Based Architecture** – Modular and scalable code structure.
- **Sidebar Navigation** – Sports groups listed in the sidebar. Each group expands to show subcategories.
- **Match Listing** – Clicking a group displays related matches.
- **Match Search** – Ability to search for specific matches.
- **Match Detail View** – Clicking on a match displays detailed info and odds.
- **Bet Slip (Cart)** – Clicking on an odd adds it to the cart. Only **one odd per match** can be added.
- **Firebase Analytics Integration** – Tracks:
  - Match detail views
  - Odds added to cart
  - Odds removed from cart

## 🔐 Authentication Note

- Firebase Authentication is set up using **anonymous users**.
- ➤ _There was no specific requirement for user login, so authentication is anonymous._
- Similarly, since **there was no information about actual purchasing flow**, the implementation allows adding to cart only — **no purchase process is included**.
- Login features were not used in this phase.

## 🧱 Project Structure

The project uses a **component-based architecture**, ensuring reusable, maintainable, and scalable UI development.

Example folder structure:

```
src/
├── components/
├── redux/
├── hooks/
├── types/
├── constants/
└── pages/
```

## 🔐 Environment Configuration

All sensitive API keys (e.g., Firebase, Odds API) are managed through `.env` files.  
➡️ _You can easily run the project with your own keys by updating the `.env` file._

**Example:**

```env
VITE_ODDS_API_KEY=your-key-here
VITE_ODDS_API_URL=your-api-url
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

> 🔒 **Note:** Do not commit your `.env` file. It is ignored by `.gitignore`.

## ⚙️ Installation & Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/mervekara/sports-betting-app.git
cd sports-betting-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Create `.env` File

Fill in your environment variables as shown above.

### 4. Run the App

```bash
npm run dev
# or
yarn dev
```
