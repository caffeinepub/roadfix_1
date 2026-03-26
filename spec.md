# RoadFix

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full RoadFix app: vehicle breakdown assistance platform connecting users with nearby captains (mechanics/helpers)
- User side: signup/login, location detection, request help, map view of nearby captains, live tracking, in-app chat, payment (cash + online), booking history, ratings
- Captain side: registration with document upload (license, ID proof, selfie), admin approval workflow (Pending/Approved/Rejected), dashboard with online/offline toggle, accept/reject requests, navigation, earnings dashboard, ratings
- Admin panel: user/captain management, document verification (approve/reject captains), live booking tracking, payment/commission management, analytics dashboard
- SOS emergency button
- Multi-language support (English + Tamil)
- Dark/light mode
- Mobile-first responsive design with bottom navigation tabs
- Map-based interface using OpenStreetMap/Leaflet
- Sample demo users, captains, and bookings

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: roles (user, captain, admin), user profiles, captain profiles with document status, booking/request system, ratings, earnings tracking, admin approval actions
2. Frontend: auth screens (login/signup), home map screen, request flow, captain dashboard, admin panel, booking history, profile/settings
3. Components: authorization (role-based), blob-storage (document uploads), user-approval (captain verification)
4. Demo seed data: 3 users, 3 captains (1 pending, 1 approved, 1 rejected), sample bookings
