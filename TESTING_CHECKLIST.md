# Agricultural Platform Testing Checklist

## Application Overview
This is a comprehensive testing checklist for the modern agricultural platform built with React, Vite, and Supabase.

**Application URL:** http://localhost:5173

## 🔐 Authentication & User Management

### Registration Testing
- [ ] **Sign Up Form** (`/signup`)
  - [ ] Navigate to registration page
  - [ ] Test with valid Algerian phone number (06/07/05 format)
  - [ ] Test with invalid phone number format
  - [ ] Test with weak password (less than 8 characters)
  - [ ] Test with non-matching password confirmation
  - [ ] Test with invalid email format
  - [ ] Test with all valid information
  - [ ] Check for success message
  - [ ] Verify user profile creation in database
  - [ ] Check email confirmation

### Login Testing
- [ ] **Login Form** (`/login`)
  - [ ] Test with unregistered email
  - [ ] Test with wrong password
  - [ ] Test with valid credentials
  - [ ] Check for successful login redirect
  - [ ] Verify user authentication state
  - [ ] Check session persistence

### Profile Management
- [ ] **Profile Page** (`/profile`)
  - [ ] Access profile as authenticated user
  - [ ] View user information
  - [ ] Check user's products/equipment/lands display
  - [ ] Verify profile data accuracy

## 📦 Product Management

### Add Products
- [ ] **Add Product Form** (`/addproduct`)
  - [ ] Access form when authenticated
  - [ ] Test required field validation
  - [ ] Test product name input
  - [ ] Test product type selection (الحبوب, الخضروات, الفواكه, الأعلاف, المكسرات)
  - [ ] Test price validation (positive numbers only)
  - [ ] Test quantity validation (positive numbers only)
  - [ ] Test description input
  - [ ] Test image upload functionality
  - [ ] Submit form with all valid data
  - [ ] Check success message
  - [ ] Verify product appears in database
  - [ ] Check product appears in public listings

### Product Listings
- [ ] **Public Products** (`/publiclistings`)
  - [ ] View all public products
  - [ ] Test product filtering by type
  - [ ] Test product search functionality
  - [ ] Click on product to view details
  - [ ] Test messaging seller functionality
  - [ ] Check product image display

### Manage Products
- [ ] **Manage Inventory** (`/manage`)
  - [ ] View user's products
  - [ ] Test edit product functionality
  - [ ] Test delete product functionality
  - [ ] Check inventory updates

## 🚜 Equipment Management

### Add Equipment
- [ ] **Add Equipment Form** (`/addequipment`)
  - [ ] Access form when authenticated
  - [ ] Test required field validation
  - [ ] Test equipment name input
  - [ ] Test equipment type selection
  - [ ] Test condition selection (NEW, USED, REFURBISHED, DAMAGED)
  - [ ] Test price validation
  - [ ] Test description input
  - [ ] Test multiple image upload
  - [ ] Submit form with all valid data
  - [ ] Check success message
  - [ ] Verify equipment appears in database
  - [ ] Check equipment appears in public listings

### Equipment Listings
- [ ] **Public Equipment** (`/publiclistings`)
  - [ ] View all public equipment
  - [ ] Test equipment filtering by type
  - [ ] Test equipment search functionality
  - [ ] Click on equipment to view details
  - [ ] Test messaging functionality
  - [ ] Check equipment image display

### Manage Equipment
- [ ] **Manage Inventory** (`/manage`)
  - [ ] View user's equipment
  - [ ] Test edit equipment functionality
  - [ ] Test delete equipment functionality
  - [ ] Check inventory updates

## 🌱 Land Management

### Add Land
- [ ] **Add Land Form** (`/addlandrent`)
  - [ ] Access form when authenticated
  - [ ] Test required field validation
  - [ ] Test location input
  - [ ] Test area validation (positive numbers)
  - [ ] Test soil type selection
  - [ ] Test price validation
  - [ ] Test description input
  - [ ] Test image upload functionality
  - [ ] Submit form with all valid data
  - [ ] Check success message
  - [ ] Verify land appears in database
  - [ ] Check land appears in public listings

### Land Listings
- [ ] **Public Lands** (`/publiclistings`)
  - [ ] View all public lands
  - [ ] Test land filtering
  - [ ] Test land search functionality
  - [ ] Click on land to view details
  - [ ] Test messaging functionality
  - [ ] Check land image display

### Manage Lands
- [ ] **Manage Inventory** (`/manage`)
  - [ ] View user's lands
  - [ ] Test edit land functionality
  - [ ] Test delete land functionality
  - [ ] Check inventory updates

## 👨‍🌾 Expert Management

### Add Expert
- [ ] **Add Expert Form** (`/experts/add`)
  - [ ] Access form when authenticated
  - [ ] Test required field validation
  - [ ] Test name and surname input
  - [ ] Test wilaya selection
  - [ ] Test skills input
  - [ ] Test email validation
  - [ ] Test phone number validation
  - [ ] Test image upload
  - [ ] Submit form with all valid data
  - [ ] Check success message
  - [ ] Verify expert appears in database

### Expert Listings
- [ ] **Experts List** (`/experts`)
  - [ ] View all experts
  - [ ] Test expert filtering
  - [ ] Test expert search functionality
  - [ ] Click on expert to view details
  - [ ] Test contact functionality

## 💬 Messaging System

### Send Messages
- [ ] **Message from Listings** (`/publiclistings`)
  - [ ] Click on any listing
  - [ ] Test message form
  - [ ] Send message to seller
  - [ ] Check message sent confirmation
  - [ ] Verify message appears in database

