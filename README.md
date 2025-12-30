# Elgemo Chat

A real-time chat application built with Next.js 16, Socket.io, and MongoDB. This project features instant messaging, room-based conversations, user authentication, and a modern UI powered by Radix UI and Tailwind CSS.

## Features

- **Real-time Messaging**: Instant message delivery using Socket.io.
- **Authentication**: Secure login and registration with JWT and password hashing.
- **Room Management**: Create and join chat rooms for group conversations.
- **Media Support**: Send text messages, images, and files.
- **Responsive UI**: Built with Tailwind CSS and Radix UI components for a polished experience.
- **Database Persistence**: Messages and user data stored in MongoDB using Mongoose.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI, Lucide Icons
- **Real-time**: Socket.io & Socket.io-client
- **Backend**: Express.js (standalone server)
- **Database**: MongoDB & Mongoose
- **Auth**: JWT & bcryptjs
- **Forms**: React Hook Form & Zod

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory (see [Environment Variables](#environment-variables)).

3. Start the development environment:
   
   In terminal 1 (Next.js client):
   ```bash
   npm run dev
   ```

   In terminal 2 (Socket.io server):
   ```bash
   npm run dev:server
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_secure_random_secret_key

# Socket.io Configuration (Optional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_HOST=localhost
NEXT_PUBLIC_SOCKET_PORT=3001
PORT=3001
```

## Project Structure

- `app/`: Next.js pages and API routes.
- `components/`: Reusable UI components.
- `hooks/`: Custom React hooks (auth, socket, etc.).
- `lib/`: Shared utilities and database configuration.
- `models/`: Mongoose schemas for User, Message, and Room.
- `server/`: Standalone Socket.io server implementation.

## Deployment

To deploy for production:

1. Build the Next.js application:
   ```bash
   npm run build
   ```

2. Start the production Next.js server:
   ```bash
   npm run start
   ```

3. Start the production Socket.io server:
   ```bash
   npm run start-server
