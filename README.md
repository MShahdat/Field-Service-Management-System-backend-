# Field Service Management System

A comprehensive backend API for managing field service operations including customers, technicians, work orders, payments, and analytics.

## 📋 Overview

This system provides a complete solution for field service management with role-based access control, supporting customers, technicians, managers, and administrators. Features include service requests, work order management, technician assignment, payment processing (bKash), file attachments, service reports, feedback system, and analytics dashboards.

## ✨ Features

- **Role-based access control** — SUPER_ADMIN, ADMIN, MANAGER, TECHNICIAN, CUSTOMER with scoped permissions
- **Authentication** — JWT access/refresh tokens, email OTP verification, password reset, Google & Facebook OAuth (Passport.js)
- **Service request lifecycle** — customers submit requests → manager review → technician assignment → work order execution
- **Technician management** — skill-based eligibility matching, region assignment, two-step profile completion
- **Work order tracking** — status updates from creation through completion
- **Payments** — bKash integration with create/callback flow, role-specific payment history
- **File attachments** — Cloudinary-backed uploads with soft delete, scoped by role
- **Service reports** — technicians upload/update job reports post-completion
- **Feedback & ratings** — customers rate and review completed services
- **Manager onboarding** — apply → email verify → admin approval workflow
- **Region & category master data** — admin-managed, many-to-many linked to skills
- **Analytics dashboards** — role-specific stats for admin, manager, technician, and customer
- **Caching** — Redis for performance-sensitive reads
- **Email notifications** — Nodemailer with EJS templates for OTPs, approvals, etc.

---


## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Runtime** | Node.js, TypeScript |
| **Framework** | Express.js v5 |
| **Database** | PostgreSQL with Prisma ORM |
| **Authentication** | JWT (Access/Refresh tokens), Passport.js (Google, Facebook OAuth) |
| **Validation** | Zod |
| **File Storage** | Cloudinary |
| **Payment Gateway** | bKash |
| **Email** | Nodemailer |
| **Caching** | Redis |
| **Code Quality** | Biome (linting/formatting) |
| **Build Tool** | tsup |
| **Development** | tsx |

## 📁 Folder Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Entry point
├── app/
│   ├── config/
│   │   └── env.ts         # Environment configuration
│   ├── lib/
│   │   ├── prisma.ts, redis.ts, cloudinary.ts, bkash.ts, passport.ts, nodemailer.ts
│   ├── middleware/
│   │   ├── auth.ts        # JWT authentication
│   │   ├── globalErrorHandler.ts
│   │   ├── notFound.ts
│   │   └── zodValidation.ts
│   ├── utils/
│   ├── template/          # EJS email templates
│   └── module/            # Feature modules
│       ├── auth/
│       ├── region/
│       ├── manager/
│       ├── category/
│       ├── service/
│       ├── skill/
│       ├── technician/
│       ├── workOrder/
│       ├── payment/
│       ├── attachment/
│       ├── report/
│       ├── feedback/
│       ├── user/
│       └── analytics/
├── generated/prisma/      # Generated Prisma models
└── prisma/
    └── schema/            # Prisma schema files
```

## 🔐 Authentication & Roles

| Role | Description |
|------|-------------|
| `SUPER_ADMIN` | Full system access |
| `ADMIN` | Administrative access |
| `MANAGER` | Service management, technician assignment |
| `TECHNICIAN` | Work order execution, reports |
| `CUSTOMER` | Service requests, payments, feedback |

**Auth Headers:**
- Access Token: `Authorization: Bearer <access_token>`
- Refresh Token: `Cookie: refreshToken=<token>`

## 📡 API Endpoints

All endpoints are prefixed with `/api/v1`

### Auth Module (`/auth`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/register` | ❌ | `{email, password, name, phone}` | Register customer & send OTP |
| POST | `/email-verify` | ❌ | `{email, otp}` | Verify email with OTP |
| POST | `/login` | ❌ | `{email, password}` | User login |
| GET | `/me` | ✅ (All roles) | - | Get current user profile |
| POST | `/refresh-token` | ❌ | - | Refresh access token |
| POST | `/forgot-password` | ❌ | `{email}` | Request password reset OTP |
| POST | `/reset-password` | ❌ | `{email, otp, newPassword}` | Reset password |
| GET | `/google` | ❌ | - | Initiate Google OAuth |
| GET | `/google/callback` | ❌ | - | Google OAuth callback |
| GET | `/facebook` | ❌ | - | Initiate Facebook OAuth |
| GET | `/facebook/callback` | ❌ | - | Facebook OAuth callback |
| GET | `/logout` | ✅ (All roles) | - | User logout |