### Inbox
- [ ] **Inbox Page** (`/inbox`)
  - [ ] Access inbox when authenticated
  - [ ] View received messages
  - [ ] View sent messages
  - [ ] Test message threading
  - [ ] Test reply functionality

## 🔍 Search and Filtering

### Global Search
- [ ] **Search Functionality**
  - [ ] Test search across all products
  - [ ] Test search across all equipment
  - [ ] Test search across all lands
  - [ ] Test search with Arabic text
  - [ ] Test search with partial matches

### Filtering
- [ ] **Filter Options**
  - [ ] Test product type filtering
  - [ ] Test equipment type filtering
  - [ ] Test land type filtering
  - [ ] Test price range filtering
  - [ ] Test availability filtering

## 📱 User Interface & Experience

### Navigation
- [ ] **Navigation Menu**
  - [ ] Test all menu items
  - [ ] Check authenticated vs unauthenticated menus
  - [ ] Test mobile responsive navigation
  - [ ] Test breadcrumb navigation

### Responsive Design
- [ ] **Mobile Testing**
  - [ ] Test on mobile viewport
  - [ ] Check form usability on mobile
  - [ ] Test navigation on mobile
  - [ ] Check image display on mobile

### Error Handling
- [ ] **Error States**
  - [ ] Test network error handling
  - [ ] Test form validation errors
  - [ ] Test database connection errors
  - [ ] Check error message display

## 🚀 Performance & Technical

### Loading States
- [ ] **Loading Indicators**
  - [ ] Check loading states on forms
  - [ ] Check loading states on data fetch
  - [ ] Test loading timeouts
  - [ ] Verify loading animations

### Image Handling
- [ ] **Image Upload & Display**
  - [ ] Test image upload functionality
  - [ ] Check image compression
  - [ ] Test image preview
  - [ ] Verify image storage in Supabase
  - [ ] Check image URL generation
  - [ ] Test image display on listings

### Database Operations
- [ ] **CRUD Operations**
  - [ ] Test Create operations
  - [ ] Test Read operations
  - [ ] Test Update operations
  - [ ] Test Delete operations
  - [ ] Check database constraints
  - [ ] Verify Row Level Security

## 🔒 Security Testing

### Authentication Security
- [ ] **Auth Security**
  - [ ] Test protected routes
  - [ ] Test session management
  - [ ] Test logout functionality
  - [ ] Check unauthorized access prevention

### Data Security
- [ ] **Data Protection**
  - [ ] Test RLS policies
  - [ ] Check user data isolation
  - [ ] Test input sanitization
  - [ ] Verify XSS prevention

## 🎯 Business Logic

### Ownership & Permissions
- [ ] **User Permissions**
  - [ ] Users can only edit their own listings
  - [ ] Users can only delete their own listings
  - [ ] Users can message other users
  - [ ] Users can view all public listings

### Data Validation
- [ ] **Business Rules**
  - [ ] Test price validation rules
  - [ ] Test quantity validation rules
  - [ ] Test required field enforcement
  - [ ] Test data type validation

## 📊 Common Issues to Test

### Known Potential Issues
- [ ] **Column Existence**
  - [ ] Check if `isAvailable` column exists in all tables
  - [ ] Check if `user_id` column exists in all tables
  - [ ] Check if `images` column exists for image storage
  - [ ] Check if `quantity` column exists in products table
  - [ ] Check if `area` column exists in lands table
  - [ ] Check if `soilType` column exists in lands table
  - [ ] Check if `wilaya` column exists in experts table
  - [ ] Check if `skills` column exists in experts table

### Error Scenarios
- [ ] **Expected Errors**
  - [ ] Test duplicate email registration
  - [ ] Test accessing protected routes without auth
  - [ ] Test uploading invalid file formats
  - [ ] Test uploading oversized files
  - [ ] Test submitting empty forms
  - [ ] Test invalid data formats

## 🎉 Success Criteria

### Core Functionality Working
- [ ] Users can register and login successfully
- [ ] Users can add products, equipment, and lands
- [ ] Users can view and search public listings
- [ ] Users can message other users
- [ ] Users can manage their own listings
- [ ] All CRUD operations work correctly
- [ ] Image upload and display works
- [ ] Authentication and authorization work
- [ ] Database operations are secure
- [ ] The application is responsive and user-friendly

### Performance Standards
- [ ] Pages load within 3 seconds
- [ ] Forms submit without errors
- [ ] Images load and display correctly
- [ ] Search results appear quickly
- [ ] No console errors in browser
- [ ] No broken links or 404 errors

## 📝 Testing Notes

### Test Data
- Use realistic test data for thorough testing
- Test with Arabic text for all text fields
- Test with various image formats and sizes
- Test with different user scenarios

### Browser Testing
- Test on Chrome, Firefox, Safari, Edge
- Test on mobile browsers
- Test with different screen sizes
- Test with slow network connections

### Reporting Issues
- Document any bugs or issues found
- Include steps to reproduce
- Note browser and device information
- Capture screenshots for UI issues

---

## 🏁 Final Checklist

Before marking the application as complete:

- [ ] All critical features work correctly
- [ ] No critical bugs present
- [ ] User experience is smooth and intuitive
- [ ] All forms validate properly
- [ ] Database operations are secure
- [ ] Application handles errors gracefully
- [ ] Performance meets requirements
- [ ] Code is properly documented
- [ ] All tests pass successfully

---

**Testing Date:** ___________
**Tester:** ___________
**Version:** ___________
**Status:** ___________
