# Gift It Forward 🎁

Gift It Forward is a social-impact gifting platform where every gift purchase automatically contributes to a meaningful cause. Users can purchase gifts for loved ones while simultaneously creating positive social impact through donations linked to the occasion being celebrated.

## Project Overview

Traditional gifting ends with the receiver getting a present. Gift It Forward extends that experience by ensuring that every purchase also supports a social cause.

Example:

* Birthday Gift → Children's Education
* Anniversary Gift → Tree Plantation
* Wedding Gift → Clean Water
* Graduation Gift → Skill Development

A fixed 10% of every order value is allocated toward the mapped social cause and recorded as an impact contribution.

---

## Features

### User Features

* User Registration & Login
* JWT-based Authentication
* Browse Gifts by Category
* Gift Search & Filtering
* Add to Cart
* Checkout & Order Placement
* Occasion Selection
* Gift Yourself Option
* Personal Message for Receiver
* Delivery Date Selection
* Order History Dashboard

### Social Impact Features

* Automatic Occasion → Cause Mapping
* Automatic Impact Calculation (10%)
* Impact Tracking per Order
* Celebration Reveal Card
* Impact Dashboard

---

## Occasion → Cause Mapping

| Occasion    | Cause                |
| ----------- | -------------------- |
| Birthday    | Children's Education |
| Anniversary | Tree Plantation      |
| Wedding     | Clean Water          |
| Graduation  | Skill Development    |
| Festival    | Hunger Relief        |
| Thank You   | Women Empowerment    |
| Farewell    | Elder Care           |
| Baby Shower | Child Health         |

---

## Impact Calculation

```text
Impact Amount = Gift Price × 10%
```

Example:

```text
Gift Price = ₹500
Impact Amount = ₹50
```

---

## Celebration Reveal Card

Every order generates a personalized celebration card containing:

* Occasion
* Sender Name
* Receiver Name
* Personal Message
* Social Cause
* Impact Amount

Example:

```text
Happy Birthday, Priya!

Gifted by: Rahul

Message:
"Wishing you happiness and success always."

This gift also contributed ₹50 towards
Children's Education.
```

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate

### Database

* MySQL

---

## Architecture

```text
React Frontend
       |
       | REST APIs
       v
Spring Boot Backend
       |
       | JPA/Hibernate
       v
MySQL Database
```

---

## Backend Modules

```text
controller/
service/
repository/
model/
dto/
security/
config/
```

### Main Entities

* User
* Gift
* Order
* OrderItem
* ImpactRecord

---

## API Highlights

### Authentication

```http
POST /auth/signup
POST /auth/login
```

### Gifts

```http
GET /gifts
GET /gifts/{id}
```

### Orders

```http
POST /orders
GET /orders/user/{userId}
```

### Impact

```http
GET /impact/order/{orderId}
```

---

## Project Workflow

```text
User Login
    ↓
Browse Gifts
    ↓
Select Gift
    ↓
Choose Occasion
    ↓
Place Order
    ↓
Backend Maps Cause
    ↓
Calculate 10% Impact
    ↓
Save Order & Impact Record
    ↓
Display Celebration Card
```

---

## Repository Structure

### Backend

Branch: `main`

Contains:

* Spring Boot Application
* Authentication
* Business Logic
* Database Integration

### Frontend

Branch: `frontend-final`

Contains:

* React UI
* Pages & Components
* API Integration
* Dashboard & Checkout Flow

---

## Learning Outcomes

This project helped me gain hands-on experience with:

* Spring Boot Development
* REST API Design
* JWT Authentication
* JPA & Hibernate
* MySQL Database Design
* React + TypeScript
* Frontend & Backend Integration
* Git & GitHub Workflow

---

## Future Enhancements

* Payment Gateway Integration
* Email Notifications
* Admin Dashboard
* Cause Analytics Dashboard
* Gift Recommendations
* Cloud Deployment

---

Developed as a full-stack social impact gifting platform to combine meaningful gifting with measurable social good.
