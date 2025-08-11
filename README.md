# 🔗 URLShortener - Professional URL Shortening Service

[![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)](https://github.com/yourusername/urlshortener)

> **A modern, feature-rich URL shortening service built with React, Node.js, and advanced analytics capabilities. Perfect for developers, marketers, and businesses looking to track link performance and enhance user engagement.**

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Live Demo](#-live-demo)
- [🛠️ Technology Stack](#️-technology-stack)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [📱 Usage](#-usage)
- [📊 API Documentation](#-api-documentation)
- [🏗️ Project Structure](#️-project-structure)
- [🎨 Customization](#-customization)
- [📈 Performance & Analytics](#-performance--analytics)
- [🔒 Security Features](#-security-features)
- [🧪 Testing](#-testing)
- [📝 Contributing](#-contributing)
- [📄 License](#-license)
- [🤝 Support](#-support)

## ✨ Features

### 🌟 Core Functionality
- **Smart URL Shortening**: Convert long URLs into short, memorable links
- **Custom Short Codes**: Create branded, custom short URLs
- **Expiration Management**: Set automatic expiration dates for temporary links
- **QR Code Generation**: Generate QR codes for easy mobile sharing
- **Bulk URL Management**: Handle multiple URLs efficiently

### 📊 Advanced Analytics
- **Real-time Click Tracking**: Monitor link performance in real-time
- **Geographic Insights**: Track visitor locations and demographics
- **Device Analytics**: Understand user device preferences
- **Time-based Analysis**: Identify peak usage patterns
- **Conversion Tracking**: Measure click-through rates and engagement
- **Custom Time Ranges**: Analyze data across 24h, 7d, and 30d periods

### 🎨 Premium Features
- **Advanced QR Customization**: Custom colors, gradients, and styles
- **Branded QR Codes**: Add logos and custom branding
- **Premium Templates**: Access to exclusive design presets
- **Priority Support**: Dedicated assistance for premium users

### 🔐 Authentication & Security
- **User Account Management**: Secure login and registration
- **Premium Subscriptions**: Tiered access to advanced features
- **Link Privacy Controls**: Manage link visibility and access
- **Rate Limiting**: Prevent abuse and ensure service stability

### 📱 User Experience
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Theme**: Customizable interface themes
- **Intuitive Dashboard**: User-friendly analytics and management
- **Social Sharing**: Easy integration with social media platforms

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful, customizable icons
- **Recharts** - Composable charting library for React
- **React Hot Toast** - Elegant notifications and alerts
- **React Router** - Declarative routing for React

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **SQLite/PostgreSQL** - Reliable database solutions
- **JWT** - Secure authentication tokens
- **Bcrypt** - Password hashing and security

### Development & Deployment
- **Webpack** - Module bundler and build tool
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting and style
- **Docker** - Containerization for easy deployment
- **GitHub Actions** - Automated CI/CD pipeline

## 📦 Installation

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/sametgurtuna/URLShortener.git
   cd urlshortener
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   ```

3. **Environment configuration**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit environment variables
   nano .env
   ```

4. **Database setup**
   ```bash
   # Initialize database
   npm run db:init
   
   # Run migrations
   npm run db:migrate
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Start backend
   npm run dev
   
   # Terminal 2: Start frontend
   cd client
   npm start
   ```

### Production Deployment

1. **Build the application**
   ```bash
   # Build frontend
   cd client
   npm run build
   
   # Build backend
   cd ..
   npm run build
   ```

2. **Environment variables**
   ```bash
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

3. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database Configuration
DATABASE_URL=sqlite:./database.sqlite
DATABASE_TYPE=sqlite

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100

# Analytics
ANALYTICS_ENABLED=true
ANALYTICS_RETENTION_DAYS=90

# External Services
REDIS_URL=redis://localhost:6379
SENTRY_DSN=your_sentry_dsn
```

### Database Configuration

The application supports multiple database types:

- **SQLite** (default, development)
- **PostgreSQL** (production recommended)
- **MySQL** (enterprise)

### Customization Options

```javascript
// config/app.js
module.exports = {
  app: {
         name: 'URLShortener',
    version: '1.0.0',
    description: 'Professional URL shortening service'
  },
  features: {
    qrCodes: true,
    analytics: true,
    premium: true,
    socialSharing: true
  },
  limits: {
    maxUrlLength: 2048,
    maxCustomCodeLength: 20,
    maxUrlsPerUser: 1000
  }
};
```

## 📱 Usage

### Basic URL Shortening

1. **Navigate to the main page**
2. **Enter your long URL** in the input field
3. **Click "Shorten Link"** to generate a short URL
4. **Copy and share** your shortened link

### Advanced Features

#### Custom Short Codes
```javascript
// Create a custom short URL
const customUrl = {
  originalUrl: 'https://example.com/very-long-url',
  customCode: 'mybrand',
  expiresIn: '30d'
};
```

#### QR Code Generation
```javascript
// Generate QR code with custom settings
const qrConfig = {
  size: 256,
  foreground: '#000000',
  background: '#ffffff',
  logo: 'logo.png'
};
```

#### Analytics Dashboard
- **Overview Stats**: Total clicks, URLs, visitors, and click rates
- **Geographic Data**: Visitor locations and country breakdowns
- **Device Analytics**: Mobile, desktop, and tablet usage
- **Time Analysis**: Peak usage hours and patterns
- **Performance Metrics**: Top-performing URLs and conversion rates

## 📊 API Documentation

### Base URL
```
https://yourdomain.com/api/v1
```

### Authentication
```http
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### URL Management

**Create Short URL**
```http
POST /urls
Content-Type: application/json

{
  "originalUrl": "https://example.com/very-long-url",
  "customCode": "optional-custom-code",
  "expiresIn": "30d"
}
```

**Get URL List**
```http
GET /urls?page=1&limit=10&sortBy=createdAt&order=desc
```

**Delete URL**
```http
DELETE /urls/:shortCode
```

#### Analytics

**Get Analytics Overview**
```http
GET /analytics/overview?timeRange=7d
```

**Get Click Data**
```http
GET /analytics/clicks?timeRange=7d&groupBy=day
```

**Get Geographic Data**
```http
GET /analytics/geography?timeRange=30d
```

### Response Format

```json
{
  "success": true,
  "data": {
    "urls": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  },
  "message": "URLs retrieved successfully"
}
```

## 🏗️ Project Structure

```
urlshortener/
├── client/                          # React frontend application
│   ├── public/                      # Static assets
│   ├── src/                         # Source code
│   │   ├── components/              # React components
│   │   │   ├── Analytics/           # Analytics dashboard components
│   │   │   ├── Auth/                # Authentication components
│   │   │   ├── Premium/             # Premium feature components
│   │   │   └── Social/              # Social sharing components
│   │   ├── contexts/                # React contexts
│   │   ├── services/                # API services
│   │   └── config/                  # Configuration files
│   ├── package.json                 # Frontend dependencies
│   └── tailwind.config.js           # Tailwind CSS configuration
├── server/                          # Node.js backend application
│   ├── routes/                      # API route handlers
│   ├── middleware/                  # Express middleware
│   ├── models/                      # Database models
│   ├── services/                    # Business logic
│   └── utils/                       # Utility functions
├── database/                        # Database files and migrations
├── docs/                           # Documentation
├── tests/                          # Test files
├── .env.example                    # Environment variables template
├── package.json                    # Backend dependencies
└── README.md                       # This file
```

## 🎨 Customization

### Theme Customization

```css
/* Custom CSS variables */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
  --background-color: #ffffff;
  --text-color: #1f2937;
}

/* Dark theme */
.dark {
  --background-color: #111827;
  --text-color: #f9fafb;
}
```

### Component Styling

```javascript
// Custom component styles
const customStyles = {
  button: 'bg-gradient-to-r from-blue-500 to-purple-600',
  card: 'backdrop-blur-sm bg-white/80',
  input: 'border-2 border-gray-200 focus:border-blue-500'
};
```

### Feature Flags

```javascript
// Enable/disable features
const featureFlags = {
  qrCodes: process.env.ENABLE_QR_CODES === 'true',
  analytics: process.env.ENABLE_ANALYTICS === 'true',
  premium: process.env.ENABLE_PREMIUM === 'true'
};
```

## 📈 Performance & Analytics

### Performance Metrics

- **Page Load Time**: < 2 seconds
- **Time to Interactive**: < 3 seconds
- **Bundle Size**: < 500KB (gzipped)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

### Analytics Features

- **Real-time Tracking**: Monitor link performance instantly
- **Custom Events**: Track user interactions and conversions
- **Export Capabilities**: Download data in CSV, JSON, or Excel formats
- **API Integration**: Connect with external analytics tools
- **Privacy Compliance**: GDPR and CCPA compliant tracking

### Monitoring & Alerts

```javascript
// Performance monitoring
const performanceMonitor = {
  trackPageLoad: (url, loadTime) => {
    analytics.track('page_load', { url, loadTime });
  },
  trackApiCall: (endpoint, responseTime) => {
    analytics.track('api_call', { endpoint, responseTime });
  }
};
```

## 🔒 Security Features

### Authentication & Authorization

- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Rate Limiting**: Prevent brute force attacks
- **Session Management**: Secure session handling
- **OAuth Integration**: Social login options

### Data Protection

- **HTTPS Only**: Secure communication
- **Input Validation**: Sanitize all user inputs
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy
- **CSRF Protection**: Cross-Site Request Forgery prevention

### Privacy Compliance

- **GDPR Compliance**: European data protection
- **CCPA Compliance**: California privacy rights
- **Data Encryption**: At rest and in transit
- **User Consent**: Explicit permission for data collection
- **Data Portability**: Export user data on request

## 🧪 Testing

### Test Coverage

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit      # Unit tests
npm run test:integration # Integration tests
npm run test:e2e       # End-to-end tests

# Generate coverage report
npm run test:coverage
```

### Testing Strategy

- **Unit Tests**: Component and function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User workflow testing
- **Performance Tests**: Load and stress testing
- **Security Tests**: Vulnerability assessment

### Example Test

```javascript
// Component test example
import { render, screen } from '@testing-library/react';
import UrlShortener from '../UrlShortener';

describe('UrlShortener', () => {
  test('renders URL input field', () => {
    render(<UrlShortener />);
    expect(screen.getByPlaceholderText('Enter your URL')).toBeInTheDocument();
  });
});
```

## 📝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Update documentation**
6. **Submit a pull request**

### Contribution Guidelines

- **Code Style**: Follow ESLint and Prettier configurations
- **Commit Messages**: Use conventional commit format
- **Testing**: Ensure all tests pass
- **Documentation**: Update relevant documentation
- **Code Review**: Address feedback from maintainers

### Development Workflow

```bash
# Install development dependencies
npm install --dev

# Start development environment
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 URLShortener

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🤝 Support

### Getting Help

- **Email**: samet@gurtuna.dev

---

## 🚀 Quick Start Commands

```bash
# Clone and setup
git clone https://github.com/yourusername/urlshortener.git
cd urlshortener
npm install
cd client && npm install

# Development
npm run dev          # Backend
cd client && npm start  # Frontend

# Production
npm run build
npm start

# Testing
npm test
npm run test:coverage

# Deployment
npm run deploy
```
*If you find this project helpful, please consider giving it a ⭐ star on GitHub!*
