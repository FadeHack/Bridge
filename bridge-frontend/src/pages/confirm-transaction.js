import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Container, Spinner, Alert, AlertIcon, HStack, Image, Code, Divider } from '@chakra-ui/react';
import { apiHelper } from '../utils/apiHelper';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const TransactionDetail = ({ title, children }) => (
    <Box className="bg-zinc-800 p-4 rounded-md mb-4">
        <Heading size="md" mb={2} className="text-white">{title}</Heading>
        {children}
    </Box>
);

const TokenInfo = ({ tokenAddress, tokenName, tokenLogo }) => (
    <HStack spacing={2} alignItems="center">
        <Image src={tokenLogo} alt={tokenName} boxSize="24px" borderRadius="full" />
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
        <Container maxW="md" centerContent className='m-2 mt-12'>
            <Box className="p-4 m-auto rounded-lg shadow-md w-full h-screen overflow-hidden">
                <Heading mb={4} className="text-center text-2xl text-white font-semibold">Confirm Transaction</Heading>
                {error ? (
                    <Alert status="error" color={'white'} my={10} justifyContent="center" alignItems={"center"} flexDirection={'column'}>
                        <AlertIcon />
                        <Text>{error}</Text>
                    </Alert>
                ) : (
                    result && result.srcChainId ? (
                        <VStack spacing={4} align="stretch" className='text-white'>
                            <TransactionDetail title="Transaction Summary">
                                <Text mb={2}><strong>Source Chain ID:</strong> {result.srcChainId}</Text>
                                <Text mb={2}><strong>Destination Chain ID:</strong> {result.destChainId}</Text>
                                <Text mb={2}><strong>From Token Address:</strong> {result.fromTokenAddress}</Text>
                                <Text mb={2}><strong>To Token Address:</strong> {result.toTokenAddress}</Text>
                                <Text mb={2}><strong>From Token Amount:</strong> {result.fromTokenAmount}</Text>
                                <Text mb={2}><strong>To Token Amount:</strong> {result.toTokenAmount}</Text>
                                <Text mb={2}><strong>From Token Value:</strong> ${result.fromTokenValue}</Text>
                                <Text mb={2}><strong>To Token Value:</strong> ${result.toTokenValue}</Text>
                                <Text mb={2}><strong>Receiver Address:</strong> {result.receiveAddress}</Text>
                                <Text mb={2}><strong>Minimum Received:</strong> {result.minimumReceived}</Text>
                                <Text mb={2}><strong>Estimated Gas:</strong> {result.estimatedGas}</Text>
                                <Text mb={2}><strong>XY Fee:</strong> {result.xyFee?.amount} {result.xyFee?.symbol}</Text>
                                <Text mb={2}><strong>Estimated Transfer Time:</strong> {result.estimatedTransferTime} seconds</Text>
                                <Text mb={2}><strong>Transaction Counts:</strong> {result.transactionCounts}</Text>
                            </TransactionDetail>

                            <TransactionDetail title="Cross-Chain Swap">
                                <Text mb={2}><strong>From Token:</strong> {result.quote.crossChainSwap.fromToken.symbol}</Text>
                                <Text mb={2}><strong>To Token:</strong> {result.quote.crossChainSwap.toToken.symbol}</Text>
                                <Text mb={2}><strong>DEX Names:</strong> {result.quote.crossChainSwap.dexNames.join(', ')}</Text>
                            </TransactionDetail>

                            <TransactionDetail title="Destination Chain Swap">
                                <Text mb={2}><strong>From Token:</strong> {result.quote.destChainSwaps.fromToken.symbol}</Text>
                                <Text mb={2}><strong>To Token:</strong> {result.quote.destChainSwaps.toToken.symbol}</Text>
                                <Text mb={2}><strong>DEX Names:</strong> {result.quote.destChainSwaps.dexNames.join(', ')}</Text>
                            </TransactionDetail>

                            <Divider my={4} />

                            <HStack spacing={4} alignItems="center" justifyContent="center">
                                <TokenInfo 
                                    tokenAddress={fromTokenAddress}
                                    tokenName={fromTokenName}
                                    tokenLogo={fromTokenLogo}
                                />
                                <Text className="text-white">→</Text>
                                <TokenInfo 
                                    tokenAddress={toTokenAddress}
                                    tokenName={toTokenName}
                                    tokenLogo={toTokenLogo}
                                />
                            </HStack>

                            <TransactionDetail title="Transaction Data">
                                <Code colorScheme="teal" p={2}>{result.tx.data}</Code>
                            </TransactionDetail>
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
