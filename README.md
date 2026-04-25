# Academic Portfolio - Tamerat Gebeyehu

Personal portfolio website targeting U.S. university admissions and international scholarships. Built as a Single Page Application (SPA) using **React Native for Web** (Expo).

## Features

- **Modern Tech Stack:** Built with React Native for Web and Expo.
- **Single Page Navigation:** Smooth transitions using React Navigation.
- **Clean Academic Design:** Professional, dark-mode-first aesthetic.
- **Impact Showcase:** Detailed project breakdowns for Zemen Academy and SindeTrack.
- **Responsive Layout:** Automatically scales for mobile and desktop screens.

## How to Run Locally

Since this is now a React Native project, you need to install dependencies first:

1. **Open a terminal** in this folder (`e:\Desktop\portfolio`).
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the web version:**
   ```bash
   npm run web
   ```
   This will open the site at **http://localhost:8081** (or another available port).

## Project Structure

- `App.js` - Main entry and navigation.
- `src/screens/` - Contains all page content (Home, About, Projects, etc.).
- `src/components/` - Shared UI components like the Header.
- `legacy/` - Contains the previous vanilla HTML/CSS version of your site.

## How to Deploy (GitHub Pages)

To deploy the React Native web version to GitHub Pages:

1. **Build the web project:**
   ```bash
   npx expo export:web
   ```
2. **Upload the contents** of the `dist/` folder to your GitHub repository.
3. **Enable GitHub Pages** in your repo settings, pointing to the branch where you uploaded the `dist` files.

---

Built from Ethiopia with purpose.