### Region Module (`/region`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/` | ✅ (ADMIN, SUPER_ADMIN) | `{name, description}` | Create region |
| GET | `/all-region` | ✅ (ADMIN, SUPER_ADMIN) | - | Get all regions (admin view) |
| GET | `/` | ❌ | - | Get regions (public) |
| PUT | `/:regionId` | ✅ (ADMIN, SUPER_ADMIN) | `{name, description}` | Update region |

### Manager Module (`/manager`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/manager-apply` | ❌ | `{email, password, name, phone, regionId}` | Apply as manager |
| POST | `/email-verify` | ❌ | `{email, otp}` | Verify manager email |
| POST | `/manager-approved` | ✅ (ADMIN, SUPER_ADMIN) | `{managerId, status}` | Approve/reject manager |
| GET | `/all-managers` | ✅ (ADMIN, SUPER_ADMIN) | - | List all managers |

### Category Module (`/category`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/` | ✅ (ADMIN, SUPER_ADMIN) | `{name, description}` | Create category |
| GET | `/all` | ❌ | - | Get categories (public) |
| GET | `/all-category` | ✅ (ADMIN, SUPER_ADMIN) | - | Get all categories (admin) |
| PUT | `/:categoryId` | ✅ (ADMIN, SUPER_ADMIN) | `{name, description}` | Update category |

### Service Module (`/service`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/` | ✅ (CUSTOMER) | `{categoryId, title, description, address, regionId, preferredDate}` | Create service request |
| GET | `/my-services` | ✅ (CUSTOMER) | - | Get customer's services |
| GET | `/all-services` | ✅ (ADMIN, SUPER_ADMIN) | - | Get all services (admin) |
| GET | `/:serviceId` | ✅ (ADMIN, SUPER_ADMIN, CUSTOMER) | - | Get single service |
| POST | `/review` | ✅ (MANAGER) | `{serviceId, status, comment}` | Review service request |
| POST | `/assign-technician` | ✅ (MANAGER) | `{serviceId, technicianId}` | Assign technician |
| GET | `/workOrder/:workOrderId` | ✅ (MANAGER) | - | Get eligible technicians |
| PATCH | `/workOrder/technician-assign` | ✅ (MANAGER) | `{workOrderId, technicianId}` | Assign technician to work order |

### Skill Module (`/skill`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/` | ✅ (ADMIN, SUPER_ADMIN) | `{name, description}` | Create skill |
| GET | `/all` | ❌ | - | Get skills (public) |
| GET | `/all-skill` | ✅ (ADMIN, SUPER_ADMIN) | - | Get all skills (admin) |
| PUT | `/:skillId` | ✅ (ADMIN, SUPER_ADMIN) | `{name, description}` | Update skill |

### Technician Module (`/technician`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| PATCH | `/me/profile` | ✅ (TECHNICIAN) | `{skills[], regionId, experience, bio}` | Complete technician profile |

### Work Order Module (`/workorder`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| GET | `/my-workorder` | ✅ (TECHNICIAN, CUSTOMER, MANAGER) | - | Get my work orders |
| GET | `/new-workorder` | ✅ (TECHNICIAN) | - | Get available work orders |
| PATCH | `/update` | ✅ (TECHNICIAN) | `{workOrderId, status}` | Update work order status |

### Payment Module (`/payment`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/create` | ✅ (CUSTOMER) | `{serviceId, amount}` | Create bKash payment |
| GET | `/service/callback` | ❌ | Query params | bKash payment callback |
| GET | `/my-payments` | ✅ (CUSTOMER) | - | Get customer payments |
| GET | `/technician-payments` | ✅ (TECHNICIAN) | - | Get technician payments |
| GET | `/manager-payments` | ✅ (MANAGER) | - | Get manager payments |
| GET | `/all-payments` | ✅ (ADMIN, SUPER_ADMIN) | - | Get all payments |

