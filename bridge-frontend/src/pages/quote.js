// src/pages/quote.js

import { useSearchParams } from 'next/navigation';
import { Box, Heading, Text, Divider, VStack, Container } from '@chakra-ui/react';
import { TransactionParams, QuoteForm } from '../components';
import { useState } from 'react';

const QuotePage = () => {
    const searchParams = useSearchParams();
    const tokenId = searchParams.get('token'); // Get token ID from query parameters
    const [quote, setQuote] = useState(null);
    const [transactionParams, setTransactionParams] = useState(null);

    const handleQuoteFetched = async (quoteData) => {
        try {
            // Simulate fetching transaction parameters
            const mockTransactionParams = {
                transactionId: '0x1234567890abcdef',
                gasPrice: '100 Gwei',
                gasLimit: '21000'
            };
            setQuote(quoteData);
            setTransactionParams(mockTransactionParams);
        } catch (error) {
            console.error('Failed to fetch transaction parameters', error);
        }
    };

    return (
        <Container maxW="md" centerContent className='m-2 '>
            <Box className="p-4 m-auto rounded-lg shadow-md w-full h-screen overflow-hidden">
                <Heading mb={4} className="text-center text-2xl text-white font-semibold">Get a Quote</Heading>
                {tokenId ? (
                    <VStack spacing={4}>
                        <QuoteForm token={{ id: tokenId }} onQuoteFetched={handleQuoteFetched} />
                        <Divider />
                        <TransactionParams transactionParams={transactionParams} />
                    </VStack>
                ) : (
                    <Text className="text-center text-gray-500">No token selected</Text>
                )}
            </Box>
        </Container>
    );
};

export default QuotePage;
