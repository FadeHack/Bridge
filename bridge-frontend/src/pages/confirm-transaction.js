// src/pages/confirm-transaction.js

import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { apiHelper } from '../utils/apiHelper';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const ConfirmTransaction = () => {
    const searchParams = useSearchParams();
    const quoteId = searchParams.get('quoteId'); // Get quote ID from query parameters
    const [result, setResult] = useState(null);

    const handleConfirm = async () => {
        try {
            await apiHelper.post(`${API_ENDPOINTS.PARAMS}/${quoteId}`); // Confirm the transaction
            setResult('Transaction confirmed successfully!');
        } catch (error) {
            console.error('Failed to confirm transaction', error);
        }
    };

    return (
        <Box className="p-4 max-w-md mx-auto">
            <Heading mb={4} className="text-center">Confirm Transaction</Heading>
            <Button colorScheme="blue" onClick={handleConfirm}>
                Confirm
            </Button>
            {result && <Text mt={4}>{result}</Text>}
        </Box>
    );
};

export default ConfirmTransaction;
