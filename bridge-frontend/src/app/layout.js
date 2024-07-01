// src/app/layout.js
import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </body>
        </html>
    );
};

export default RootLayout;
