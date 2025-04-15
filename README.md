
# Kevin's Computer Accessories Shop

A modern e-commerce web application built with React.js and Tailwind CSS, specializing in computer accessories for the Indian market.

## 🌟 Features

### 🏠 Home Page
- Responsive grid layout of computer accessories
- Product cards with:
  - Image preview
  - Title
  - Price in INR
  - Add to cart functionality
  - Quantity controls
- Smooth animations on interactions

### 🛒 Shopping Cart
- Sliding sidebar animation
- Real-time cart updates
- Product management:
  - Adjust quantities
  - Remove items
  - View total price
- Proceed to payment option

### 💳 Payment Section
- Multiple payment options:
  - Razorpay integration
  - Google Pay
  - UPI with QR code
- Order summary with:
  - Items list
  - Subtotal
  - Shipping fee (free above ₹10,000)
  - GST calculation (18%)
  - Total amount

### ✅ Order Confirmation
- Thank you message with animation
- Order details:
  - Generated order ID
  - Purchase summary
  - Delivery estimation
  - Payment method used

## 🔧 Technical Implementation

### Project Structure
```
src/
├── components/
│   ├── CartItem.tsx         # Individual cart item component
│   ├── CartSidebar.tsx      # Shopping cart sidebar
│   ├── Footer.tsx           # Website footer
│   ├── PaymentSection.tsx   # Payment processing
│   ├── ProductCard.tsx      # Product display card
│   └── ThankYouSection.tsx  # Order confirmation
├── context/
│   └── CartContext.tsx      # Cart state management
├── data/
│   └── sampleProducts.ts    # Product database
├── pages/
│   ├── Index.tsx           # Home page
│   └── NotFound.tsx        # 404 page
└── types.ts                # TypeScript definitions
```

### Key Technologies
- **React.js**: Frontend framework
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first styling
- **Context API**: State management
- **React Router**: Navigation
- **Sonner**: Toast notifications
- **Lucide React**: Icon library
- **TanStack Query**: Data fetching

### State Management
The application uses React's Context API with useReducer for cart state management. The cart state includes:
- Items in cart
- Cart visibility
- Payment status
- Order information

### Animations
Implemented using Tailwind's built-in animation utilities:
- Fade-in/out effects
- Sliding animations
- Scale transitions
- Hover effects

## 💡 Usage

1. **Browse Products**
   - View computer accessories on the home page
   - Hover over products for additional information

2. **Shopping Cart**
   - Click "Add to Cart" on products
   - Adjust quantities using +/- buttons
   - Remove items using the trash icon
   - View cart total and proceed to payment

3. **Payment Process**
   - Select payment method
   - Review order summary
   - Complete transaction
   - View order confirmation

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Responsive Design
The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 Styling
- Modern and clean UI using Tailwind CSS
- Consistent color scheme with purple accent colors
- Responsive grid layouts
- Interactive animations
- Mobile-first approach

## 🔔 Notifications
Toast notifications inform users about:
- Products added to cart
- Items removed from cart
- Successful payments
- Other important actions

## 👨‍💻 Developer
Website developed by Kevin Patel
Portfolio: [https://kevinpatel.me/](https://kevinpatel.me/)
