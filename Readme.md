# Expense Sharing Application - Backend

A production-grade expense sharing platform backend built with **Hexagonal Architecture**, enabling users to split expenses, track balances, and settle payments within groups.

## 🎯 Overview

This system provides a robust backend for managing shared expenses similar to Splitwise, with support for multiple split types, automatic balance calculation, and intelligent debt simplification.

### Key Features

- **User Management** - Create and manage user profiles
- **Group Management** - Organize expenses within groups
- **Flexible Expense Splitting** - Equal, exact amount, and percentage-based splits
- **Automatic Balance Tracking** - Real-time debt calculation between users
- **Settlement System** - Record and track payments
- **Balance Simplification** - Automatic two-way balance reduction

---

## 🏗️ Architecture

Built using **Hexagonal Architecture (Ports & Adapters)** for maintainability and testability. 

```
src/
├── domain/                 # Business entities, enums, exceptions
│   ├── entities/          # User, Group, Expense, Balance, Settlement
│   ├── enums/             # SplitType, ExpenseCategory
│   └── exceptions/        # Domain-specific errors
│
├── application/           # Business logic layer
│   ├── ports/             # Repository interfaces
│   ├── dto/               # Data transfer objects
│   ├── services/          # Business services
│   └── use-cases/         # Application workflows
│
├── infrastructure/        # External implementations
│   ├── database/          # TypeORM models, repositories, mappers
│   └── di/                # Dependency injection container
│
├── interfaces/            # API layer
│   └── http/              # Express controllers and routes
│
├── config/                # Configuration management
└── server.ts              # Application entry point
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | TypeORM |
| Architecture | Hexagonal (Ports & Adapters) |

---

## 📋 Prerequisites

- Node.js >= 16.0.0
- PostgreSQL >= 13.0
- npm or yarn

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

Create PostgreSQL database: 

```sql
CREATE DATABASE cred_resolve_db;
```

### 4. Environment Configuration

Create `.env` file:

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=cred_resolve_db

APP_NAME=Expense Sharing App
```

### 5. Run Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Server runs at:  `http://localhost:3000`

---

## 📡 API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create new user |
| GET | `/api/users/: id` | Get user by ID |

### Groups

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/groups` | Create new group |
| GET | `/api/groups/:id` | Get group details |
| POST | `/api/groups/:id/members` | Add member to group |

### Expenses

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/groups/:id/expenses` | Create expense |
| GET | `/api/groups/:id/expenses` | Get group expenses |

### Balances

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/groups/:id/balances` | Get group balances |
| GET | `/api/balances/user/:userId` | Get user balance summary |

### Settlements

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/groups/:id/settlements` | Record payment |
| GET | `/api/groups/:id/settlements` | Get settlement history |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |

---

## 📝 API Examples

### Create User

```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-234-567-8900"
}
```

### Create Group

```bash
POST /api/groups
Content-Type: application/json

{
  "name": "Weekend Trip",
  "description": "Beach vacation expenses",
  "createdBy": "user-uuid-here"
}
```

### Create Expense (Equal Split)

```bash
POST /api/groups/{groupId}/expenses
Content-Type: application/json

{
  "description": "Dinner",
  "amount": 3000,
  "category": "FOOD",
  "paidBy": "user-uuid-here",
  "splitType": "EQUAL",
  "participants": [
    { "userId": "user-1-uuid" },
    { "userId": "user-2-uuid" },
    { "userId": "user-3-uuid" }
  ]
}
```

### Create Expense (Exact Split)

```bash
POST /api/groups/{groupId}/expenses
Content-Type: application/json

{
  "description": "Hotel Booking",
  "amount": 6000,
  "category": "RENT",
  "paidBy":  "user-uuid-here",
  "splitType": "EXACT",
  "participants": [
    { "userId": "user-1-uuid", "amount": 2500 },
    { "userId":  "user-2-uuid", "amount": 2000 },
    { "userId":  "user-3-uuid", "amount": 1500 }
  ]
}
```

### Create Expense (Percentage Split)

