# Project Proposal: AlertMap 🗺️

## 1. Executive Summary

**AlertMap** is a community-driven, real-time alert platform designed to enhance situational awareness for citizens in Cambodia. By leveraging modern web technologies and crowdsourced data, AlertMap provides an interactive visual representation of local alerts, road conditions, and community notices, allowing users to stay informed and safe.

## 2. Problem Statement

In many urban environments, information about road conditions, police checkpoints, or local incidents is often fragmented, delayed, or shared through closed social media groups. This lack of centralized, real-time visual information can lead to:

- Unexpected travel delays.
- Safety concerns for commuters.
- Inefficient navigation through congested or restricted areas.

## 3. Proposed Solution

AlertMap provides a centralized, map-based interface where users can:

- **Visualize Alerts**: Instantly see pinned alerts across a geographic area.
- **Contribute Data**: Easily upload photos of incidents or alerts.
- **Automated Geolocation**: Automatically extract location data from uploaded images to ensure accuracy.
- **Real-time Updates**: Receive the latest information as it happens through a live-syncing database.

## 4. Key Features

### 🗺️ Interactive Map View

A high-performance map interface powered by Leaflet, showing real-time pins. Users can explore different regions and click on pins to view details and images.

### 📸 Smart Image Upload

A streamlined upload process that:

- Reads **EXIF metadata** to automatically detect the GPS coordinates of a photo.
- Provides a **Manual Location Picker** if GPS data is unavailable.
- Supports drag-and-drop and mobile-friendly image selection.

### ⚡ Real-time Synchronization

Powered by Firebase Firestore, the map updates instantly for all users whenever a new alert is pinned, without requiring a page refresh.

### 🛡️ Privacy-First Approach

- **Anonymous Contributions**: Users can contribute without complex registration.
- **Data Privacy**: No personal user data is collected or stored.
- **Ephemeral Data**: Alerts can be set to expire after a certain period (e.g., 24 hours) to keep the map relevant.

## 5. Technical Architecture

The project is built on the **Venefish Stack**, ensuring high performance, scalability, and rapid deployment:

- **Frontend**: Next.js (App Router) for a fast, SEO-friendly React experience.
- **Styling**: Tailwind CSS v4 and Shadcn UI for a premium, modern aesthetic.
- **Backend**: Firebase Firestore for real-time data and Firebase Authentication for secure access.
- **Mapping**: Leaflet.js for flexible and lightweight interactive maps.
- **Deployment**: Vercel for global edge delivery and automated CI/CD.

## 6. Design Philosophy

AlertMap prioritizes a **"Premium & Modern"** user experience:

- **Glassmorphism**: Subtle blur effects and semi-transparent layers.
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices.
- **Micro-animations**: Smooth transitions and hover effects to enhance engagement.
- **Dark Mode Support**: Optimized for visibility in all lighting conditions.

## 7. Future Roadmap

- **Push Notifications**: Alert users when a new pin is added in their vicinity.
- **Categorization**: Filter alerts by type (e.g., Traffic, Construction, Safety).
- **Upvoting/Verification**: Allow the community to verify the accuracy of pins.
- **Mobile Application**: Dedicated iOS and Android apps for better on-the-go access.

---

**Prepared by Antigravity AI**
_December 2025_
