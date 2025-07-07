# 🌾 Elghella - Modern Agricultural Platform

A comprehensive digital platform for the agricultural sector in Algeria, built with React, TypeScript, Vite, and Supabase.

## 🚀 Features

### 👥 User Management
- **User Registration & Login** with email verification
- **Profile Management** with personal information
- **Phone Number Validation** (Algerian format)
- **Secure Authentication** using Supabase Auth

### 🛒 Product Management
- **Add Products** with images, descriptions, and pricing
- **Product Categories**: Grains, Vegetables, Fruits, Feed, Nuts
- **Product Search & Filtering** by type and price
- **Inventory Management** for sellers
- **Public Product Listings** for buyers

### 🚜 Equipment Rental
- **Equipment Listings** with condition status
- **Equipment Categories**: Various farming equipment
- **Rental Pricing** and availability
- **Equipment Search & Filtering**
- **Image Gallery** for equipment

### 🌱 Land Rental
- **Land Listings** with location and area
- **Soil Type Classification**
- **Land Search** by location and area
- **Pricing per hectare**
- **Land Availability** status

### 👨‍🌾 Expert Services
- **Expert Profiles** with skills and specializations
- **Expert Search** by location and expertise
- **Direct Contact** with experts
- **Expert Verification** system

### 💬 Communication
- **Messaging System** between buyers and sellers
- **Real-time Chat** functionality
- **Message History** and threading
- **Contact Management**

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hook Form** for form management
- **Lucide React** for icons

### Backend
- **Supabase** for database and authentication
- **PostgreSQL** as the database
- **Row Level Security** for data protection
- **Supabase Storage** for file uploads
- **Real-time subscriptions** for live updates

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/elghella-v3.git
   cd elghella-v3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up the database**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the contents of `database_setup.sql`

5. **Configure Storage**
   - In Supabase dashboard, go to Storage
   - Create buckets: `product-images`, `equipment-images`, `experts`
   - Set bucket policies for public read and authenticated write

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## 🧪 Testing

### Quick Testing
Follow the `QUICK_TESTING_GUIDE.md` for essential tests:
1. Test user registration and login
2. Test adding products, equipment, and land
3. Test the messaging system
4. Test inventory management

### Comprehensive Testing
Use the `TESTING_CHECKLIST.md` for thorough testing of all features.

## 📝 Key Files

- `database_setup.sql` - Complete database schema setup
- `TESTING_CHECKLIST.md` - Comprehensive testing guide
- `QUICK_TESTING_GUIDE.md` - Quick testing steps
- `src/lib/supabaseClient.ts` - Supabase configuration
- `src/context/AuthContext.tsx` - Authentication context
- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/api/` - API services

## 🔐 Security Features

- **Row Level Security** on all database tables
- **User data isolation** - users can only access their own data
- **Input validation** on all forms
- **Secure file uploads** with type and size validation
- **Protected routes** for authenticated users only

## 📱 Mobile Responsive

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🌐 Arabic Language Support

- Full RTL (Right-to-Left) text support
- Arabic fonts and typography
- Localized content for Algerian users
- Arabic form validation messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the agricultural community of Algeria**