```bash
POST /api/groups/{groupId}/expenses
Content-Type: application/json

{
  "description": "Cab Fare",
  "amount":  1200,
  "category": "TRAVEL",
  "paidBy":  "user-uuid-here",
  "splitType": "PERCENTAGE",
  "participants": [
    { "userId": "user-1-uuid", "percentage": 40 },
    { "userId":  "user-2-uuid", "percentage": 35 },
    { "userId":  "user-3-uuid", "percentage": 25 }
  ]
}
```

### Create Settlement

```bash
POST /api/groups/{groupId}/settlements
Content-Type: application/json

{
  "paidBy": "debtor-user-uuid",
  "paidTo": "creditor-user-uuid",
  "amount": 1000
}
```

---

## 🧮 Split Types

### EQUAL
Divides expense equally among all participants.

```
Amount: ₹3000, Participants: 3
Result: ₹1000 per person
```

### EXACT
Each participant pays a specific amount.

```
Amount: ₹2000
Person A: ₹800, Person B: ₹700, Person C: ₹500
Validation: Sum must equal total
```

### PERCENTAGE
Each participant pays a percentage of total.

```
Amount: ₹1000
Person A: 50%, Person B: 30%, Person C: 20%
Validation:  Percentages must sum to 100%
```

---

## 📊 Database Schema

### Core Tables

- **users** - User profiles
- **groups** - Expense groups
- **group_members** - User-group relationships (many-to-many)
- **expenses** - Expense records
- **expense_splits** - Split details per expense
- **balances** - Current balance state (who owes whom)
- **settlements** - Payment history

### Key Relationships

- Groups ↔ Users (many-to-many via group_members)
- Groups → Expenses (one-to-many)
- Expenses → Expense Splits (one-to-many)
- Groups → Balances (one-to-many)
- Groups → Settlements (one-to-many)

---

## 🧪 Testing

### Using Postman

Import `postman_collection.json` into Postman for comprehensive API testing.

The collection includes:
- All CRUD operations
- Multiple split type scenarios
- Balance calculation verification
- Settlement flow testing
- Error case validation

### Manual Testing

```bash
# Health check
curl http://localhost:3000/health

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example. com"}'
```

---

## 🔑 Key Business Logic

### Balance Calculation

Automatically calculates and maintains balances after each expense: 

1. Expense created with splits
2. For each participant (except payer):
   - Create/update balance record
   - Participant owes payer their split amount
3. Simplify two-way balances automatically

### Two-Way Balance Simplification

If A owes B ₹500 and B owes A ₹300:
- Simplified to: A owes B ₹200
- Reduces transaction complexity

### Settlement Processing

When payment is recorded: 
1. Verify balance exists
2. Reduce balance by payment amount
3. Delete balance if fully settled
4. Record in settlement history

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── application/
│   │   ├── dto/
│   │   ├── ports/
│   │   ├── services/
│   │   └── use-cases/
│   ├── domain/
│   │   ├── entities/
│   │   ├── enums/
│   │   └── exceptions/
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── config/
│   │   │   ├── mappers/
│   │   │   ├── models/
│   │   │   └── repositories/
│   │   └── di/
│   ├── interfaces/
│   │   └── http/
│   │       ├── controllers/
│   │       └── routes/
│   ├── config/
│   └── server.ts
├── .env
├── . env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── postman_collection.json
└── README.md
```

---

## 🔒 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_USERNAME | Database user | postgres |
| DB_PASSWORD | Database password | your_password |
| DB_DATABASE | Database name | cred_resolve_db |

---

## 🎯 Design Decisions

### Hexagonal Architecture
- Core business logic independent of frameworks
- Easy to test and maintain
- Flexible to swap implementations

### Repository Pattern
- Abstraction over data access
- Enables dependency injection
- Simplifies testing with mocks

### TypeORM
- Type-safe database operations
- Automatic migrations
- Complex relationship support

### Separation of Concerns
- Domain: Pure business logic
- Application:  Use cases and workflows
- Infrastructure:  Technical implementations
- Interfaces: API layer

---

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
```

---

## 🤝 Contributing

This is an educational project.  Contributions are not currently accepted.

---

## 📄 License

This project is for educational purposes. 

---

## 👨‍💻 Author

**Ayushman Saxena**  
Engineering Design Assignment

---

## 🙏 Acknowledgments

- Clean Architecture by Robert C. Martin
- Hexagonal Architecture by Alistair Cockburn
- Inspired by Splitwise

---
