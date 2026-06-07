# HealthMate

> AI-powered prescription reader and pharmacy locator — built with Expo React Native and Google Document AI.

---

## Overview

HealthMate is a mobile application that bridges the gap between handwritten medical prescriptions and accessible healthcare. Users can photograph a handwritten prescription, have it interpreted by AI, and immediately locate the nearest pharmacies from their current location — all within a single, seamless experience.

---

## Features

- **Handwritten Prescription Recognition** — Leverages Google Document AI to extract and interpret text from handwritten prescriptions with high accuracy
- **Nearest Pharmacy Locator** — Uses device location to surface nearby pharmacies in real time
- **Cross-Platform Mobile App** — Built with Expo React Native for iOS and Android compatibility
- **Node.js Backend** — Lightweight server handling Document AI integration and location services

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | Expo React Native |
| AI / OCR | Google Document AI |
| Backend | Node.js |
| Location | Expo Location API |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally
- A Google Cloud project with Document AI enabled

### 1. Clone the repository

```bash
git clone https://github.com/venura-deegalla/healthmate.git
cd healthmate
```

### 2. Install dependencies

```bash
npm install
npm install -g expo-cli
expo install expo
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add your Google Document AI credentials:

```env
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PROCESSOR_ID=your_processor_id
GOOGLE_API_KEY=your_api_key
```

### 4. Start the Expo app

```bash
npx expo start
```

Scan the QR code with the [Expo Go](https://expo.dev/client) app on your device, or run on an emulator.

### 5. Start the backend server

In a separate terminal, navigate to the backend directory and start the Node.js server:

```bash
node index.js
```

---

## Roadmap

- [ ] Multi-language prescription support
- [ ] Prescription history and storage
- [ ] Drug interaction warnings
- [ ] Integration with pharmacy inventory APIs

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Author

**Venura Oshada Deegalla**
[LinkedIn](https://linkedin.com/in/venura-deegalla) · [Email](mailto:vodeegalla2001@gmail.com)
