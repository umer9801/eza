# 🚀 EZA Logistics

Modern logistics management system with MongoDB integration and admin dashboard.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Admin Login
Go to: `http://localhost:3000/admin/login`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

*(You can change these in `.env` file)*

---

## Features

### ✅ Quote Form (`/quote`)
- Beautiful UI with Lucide React icons
- Real-time quote calculator
- MongoDB integration
- Personal & shipment details
- Special instructions support

### ✅ Contact Form (`/contact`)
- MongoDB integration
- Email validation
- Status tracking

### ✅ Admin Dashboard (`/admin/dashboard`)
- Simple password protection (no complex JWT)
- Overview statistics
- Contact submissions view
- Quote requests view
- Status management

---

## Configuration

Create `.env` file (or use `.env.example`):

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://eza:eza1122@cluster0.mdgwuxa.mongodb.net/

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

---

## Important URLs

- **Home**: http://localhost:3000/
- **Quote Form**: http://localhost:3000/quote
- **Contact Form**: http://localhost:3000/contact
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

---

## Tech Stack

- **Frontend**: React + TanStack Router
- **UI**: Shadcn/ui + Tailwind CSS
- **Icons**: Lucide React
- **Database**: MongoDB Atlas
- **Server Functions**: TanStack Start

---

## Project Structure

```
src/
├── components/
│   └── site/
│       ├── QuoteForm.tsx      # Quote request form
│       └── ContactForm.tsx    # Contact form
├── lib/
│   ├── mongodb.ts             # MongoDB connection
│   ├── models.ts              # Data schemas
│   └── server-functions.ts    # Server functions
├── routes/
│   ├── quote.tsx              # Quote page
│   ├── contact.tsx            # Contact page
│   └── admin/
│       ├── login.tsx          # Admin login
│       └── dashboard.tsx      # Admin dashboard
```

---

## MongoDB Collections

- **contacts** - Contact form submissions
- **quotes** - Quote requests
- ~~admins~~ - Not needed (using env variables)

---

## Security

- Admin credentials stored in environment variables
- Simple password protection (no JWT complexity)
- MongoDB connection secured with credentials
- Input validation on all forms

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## That's It!

Simple, clean, no overcomplicated authentication! 🎉