### Attachment Module (`/attachment`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/` | ✅ (CUSTOMER, MANAGER, TECHNICIAN) | `multipart/form-data` (files) | Upload attachments |
| GET | `/my-attachments` | ✅ (CUSTOMER) | - | Get customer attachments |
| GET | `/technician-attachments` | ✅ (TECHNICIAN) | - | Get technician attachments |
| GET | `/manager-attachments` | ✅ (MANAGER) | - | Get manager attachments |
| GET | `/all-attachments` | ✅ (ADMIN, SUPER_ADMIN) | - | Get all attachments |
| PATCH | `/update/:attachmentId` | ✅ (All roles) | `{description}` | Update attachment |
| PATCH | `/delete/:attachmentId` | ✅ (All roles) | - | Soft delete attachment |

### Service Report Module (`/service-report`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/` | ✅ (TECHNICIAN) | `multipart/form-data` (report file) | Upload service report |
| GET | `/my-reports` | ✅ (TECHNICIAN) | - | Get technician reports |
| GET | `/all-reports` | ✅ (ADMIN, SUPER_ADMIN) | - | Get all reports |
| PATCH | `/update/:reportId` | ✅ (TECHNICIAN) | `multipart/form-data` | Update report |
| PATCH | `/delete/:reportId` | ✅ (TECHNICIAN, ADMIN, SUPER_ADMIN) | - | Delete report |

### Feedback Module (`/feedback`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/` | ✅ (CUSTOMER) | `{serviceId, rating, comment}` | Create feedback |
| GET | `/:feedbackId` | ✅ (ADMIN, SUPER_ADMIN) | - | Get feedback by ID |
| GET | `/` | ❌ | - | Get all feedbacks |
| PUT | `/update/:feedbackId` | ✅ (CUSTOMER) | `{rating, comment}` | Update feedback |
| DELETE | `/delete/:feedbackId` | ✅ (CUSTOMER) | - | Delete feedback |

### User Module (`/user`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| PATCH | `/profile-image` | ✅ (All roles) | `multipart/form-data` (profile) | Upload profile image |
| PATCH | `/customer/update-profile` | ✅ (CUSTOMER) | `{name, phone, address}` | Update customer profile |

### Analytics Module (`/analytics`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| GET | `/admin` | ✅ (ADMIN, SUPER_ADMIN) | - | Admin dashboard stats |
| GET | `/customer` | ✅ (CUSTOMER) | - | Customer dashboard stats |
| GET | `/technician` | ✅ (TECHNICIAN) | - | Technician dashboard stats |
| GET | `/manager` | ✅ (MANAGER) | - | Manager dashboard stats |

## ⚙️ Environment Variables

```env
NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://user:password@host:5432/dbname

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# bKash
BKASH_USERNAME=xxx
BKASH_PASSWORD=xxx
BKASH_APP_KEY=xxx
BKASH_APP_SECRET=xxx
BKASH_BASE_URL=https://tokenized.sandbox.bka.sh/v1.2.0-beta

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=xxx
SMTP_PASS=xxx

# OAuth
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

FACEBOOK_APP_ID=xxx
FACEBOOK_APP_SECRET=xxx
FACEBOOK_CALLBACK_URL=http://localhost:5000/api/v1/auth/facebook/callback

# Redis
REDIS_URL=redis://localhost:6379
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+

### Installation

```bash
# Clone repository
git clone <repository-url>
cd Assignment6

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npm run dev  # Seeds run automatically on startup

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run format:check` | Check code formatting |
| `npm run format:fix` | Fix code formatting |
| `npm run lint:check` | Check linting |
| `npm run lint:fix` | Fix linting |

## 📦 Database Schema Overview

Key models:
- **User** - Authentication & roles
- **CustomerProfile** - Customer details
- **TechnicianProfile** - Technician details, skills, region
- **ManagerProfile** - Manager details, region
- **Region** - Service regions
- **Category** - Service categories
- **Skill** - Technician skills
- **Service** - Service requests
- **WorkOrder** - Assigned work orders
- **Payment** - Payment records
- **Attachment** - File attachments
- **ServiceReport** - Technician reports
- **Feedback** - Customer feedback
- **Schedule** - Technician availability

