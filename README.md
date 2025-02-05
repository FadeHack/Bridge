# Bridge

## Description

### Responsive Web App

'Bridge' is a responsive web application that allows users to swap cryptocurrency tokens across different blockchains. It leverages the XY Finance API to provide quotes for token exchanges and facilitates transactions seamlessly.

## Technology Used

### Frontend
- ReactJs
- Next.js
- Tailwind CSS
- Chakra UI

### Backend
- Node.js
- Express.js
- XY Finance API

## Screenshots of Working

### HomePage

**Home**

| Desktop View | Mobile View |
|--------------|-------------|
| ![Homepage - Token Listing](screenshots/homepage-token-listing.png) | ![Homepage - Mobile View](screenshots/homepage-mobile-view.png) |

**Tokens Selection**

| Desktop View | Mobile View |
|--------------|-------------|
| ![Token Selection - Swap Tokens](screenshots/token-selection.png) | ![Token Selection - Mobile View](screenshots/token-selection-mobile-view.png) |

### Quote

| Desktop View | Mobile View |
|--------------|-------------|
| ![Quote - Desktop](screenshots/quote-desktop.png) | ![Quote - Mobile View](screenshots/quote-mobile-view.png) |

### Transaction Page

**Successful Transaction**

| Desktop View | Mobile View |
|--------------|-------------|
| ![Transaction - Desktop](screenshots/transaction-success.png) | ![Transaction - Mobile View](screenshots/transaction-mobile-view.png) |

### About Page

**About Section**

![About Section](screenshots/about-section.png)

### Contact Page

**Contact Page**

![Contact Page](screenshots/contact-page.png)


## How to Run

### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/FadeHack/bridge.git
    ```
2. Navigate to the project directory:
    ```bash
    cd bridge-frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env.local` file from `.env.example`:
    ```bash
    cp .env.example .env.local
    ```
5. Start the development server:
    ```bash
    npm run dev
    ```

### Backend

1. Navigate to the project directory:
    ```bash
    cd bridge-backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file from `.env.example`:
    ```bash
    cp .env.example .env
    ```
4. Start the server:
    ```bash
    npm start
    ```

## Credit

*Created by [@FadeHack](https://github.com/FadeHack)*
