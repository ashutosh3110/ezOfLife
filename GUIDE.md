# Loondry Platform — Client Deliverable Guide

> **Platform Overview:** Loondry (Ez of Life) is a multi-persona on-demand laundry logistics platform serving Customers, Vendors (laundry shops), Riders (delivery agents), Admin (platform operations), and Suppliers (B2B laundry partners).
>
> **Frontend Stack:** React 19 + Vite, TailwindCSS v4, Framer Motion, Recharts, Zustand, React Router v7
>
> **Current Status:** All frontend screens are complete, interactive with mock/localStorage data, and ready for backend API integration.

---

## Table of Contents

1. [Customer (User) Portal](#1-customer-user-portal)
2. [Vendor Portal](#2-vendor-portal)
3. [Rider Portal](#3-rider-portal)
4. [Admin Panel](#4-admin-panel)
5. [Supplier Portal](#5-supplier-portal)
6. [Cross-Platform Features](#6-cross-platform-features)
7. [Frontend Completeness Audit](#7-frontend-completeness-audit)
8. [Backend Integration Readiness](#8-backend-integration-readiness)

---

## 1. Customer (User) Portal

**Entry Point:** `/user` → Splash Screen → Auto-redirect based on session

The Customer Portal is a premium mobile-first interface designed for end consumers who want to book, track, and manage laundry services.

---

### 1.1 Authentication Flow

| Screen | Route | Description |
|--------|-------|-------------|
| Splash Screen | `/user` | 3-second branded splash with logo animation. Auto-redirects logged-in users to Home. |
| Auth (Login / Sign Up) | `/user/auth` | Unified screen with Login/Sign Up tabs. Phone number input with WhatsApp / SMS OTP channel toggle. Sign-Up includes mandatory T&C checkbox. |
| OTP Verification | `/user/otp` | 4/6-digit OTP entry with auto-focus, resend timer, and channel confirmation (WhatsApp or SMS). |
| Profile Creation | `/user/profile-creation` | One-time profile setup: Display Name + Home Address. Completes onboarding and routes to Home. |

---

### 1.2 Home Screen

- **Dual Service Tier Toggle** — `Essential` (standard services) and `Heritage` (premium care) tiers with distinct service catalogs.
- **Promo Banner Carousel** — Auto-sliding promotional banners (3 items, configurable).
- **Service Search Bar** — Fuzzy search that routes to `/user/search` with filtered results.
- **Service Category Chips** — Tap-to-filter categories (Wash & Fold, Dry Clean, Ironing, etc.).
- **Service Cards with Inline Quantity Controls** — Tap a card to activate it; `+/-` buttons appear inline for quantity selection. A floating **View Cart** summary bar appears at the bottom when ≥1 service is selected.

---

### 1.3 Cart & Checkout

| Feature | Description |
|---------|-------------|
| Cart Summary | Full list of selected services with quantities, sub-totals, and edit capability. |
| Express Toggle | One-tap `Express Delivery` toggle applies a **1.5× surcharge**. Total updates in real-time. |
| Price Breakdown | Transparent 4-line formula display: Base Rate + Aggregator Fee + Logistics Fee × Express Surcharge = Final Total. |
| Pickup/Drop-off Time Slots | Grid slot picker for both pickup and delivery — Morning / Afternoon / Evening options. |
| Pre-Pickup Photo Upload | Optional camera roll or file input for customers to capture garments before rider arrives. Thumbnail preview shown inline. |
| Address Selector | Picks from the saved address book or lets user add a new one inline. |
| Payment Method Selector | Chooses from saved payment methods or COD. |

---

### 1.4 Order Confirmation & Handshake Flow

The platform uses a **4-Step Logistics Handshake Protocol** clearly shown on every tracking screen.

```
STEP 1: Pickup      — Rider arrives, Customer provides OTP-1 to confirm handover
STEP 2: Intake      — Rider delivers to Vendor; Vendor scans/confirms items
STEP 3: Processing  — Vendor completes laundry work; marks order "Ready"
STEP 4: Handover    — Return Rider picks up; Customer confirms final OTP at doorstep
```

| Screen | Route | Description |
|--------|-------|-------------|
| Order Confirmation | `/user/order-confirmation` | Final review of services, address, slot, and total. "Confirm Order" fires the platform-wide notification cascade. |
| Order Tracking | `/user/track/:id` | Live 4-step progress bar with step labels. Shows rider ETA, current stage, and vendor name. |
| Delivery Verification | `/user/delivery-verification` | Displays pickup photos for verification. Customer enters **Final OTP** (Step 4). Auto-navigates to Payment on verification. |
| Payment | `/user/payment` | Payment method confirmation and order settlement screen. |

---

### 1.5 Post-Order Features

| Feature | Route | Description |
|---------|-------|-------------|
| Orders History | `/user/orders` | **Active** tab: live orders with status. **Past** tab: completed orders with "Reorder" button (auto-fills cart) and "Download Invoice" (browser print). |
| Rate & Review | `/user/rate-review` | 5-star rating + text review after delivery confirmation. |
| Wallet | `/user/wallet` | Balance display, credit history, and redeem loyalty points. |

---

### 1.6 Profile & Settings

| Feature | Route | Description |
|---------|-------|-------------|
| User Profile | `/user/profile` | Name, phone, tier status, edit button. |
| Address Book | `/user/addresses` | Full CRUD for saved addresses — Add, Edit, Delete, Set as Default. |
| Payment Methods | `/user/payment-methods` | Saved cards/UPI/COD management. |
| Notifications | `/user/notifications` | Live notification feed powered by the global store. Filters by persona. Unread badge updates in real-time. |
| More Menu | `/user/more` | App hub: Help, FAQ, Chat, Register as Vendor, T&C, Privacy Policy, Advertise With Us, Partnership Inquiry, Careers. |

---

### 1.7 Additional Pages

| Page | Description |
|------|-------------|
| FAQ | Frequently asked questions (expandable accordion). |
| Help Center | Support options with chat link and call options. |
| In-App Chat | Per-order ID chat interface with customer support. |
| Partnership Inquiry | B2B lead capture form (feeds Admin B2B Leads repository). |
| Advertise With Us | Brand advertising inquiry form. |
| Careers | Open positions information page. |
| Register as Vendor | Landing page with vendor benefits + "Apply Now" → routes to Vendor Registration. |
| Terms & Conditions | Full T&C document. |
| Privacy Policy | GDPR-aligned privacy document. |

---

## 2. Vendor Portal

**Entry Point:** `/vendor` → Vendor Splash → Vendor Dashboard (if authenticated)

The Vendor Portal is designed for laundry shop operators to manage incoming orders, services, promotions, and earnings.

---

### 2.1 Authentication & Onboarding

| Screen | Route | Description |
|--------|-------|-------------|
| Vendor Splash | `/vendor` | Branded splash for the Vendor persona. |
| Vendor Auth | `/vendor/auth` | Phone + OTP login / Registration start. |
| Shop Details | `/vendor/register/shop` | Shop name, address, GST number, working hours, service area setup. |
| Document Upload | `/vendor/register/docs` | Upload FSSAI, GST Certificate, PAN Card, and Shop Establishment docs. |
| Approval Pending | `/vendor/pending` | Holding screen shown while Admin reviews the application. Notified upon approval. |

---

### 2.2 Vendor Dashboard

The operational command center for the vendor.

- **Shop Status Toggle** — `Active / Resting` with real-time visual indicator.
- **Earnings Today** card — Daily revenue with % change vs. yesterday.
- **Process Queue Card** — Total live orders with how many are "Ready for Delivery."
- **Order Workflow Tabs** — Three tabs with **live order counts**:
  - `New` — Available incoming orders to accept.
  - `Active` — In-progress orders (being washed/ironed).
  - `Done` — Ready for pickup/dispatch orders.
- **Management Quick Links** — Walk-In, Promotions, and Supply shortcuts.

---

### 2.3 Order Management

| Screen | Route | Description |
|--------|-------|-------------|
| Order Details | `/vendor/order/:id` | Full order view: 4-step handshake progress bar, customer info, item list with prices, special instructions, "Mark as Ready" action. |
| Rider Verification | `/vendor/rider-verification/:id` | Vendor sees a 4-digit OTP and the rider enters it on their device. Confirms handover chain of custody. |
| Walk-In Order | `/vendor/walk-in` | Manual order creation terminal for customers who physically visit the shop. |

**"Mark as Ready" Action:** When triggered, fires real-time notifications to:
- **Customer** → "Cleaning Complete. Your order is packed."
- **Rider** → "Order is ready at [Shop Name] for final delivery pickup."

---

### 2.4 Service Management

| Feature | Description |
|---------|-------------|
| Service List | All active services with name, category, base rate, and status indicator. |
| Active/Inactive Toggle | Instantly enable or disable any service. High-contrast colored badges (Green = Active, Red = Inactive). |
| Rate Editor | Inline base rate editing with live **Net Yield calculator** (shows earnings after platform fee deduction). |
| Profit Margin Bar | Visual percentage bar showing margin health for each service. |
| Add New Service | Full form to create a new service offering (name, category, rate, description). |

---

### 2.5 Promotion Manager

A campaign control center for vendor-side discounts.

| Feature | Description |
|---------|-------------|
| Campaign Cards | Each card shows: Campaign name, Discount Code, Status badge (Active/Scheduled/Paused), Expiry date, and Minimum Order Value (MOV) badge. |
| Redemption Gauge | Circular progress indicator showing `used / total limit` with percentage. |
| Usage Progress Bar | Full-width animated bar tracking campaign consumption. |
| Pause/Resume | Instant toggle for any live campaign. |
| Campaign Stats | Summary tiles showing total redemptions and total discount value dispensed. |
| Create/Edit Modal | Full modal form with: Title, Discount Code, Min. Order Value, and Usage Limit fields. Distinctive dark-code-input for the coupon code. |

---

### 2.6 Earnings & Financials

| Screen | Description |
|--------|-------------|
| Earnings | Daily/Weekly/Monthly earnings chart, payout history, pending settlement amounts. |
| Payout Settings | Bank account IFSC/account number form, UPI ID setup for settlement. |

---

### 2.7 Vendor Profile & Settings

| Feature | Description |
|---------|-------------|
| Vendor Profile | Shop name, photo, address, category, operating hours display. |
| Edit Profile | Full edit form for all shop details. |
| Notifications | Vendor-specific notification feed (incoming orders, rider arrivals, settlement confirmations). |
| Support | In-app support/help center for vendor-specific issues. |
| B2B Fulfillment | Dedicated page to manage large-volume B2B laundry contracts (hotel/gym/corporate). |
| Order History | Complete historical order log with status filters and revenue tracking. |
| Terms & Privacy | Legally required pages accessible from vendor profile. |

---

## 3. Rider Portal

**Entry Point:** `/rider` → Rider Dashboard (if authenticated)

The Rider Portal is a focused, high-density operational interface for delivery agents managing pickup and delivery tasks.

---

### 3.1 Rider Dashboard

- **Task Queue** — Live list of assigned tasks with order ID, source/destination, and type (Pickup / Delivery).
- **Status Indicators** — Each task card shows distance, priority, and expected completion metrics.
- **Action Navigation** — Tap any task card to open the full Task Details manifest.

---

### 3.2 Task Details (4-Step Execution Flow)

The core workflow screen for riders, structured as a 3-step verification wizard.

| Step | Action | Notifications Fired |
|------|--------|---------------------|
| **Step 1: Navigate** | View pickup address, operator memo/instructions. Tap "Arrived at Location." | Customer: "Rider Arrived" / Vendor: "Rider at Shop" |
| **Step 2: Verify Manifest** | Checklist of all items. Check-mark each item. Mandatory photo capture (simulated). Once all verified → "Verify & Lock Manifest." | Customer: "Pickup Logged" / Vendor: "In-Transit to Shop" |
| **Step 3: Handoff OTP** | Display 4-digit handover code to the vendor/customer. "Finish & Sync Trip" closes the task. | Customer: "Landed at Shop" / Vendor: "Order Handover Complete" |

**4-Step Handshake Progress Bar** is shown at the top of Task Details indicating which step of the logistics chain is currently active.

- **Call Button** — Direct tap-to-call for the vendor or customer contact.

---

### 3.3 Rider Wallet

- **Earnings Today** — Real-time display of daily income.
- **Trip Breakdown** — Per-delivery earnings list with order ID, distance, and payout.
- **Settlement History** — Weekly/monthly payout records.

---

## 4. Admin Panel

**Entry Point:** `/admin/login` → Admin Dashboard (with localStorage auth guard)

The Admin Panel is a full enterprise-grade desktop management interface (`slate/white` design language vs. the consumer teal theme) for platform operators to manage all entities.

---

### 4.1 Admin Login

- Secure admin credentials login (localStorage-guarded route).
- All admin routes redirect to `/admin/login` if not authenticated.

---

### 4.2 Dashboard — Mission Control

**Financial Performance Matrix (GMV Strip):**

| Metric | Description |
|--------|-------------|
| Gross Merchandise Volume (GMV) | Total platform order value with growth % indicator. |
| Platform Net Yield | Fee revenue after vendor payouts (15% base take rate). |
| Logistics Disbursements | Total rider payments with pending count. |
| Vendor Settlements | Total weekly vendor payout amount. |

**System Health Panel:**
- Live API Latency indicator.
- Platform Uptime percentage.
- System Load indicator.
- Real-time sync status.

**Priority Operational Alerts:**
- Dynamic alert cards for: Delayed Pickup (>2h), Unpaid Delivery, and any TAT-overdue orders.
- Each alert has a direct action button ("Intercept" / "Resolve").

**Analytics Charts:**
- Revenue over time (Line Chart).
- Orders vs. Fulfillment Rate (Composed Area + Bar Chart).

**Recent Payouts Table:**
- Vendor name, settlement amount, status badge, and audit timestamp.

---

### 4.3 Vendor Management

| Feature | Description |
|---------|-------------|
| Vendor List | Searchable, sortable table of all registered vendors with status badges. |
| Vendor Detail | Full vendor profile: shop info, documents, performance metrics. |
| Ranking Control | Admin can manually boost or penalize a vendor's visibility score. |
| Blacklist Vendor | Confirmation dialog to blacklist policy violators. Shows "Blacklisted" badge. |

---

### 4.4 Vendor Onboarding Approvals

- Review queue of pending vendor applications.
- View submitted documents (FSSAI, GST, PAN).
- **Approve** → Triggers role-switch success toast + notification to vendor.
- **Reject** → Requires rejection reason; vendor is notified.

---

### 4.5 User Management

| Feature | Description |
|---------|-------------|
| User List | All registered customers with name, phone, tier, and order count. |
| Deactivate Account | Confirmation dialog to deactivate a user for policy violations. Shows "Deactivated" badge. |

---

### 4.6 Rider Management

- Full rider list with assignment status, earnings, and task completion rate.
- Individual rider performance profile.

---

### 4.7 Order Management

| Feature | Description |
|---------|-------------|
| Orders List | All platform orders with order ID, customer, vendor, status, and value. Filterable. |
| Order Detail | Full order breakdown: item list, logistics chain, payment status, dispute flag. |

---

### 4.8 Financial Operations

| Feature | Description |
|---------|-------------|
| Payouts | Pending and completed vendor settlement list with approval workflow. |
| Pricing Config | Set platform fee percentages, logistics fees, express surcharges, and **Free Delivery Threshold** (orders above ₹X get free delivery). Live preview updates. |

---

### 4.9 Dispute Center

- Queue of active logistics disputes.
- Each dispute shows: Order ID, Type (COD missing, damaged item, missed pickup), involved parties.
- Resolution actions: Assign, Escalate, Close.

---

### 4.10 Help Desk

- Technical support ticket queue from all user personas.
- Ticket assignment, status update, and resolution workflow.

---

### 4.11 Services Management

- Platform-level service catalog management.
- Add, edit, activate, deactivate any service type offered across all vendors.

---

### 4.12 Analytics — 5 Report Types

| Report | Description |
|--------|-------------|
| Revenue Overview | Area chart of platform revenue over time. |
| Orders by Category | Bar chart segmented by service type. |
| Market Segmentation | Donut/Pie chart showing order distribution by category (Laundry / Dry Clean / Ironing / Premium). |
| Operational Global Pulse | Key KPIs: Fulfillment rate, API latency, system faults, avg. order value, active riders/vendors, handshake success rate. |
| Fleet Performance | Rider metrics: active riders, tasks per rider, delivery success rate. |

---

### 4.13 B2B Leads Repository

Dedicated page for enterprise inquiry management.

| Feature | Description |
|---------|-------------|
| Lead Cards | Entity name, contact, primary request quote, lead status, and inbound date. |
| Status Pipeline | New → Contacted → Quoted → Qualified. |
| Pipeline Stats | New inquiries count, active negotiations, estimated ₹ pipeline value, and conversion rate. |
| Export Leads | CSV export action button. |
| Register Manual Lead | Admin can manually log enterprise inquiries. |

---

## 5. Supplier Portal

**Entry Point:** `/supplier` → Supplier Dashboard

The Supplier Portal serves B2B laundry partners — large-volume entities (hotels, hospitals, corporates) who require ongoing laundry contracts through the platform.

---

### 5.1 Authentication

| Screen | Description |
|--------|-------------|
| Supplier Auth | Business email/phone login with OTP. |
| Supplier OTP | Code verification for business accounts. |

---

### 5.2 Supplier Dashboard

- **Active Contract Summary** — Live overview of active supply contracts.
- **Request New Pickup** — Log scheduled bulk pickup requirements.
- **Usage Metrics** — Volume of laundry processed this week/month.
- **Quick Actions** — Navigate to Rate Card, Logistics Tracking, Wallet, and Profile.

---

### 5.3 Supplier Features

| Feature | Route | Description |
|---------|-------|-------------|
| Rate Card | `/supplier/rate-card` | View agreed pricing tiers for bulk laundry (price per kg/item by category). |
| Logistics | `/supplier/logistics` | Track active bulk pickup/delivery jobs. Status and ETA per batch. |
| Fulfillment | `/supplier/fulfillment` | Manage fulfillment schedule: upcoming, in-progress, completed batches. |
| Wallet | `/supplier/wallet` | Prepaid credit balance, invoice history, and top-up options. |
| Profile | `/supplier/profile` | Business profile: company name, GST, contact, contract start date. |

---

## 6. Cross-Platform Features

### 6.1 Notification Engine

A platform-wide Zustand-powered real-time notification system covering **12 BRD-defined event triggers**:

| # | Event | Recipient |
|---|-------|-----------|
| 1 | Order Confirmed | Customer |
| 2 | Rider Assigned | Customer |
| 3 | Rider Arrived (OTP-1 Generated) | Customer + Vendor |
| 4 | Pickup Logged / Manifest Locked | Customer + Vendor |
| 5 | Landed at Shop (Handshake 1 Done) | Customer + Vendor |
| 6 | Processing Started | Customer |
| 7 | Cleaning Complete / Order Ready | Customer + Rider |
| 8 | Reverse Pickup OTP | Vendor |
| 9 | Out for Delivery | Customer |
| 10 | At Doorstep | Customer |
| 11 | Final OTP Verified → Payment Triggered | Customer |
| 12 | Payment Success | Vendor |

**GlobalToast Manager** — A hardware-accelerated toast notification renders at the top of the UI across all portal layers, showing immediate feedback for any BRD event.

**Live Unread Badge** — The User Header notification bell shows an animated red badge for unread alerts.

---

### 6.2 Design Language

| Portal | Theme |
|--------|-------|
| Customer (User) | Teal `#89ECDA` background, black typography, premium glassmorphism cards |
| Vendor | White/Black tactical — black gradients, high-contrast typography |
| Rider | Slate/Emerald operational — dark cards, emerald accent for action states |
| Admin | Enterprise white — `slate-900` borders, flat minimal typography |
| Supplier | Unified with Vendor design language |

All portals use `Framer Motion` for micro-animations and page transitions.

---

### 6.3 4-Step Logistics Handshake (Universal)

Every persona sees the same progress indicator with the same 4 labels:

```
[● Pickup] ──── [● Intake] ──── [● Processing] ──── [● Handover]
  Step 1           Step 2           Step 3              Step 4
```

- Customer sees it in `OrderTrackingPage`.
- Rider sees it in `TaskDetails`.
- Vendor sees it in `OrderDetails`.

---

## 7. Frontend Completeness Audit

### ✅ Fully Implemented

| Requirement | Status | Notes |
|-------------|--------|-------|
| All 5 persona portals with auth | ✅ Complete | User, Vendor, Rider, Admin, Supplier |
| Customer full order journey | ✅ Complete | Splash → Auth → Home → Cart → Confirm → Track → Deliver → Pay |
| 4-Step Handshake Protocol (all personas) | ✅ Complete | Standardized labels and progress bars |
| Vendor Service Management + Toggles | ✅ Complete | Real-time profit margin calculator |
| Vendor Promotion Manager | ✅ Complete | Redemption gauges, MOV, expiry, campaign modal |
| Vendor Dashboard order counters | ✅ Complete | Dynamic badge counts per tab |
| Admin GMV Financial Matrix | ✅ Complete | 4-column dark strip with all financial KPIs |
| Admin System Health Panel | ✅ Complete | Latency, uptime, load indicators |
| Admin B2B Leads Repository | ✅ Complete | Full page + route + pipeline stats |
| Admin Analytics (5 report types) | ✅ Complete | Revenue, Orders, Segmentation, Ops Pulse, Fleet |
| Notification Store (12 events) | ✅ Complete | Zustand-based, persona-filtered |
| GlobalToast Manager | ✅ Complete | Fires on all BRD trigger events |
| Live notification badge in User Header | ✅ Complete | Animated red badge |
| Rider 3-step Task Execution + OTP | ✅ Complete | With notification fires at each step |
| Express Surcharge (1.5×) in Cart | ✅ Complete | Real-time total update |
| Price Breakdown Display | ✅ Complete | 4-line formula transparency |
| Delivery Verification → Auto Pay | ✅ Complete | No manual button after Final OTP |
| Admin Pricing Config | ✅ Complete | Fee percentages + Free Delivery Threshold |
| Admin Vendor Ranking Boost/Penalty | ✅ Complete | Numeric score widget in AdminVendorDetail |
| Admin Deactivate Users/Vendors | ✅ Complete | Confirmation dialog + status badge |
| Admin Onboarding Approval Toast | ✅ Complete | Role-switch success notification |
| Supplier Portal (full) | ✅ Complete | All 5 supplier pages operational |

---

### ⚠️ Known Limitations (Frontend-Only — Requires Backend)

| Item | Description |
|------|-------------|
| Data Persistence | All data resets on page refresh. localStorage is used for mock state only. |
| Real-time Updates | Toast notifications are UI-layer mock triggers. True real-time requires WebSocket/SSE from backend. |
| Photo Uploads | Pre-pickup and manifest photos are simulated (click-to-confirm). Actual upload requires S3 integration. |
| OTP Delivery | OTP entry is simulated — any code is accepted. WhatsApp/SMS gateway integration needed. |
| Payment | Payment confirmation is UI-only. Razorpay/Stripe webhook integration required. |
| Map/GPS Tracking | Order tracking shows a placeholder map image. Google Maps SDK integration needed. |
| PDF Invoice | "Download Invoice" uses `window.print()`. A proper PDF generation service (e.g., PDFKit) is needed. |
| Push Notifications | Notifications are in-app only. Firebase Cloud Messaging (FCM) integration needed for device push. |

---

## 8. Backend Integration Readiness

The frontend is **fully ready for API integration**. Here is the API contract map for each module:

### Auth APIs (All Personas)
- `POST /auth/request-otp` — Send OTP via WhatsApp/SMS
- `POST /auth/verify-otp` — Verify OTP and return JWT
- `POST /auth/register` — Create account (Customer/Vendor)
- `GET /auth/me` — Fetch authenticated user profile

### Customer APIs
- `GET /services` — Fetch service catalog
- `POST /orders` — Place new order
- `GET /orders` — Fetch order history
- `GET /orders/:id` — Fetch order details + live status
- `POST /orders/:id/review` — Submit rating and review

### Vendor APIs
- `GET /vendor/orders` — Fetch incoming/active/done orders
- `PATCH /vendor/orders/:id/ready` — Mark order as ready
- `GET /vendor/services` — Fetch vendor service list
- `PATCH /vendor/services/:id` — Update service rate/status
- `POST /vendor/promotions` — Create promotion/coupon
- `GET /vendor/earnings` — Fetch earnings data

### Rider APIs
- `GET /rider/tasks` — Fetch assigned tasks
- `PATCH /rider/tasks/:id/arrived` — Mark arrived at location
- `PATCH /rider/tasks/:id/verify` — Lock manifest
- `PATCH /rider/tasks/:id/complete` — Complete handoff

### Admin APIs
- `GET /admin/dashboard` — Fetch GMV, metrics, alerts
- `GET /admin/vendors` — Fetch all vendors
- `PATCH /admin/vendors/:id/approve` — Approve vendor
- `PATCH /admin/vendors/:id/blacklist` — Blacklist vendor
- `GET /admin/users` — Fetch all users
- `GET /admin/orders` — Fetch all orders
- `GET /admin/analytics` — Fetch analytics data
- `GET /admin/b2b-leads` — Fetch B2B inquiry leads
- `PATCH /admin/pricing` — Update pricing configuration

### Supplier APIs
- `POST /supplier/pickups` — Request bulk pickup
- `GET /supplier/contracts` — Fetch active contracts
- `GET /supplier/wallet` — Fetch credit balance

---

> **Ready for Client Confirmation.** Once you approve the frontend design and all feature screens, backend development can begin against the API contracts listed above.

---

*Document authored by: Loondry Engineering Team*
*Last Updated: April 2026 — Frontend v1.0 Complete*
