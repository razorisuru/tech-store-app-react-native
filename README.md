# Tech Store App (React Native)

A comprehensive mobile e-commerce application built with **React Native** and **Expo**, featuring a modern UI with **NativeWind** (Tailwind CSS) and a modular component structure.

## 🚀 Tech Stack

- **Framework**: [Expo](https://expo.dev) (SDK 54) & [React Native](https://reactnative.dev) (0.81)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **State Management**: React Context & Hooks
- **Icons**: Expo Symbols & Vector Icons

## 📂 Project Structure

### Core
- `app/`: Application screens and routing
- `api/`: API integration services
- `context/`: Global state management
- `hooks/`: Custom React hooks
- `components/`: Shared UI components
- `assets/`: Static resources (images, fonts)

### Features (`stitch/`)
A collection of modular feature implementations including:
- **Authentication**: Sign-in, onboarding, and profile management
- **Product Discovery**: Listing pages, search results with filters, and product details
- **Shopping Experience**: Cart management, checkout flow (shipping, payment, review)
- **Advanced Features**: AR product preview interface

## 🛠 Installation

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the App

Start the development server:

```bash
npx expo start
```

This will run the Expo development server. You can scan the QR code with the **Expo Go** app on your physical device, or press:
- `a` for Android Emulator
- `i` for iOS Simulator
- `w` for Web

## ✨ Scripts

- `npm start`: Start the Expo server
- `npm run android`: Start on Android
- `npm run ios`: Start on iOS
- `npm run web`: Start on Web
- `npm run lint`: Run ESLint

## 📝 License

This project is licensed under the MIT License.
