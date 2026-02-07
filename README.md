# QuizMaster - Next.js Quiz Application with MongoDB

A modern, full-stack quiz application built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB.

## Features

‚ú® **Professional UI Design**
- Beautiful, responsive design with dark mode support
- Modern gradients, animations, and hover effects
- Professional SVG icons (no emojis)
- Smooth transitions and interactive elements

ÌæØ **Quiz Functionality**
- Multiple quiz categories (General Knowledge, Islam, Science, History)
- Timed questions with 30-second countdown
- Automatic progression to next question
- Real-time score tracking
- Detailed results with performance feedback

Ì∑ÑÔ∏è **MongoDB Integration**
- User profiles with persistent stats
- Quiz categories and questions storage
- Score history and leaderboard
- Custom quiz creation and storage

Ì≥ä **User Features**
- Personal dashboard with statistics
- Score history tracking
- Global leaderboard (Top 10)
- Custom quiz creator
- Theme toggle (Light/Dark mode)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **State Management**: React Context API
- **Icons**: Custom SVG icons (Heroicons style)

## Installation & Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

Make sure MongoDB is running on your local machine at `mongodb://localhost:27017`

### 3. Seed the Database

Initialize the database with default quizzes:

```bash
npm run seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run seed     # Seed database with default quizzes
```

**Note**: Make sure MongoDB is running before starting the application!
