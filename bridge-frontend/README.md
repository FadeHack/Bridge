# Bridge Frontend

This is the frontend for the Bridge application using Next.js.

## Getting Started

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Run the development server**:
    ```bash
    npm run dev
    ```

3. **Visit** [http://localhost:3000](http://localhost:3000) to view the application.

## Components

- **TokenList**: Displays a list of tokens fetched from the backend.
- **QuoteForm**: Form for selecting a token and chain, and fetching a quote.
- **TransactionParams**: Displays transaction parameters after accepting a quote.

## Pages

- **/ (Home Page)**: Displays a list of tokens.
- **/quote**: Displays the quote form and transaction parameters.
- **/confirm-transaction**: Confirms the transaction.

## Utilities

- **apiHelper.js**: Contains helper functions for making API requests.
- **errorHandler.js**: Handles API errors.

## Constants

- **apiEndpoints.js**: Contains API endpoints for the backend.

## Styles

- **globals.css**: Global CSS styles.
- **Home.module.css**: Styles for the Home page.

## License

This project is licensed under the MIT License.
