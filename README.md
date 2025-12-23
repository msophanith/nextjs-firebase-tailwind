# AlertMap 🗺️

**AlertMap** is a community-driven, real-time alert platform designed to enhance situational awareness for citizens in Cambodia. Built on the high-performance **Venefish Stack**, it allows users to pin and discover alerts across the country in real-time.

## 🚀 Features

- **Interactive Map**: Real-time visualization of alerts using Leaflet.
- **Smart Upload**: Automatically extracts GPS location from image EXIF data.
- **Manual Pinning**: Easy-to-use manual location picker for photos without GPS data.
- **Real-time Sync**: Powered by Firebase Firestore for instant updates across all users.
- **Privacy-First**: No personal data collection; anonymous contributions.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Backend/Database**: [Firebase](https://firebase.google.com/) (Firestore)
- **Mapping**: [Leaflet](https://leafletjs.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## ⚙️ Setup

1. **Firebase Configuration**:

   - Ensure your Firebase project has Authentication and Firestore enabled.
   - Update your public Firebase config in `components/firebase-providers.tsx`.

2. **Installation**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Development**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📄 Project Proposal

For a detailed breakdown of the project goals, design philosophy, and future roadmap, please refer to the [PROPOSAL.md](file:///Users/sophanith.mey/vibe-coding/venefish/PROPOSAL.md).

---

**Created with ❤️ for the Cambodia Community**
