import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Container, Spinner, Alert, AlertIcon, HStack, Image, Divider, Grid, GridItem, Flex } from '@chakra-ui/react';
import { apiHelper } from '../utils/apiHelper';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { MdSwapHoriz } from 'react-icons/md';

const TransactionDetail = ({ title, children }) => (
    <Box className="bg-zinc-800 p-4 rounded-md mb-4">
        <Heading size="md" mb={2} className="text-white font-bold">{title}</Heading>
        {children}
    </Box>
);

const TokenInfo = ({ tokenAddress, tokenName, tokenLogo }) => (
    <HStack spacing={2} alignItems="center">
        <Image src={tokenLogo} alt={tokenName} boxSize="40px" borderRadius="full" />
        <Text className="text-white">{tokenName}</Text>
    </HStack>
);

const ConfirmTransaction = () => {
    const searchParams = useSearchParams();
    const srcChainId = searchParams.get('srcChainId');
    const fromTokenAddress = searchParams.get('fromTokenAddress');
    const fromTokenLogo = decodeURIComponent(searchParams.get('fromTokenLogo') || '');
    const fromTokenName = searchParams.get('fromTokenName');
    const amount = searchParams.get('amount');
    const destChainId = searchParams.get('destChainId');
    const toTokenAddress = searchParams.get('toTokenAddress');
    const toTokenLogo = decodeURIComponent(searchParams.get('toTokenLogo') || '');
    const toTokenName = searchParams.get('toTokenName');
    const receiveAddress = searchParams.get('receiveAddress');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (srcChainId && fromTokenAddress && amount && destChainId && toTokenAddress && receiveAddress) {
            const fetchData = async () => {
                try {
                    const response = await apiHelper.get(`${API_ENDPOINTS.PARAMS}?srcChainId=${srcChainId}&fromTokenAddress=${fromTokenAddress}&amount=${amount}&destChainId=${destChainId}&toTokenAddress=${toTokenAddress}&receiveAddress=${receiveAddress}`);
                    if (response.isSuccess) {
                        setResult(response);
                        setError(null);
                    } else {
                        setError(response.msg || "Failed to confirm the transaction.");
                    }
                } catch (error) {
                    setError("An error occurred while fetching the transaction details.");
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        } else {
            setLoading(false);
        }
    }, [srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress, receiveAddress]);

    if (loading) {
        return (
            <Container maxW="md" centerContent className='m-2 mt-12'>
                <Box className="p-4 m-auto rounded-lg shadow-md w-full h-screen overflow-hidden">
                    <Heading mb={4} className="text-center text-2xl text-white font-semibold">Fetching Transaction Details...</Heading>
                    <Spinner size="lg" />
                </Box>
            </Container>
        );
    }

    return (
        <Container centerContent className='m-2 mt-12'>
            <Box className="p-4 m-auto rounded-lg shadow-md w-full h-screen overflow-hidden">
                <Heading mb={4} className="text-center text-2xl text-white font-semibold"> Transaction </Heading>
                {error ? (
                    <Alert status="error" color={'white'} my={10} justifyContent="center" alignItems={"center"} flexDirection={'column'}>
                        <AlertIcon />
                        <Text>{error}</Text>
                    </Alert>
                ) : (
                    result && result.srcChainId ? (
                        <VStack spacing={4} align="stretch" className='text-white'>
                            {/* Transaction Summary - Use Grid for better layout */}
                            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mb={4} className="text-white">
                                <GridItem colSpan={{ base: 1, md: 1 }}>
                                    <TransactionDetail title="Transaction Details">
                                        <Text mb={2}><strong>Source Chain ID:</strong> {result.srcChainId}</Text>
                                        <Text mb={2}><strong>Destination Chain ID:</strong> {result.destChainId}</Text>
                                        <Text className='truncate w-56 md:w-full' mb={2}><strong>From Token Address:</strong> {result.fromTokenAddress}</Text>
                                        <Text className='truncate w-56 md:w-full' mb={2}><strong>To Token Address:</strong> {result.toTokenAddress}</Text>
                                        <Text mb={2}><strong>From Token Amount:</strong> {result.fromTokenAmount}</Text>
                                        <Text mb={2}><strong>To Token Amount:</strong> {result.toTokenAmount}</Text>
                                    </TransactionDetail>
                                </GridItem>
                                <GridItem colSpan={{ base: 1, md: 1 }}>
                                    <TransactionDetail title="Transaction Summary">
                                        <Text mb={2}><strong>From Token Value:</strong> ${result.fromTokenValue}</Text>
                                        <Text mb={2}><strong>To Token Value:</strong> ${result.toTokenValue}</Text>
                                        <Text className='truncate w-56 md:w-full' mb={2}><strong>Receiver Address:</strong> {result.receiveAddress}</Text>
                                        <Text mb={2}><strong>Minimum Received:</strong> {result.minimumReceived}</Text>
                                        <Text mb={2}><strong>Estimated Gas:</strong> {result.estimatedGas}</Text>
                                        <Text mb={2}><strong>XY Fee:</strong> {result.xyFee?.amount} {result.xyFee?.symbol}</Text>
                                    </TransactionDetail>
                                </GridItem>
                                <GridItem colSpan={{ base: 1, md: 1 }}>
                                    <TransactionDetail title="Estimated Time & Counts">
                                        <Text mb={2}><strong>Estimated Transfer Time:</strong> {result.estimatedTransferTime} seconds</Text>
                                        <Text mb={2}><strong>Transaction Counts:</strong> {result.transactionCounts}</Text>
                                    </TransactionDetail>
                                </GridItem>
                            </Grid>


                            <Divider my={4} />

                            <Flex justifyContent="center" alignItems="center">
                                <TokenInfo 
                                    tokenAddress={fromTokenAddress}
                                    tokenName={fromTokenName}
                                    tokenLogo={fromTokenLogo}
                                />
                                <MdSwapHoriz size={'30px'} />
                                <TokenInfo 
                                    tokenAddress={toTokenAddress}
                                    tokenName={toTokenName}
                                    tokenLogo={toTokenLogo}
                                />
                            </Flex>
                        </VStack>
                    ) : (
                        <Alert status="error" color={'white'} my={10} justifyContent="center" alignItems={"center"} flexDirection={'column'}>
                            <AlertIcon />
                            <Text>No transaction details available.</Text>
                        </Alert>
                    )
                )}
            </Box>
        </Container>
    );
};

export default ConfirmTransaction;