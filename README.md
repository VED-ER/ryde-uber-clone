# Ryde - An Uber Clone

## Overview

**Ryde** is a fully functional ride-hailing app built using Expo and React Native. It's a mini app similar to Uber, designed to provide users with a seamless experience from signing up to booking and paying for rides. 

## Features

- **Onboarding Screens**: Intuitive onboarding process for new users.
- **Authentication**: 
  - User authentication powered by [Clerk](https://clerk.dev/) with options for email/password login and Google authentication.
- **Location Selection**:
  - Integrated with Google Places API to allow users to easily select their destination.
- **Ride Booking**:
  - Complete ride booking flow, from selecting a destination to choosing a driver.
- **Payments**:
  - In-app payments powered by Stripe integration, displayed through a bottom sheet for a smooth user experience.
- **Backend**:
  - Latest Expo experimental API routes to handle backend logic.
  - **Database**: Leveraging a Neon Postgres database for storing user data, ride information, and other critical app data.
- **Rides Screen**: 
  - Displays a list of all rides associated with the user.
- **Chat Screen**: 
  - In-app chat functionality for communication between rider and driver.
- **Profile Screen**: 
  - Fully functional profile screen allowing users to manage their details and settings.

## Getting Started

### Prerequisites

- **Clerk API Keys**: Obtain API keys from [Clerk](https://clerk.dev/).
- **Geoapify API key**: Obtain API key from [Geoapify]([https://clerk.dev/](https://www.geoapify.com/)).
- **Google Places API Key**: Obtain an API key from the [Google Cloud Console](https://cloud.google.com/console).
- **Stripe API Key**: Obtain an API key from the [Stripe Dashboard](https://dashboard.stripe.com/).
- **Neon Postgres Database**: Set up a Neon Postgres database and obtain the connection string.

### Installation

1. Clone the repository
2. Install dependencies
3. Create an `.env` file in the root directory and add your API keys:

    ```plaintext
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-frontend-api>
    EXPO_PUBLIC_SERVER_URL=<your-expo-server>
    EXPO_PUBLIC_GEOAPIFY_API_KEY=<your-geoapify-api-key>
    EXPO_PUBLIC_GOOGLE_API_KEY=<your-google-places-api-key>
    EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-api-key>
    STRIPE_SECRET_KEY=<your-stripe-secret-key>
    DATABASE_URL=<your-neon-postgres-connection-string>
    ```
4. Run the app

## Screenshots

Below are some screenshots showcasing the various features of Ryde:

| Home Screen | Booking Screen | Payment Screen |
|-------------|----------------|----------------|
| ![Screenshot 2024-09-04 at 20 58 47](https://github.com/user-attachments/assets/e7dd4850-d29a-4ae2-9d4a-27deff634d40) | ![Screenshot 2024-09-04 at 20 47 11](https://github.com/user-attachments/assets/2d33ebd6-380f-459d-8192-39e593f2e17a) | ![Screenshot 2024-09-04 at 20 48 15](https://github.com/user-attachments/assets/8d8b8e38-d7cb-435d-85bd-d881b5fd549b)


| Rides Screen | Confirm Ride Screen | Profile Screen |
|--------------|-------------|----------------|
| ![Screenshot 2024-09-04 at 18 00 53](https://github.com/user-attachments/assets/8443ef28-c0b9-407f-a3b6-85cb4beb1abc) | ![Screenshot 2024-09-04 at 20 47 37](https://github.com/user-attachments/assets/17cce91d-6c06-45c5-9493-9c571abe5f3a) | ![Screenshot 2024-09-04 at 18 01 21](https://github.com/user-attachments/assets/b4424eee-7f6a-4124-912e-03290de12e56)
 
