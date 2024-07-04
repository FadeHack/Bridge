// src/pages/quote.js

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, Divider, VStack, Container, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { QuoteForm, TransactionParams } from '../components';
import { apiHelper } from '../utils/apiHelper';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const QuotePage = () => {
    const searchParams = useSearchParams();
    const srcChainId = searchParams.get('srcChainId');
    const fromTokenAddress = searchParams.get('fromTokenAddress');
    const fromTokenName = searchParams.get('fromTokenName');
    const fromTokenLogo = decodeURIComponent(searchParams.get('fromTokenLogo') || '');
    const amount = searchParams.get('amount');
    const destChainId = searchParams.get('destChainId');
    const toTokenAddress = searchParams.get('toTokenAddress');
    const toTokenName = searchParams.get('toTokenName');
    const toTokenLogo = decodeURIComponent(searchParams.get('toTokenLogo') || '');
    const [quote, setQuote] = useState(null);
    const [transactionParams, setTransactionParams] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuote = async () => {
            console.log(`${API_ENDPOINTS.QUOTES}?srcChainId=${srcChainId}&fromTokenAddress=${fromTokenAddress}&amount=${amount}&destChainId=${destChainId}&toTokenAddress=${toTokenAddress}`)
            try {
                const response = await apiHelper.get(`${API_ENDPOINTS.QUOTES}?srcChainId=${srcChainId}&fromTokenAddress=${fromTokenAddress}&amount=${amount}&destChainId=${destChainId}&toTokenAddress=${toTokenAddress}`);
                setQuote(response);
                // Mock transaction parameters
                const mockTransactionParams = {
                    transactionId: '0x1234567890abcdef',
                    gasPrice: '100 Gwei',
                    gasLimit: '21000'
                };
                setTransactionParams(mockTransactionParams);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, [srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress]);

    if (loading) {
        return (
            <Container maxW="md" centerContent className='m-2 mt-12 '>
                <Box className="p-4 m-auto rounded-lg shadow-md w-full h-screen overflow-hidden">
                    <Heading mb={4} className="text-center text-2xl text-white font-semibold">Fetching Quote...</Heading>
                    <Spinner size="lg" />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxW="md" centerContent className='m-2 mt-12 '>
            <Box className="p-4 m-auto rounded-lg shadow-md w-full h-screen overflow-hidden">
                <Heading mb={4} className="text-center text-2xl text-white font-semibold">Get a Quote</Heading>
                {error ? (
                    <Alert status="error" my={10} justifyContent="center" alignItems={"center"}>
                        <AlertIcon />
                    </Alert>
                ) : (
                    <VStack spacing={4} align="stretch">
                        <Box className="bg-zinc-800 p-4 rounded-md mb-4">
                            <Text className="text-white font-semibold">From</Text>
                            <Box className="flex items-center space-x-2 mt-2">
                                <img src={fromTokenLogo} alt={fromTokenName} width={24} height={24} />
                                <Text className="text-white">{fromTokenName}</Text>
                            </Box>
                            <Text className="text-white mt-2">Amount: {amount}</Text>
                        </Box>
                        <Box className="bg-zinc-800 p-4 rounded-md mb-4">
                            <Text className="text-white font-semibold">To</Text>
                            <Box className="flex items-center space-x-2 mt-2">
                                <img src={toTokenLogo} alt={toTokenName} width={24} height={24} />
                                <Text className="text-white">{toTokenName}</Text>
                            </Box>
                            <Text className="text-white mt-2">Amount: {amount}</Text>
                        </Box>
                        {quote && <QuoteForm quote={quote} />}
                        {transactionParams && <TransactionParams {...transactionParams} />}
                    </VStack>
                )}
            </Box>
        </Container>
    );
};

export default QuotePage;
