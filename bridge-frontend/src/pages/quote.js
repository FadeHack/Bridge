import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Container, Spinner, Alert, AlertIcon, HStack, Image, Button } from '@chakra-ui/react';
import { MdSwapHoriz } from 'react-icons/md';
import { QuoteForm } from '../components';
import { apiHelper } from '../utils/apiHelper';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { useRouter } from 'next/router';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (!srcChainId || !fromTokenAddress || !amount || !destChainId || !toTokenAddress) {
            setLoading(false);
            return;
        }

        const fetchQuote = async () => {
            setLoading(true);
            try {
                const response = await apiHelper.get(`${API_ENDPOINTS.QUOTES}?srcChainId=${srcChainId}&fromTokenAddress=${fromTokenAddress}&amount=${amount}&destChainId=${destChainId}&toTokenAddress=${toTokenAddress}`);
                console.log(response);
                if (response.isSuccess) {
                    setQuote(response);
                    setError(null);
                } else {
                    setError(response.msg || "Failed to fetch the quote.");
                }
            } catch (error) {
                setError("An error occurred while fetching the quote.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, [srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress]);

    const handleBridgeClick = () => {

        const params = new URLSearchParams({
            srcChainId,
            fromTokenAddress,
            amount,
            destChainId,
            toTokenAddress,
            receiveAddress: '0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef',
            fromTokenLogo,
            toTokenLogo,
        });

        router.push(`/confirm-transaction?${params.toString()}`);
    };

    if (loading) {
        return (
            <Container maxW="md" centerContent className='m-2 mt-12'>
                <Box className="p-4 m-auto rounded-lg shadow-md w-full h-screen overflow-hidden">
                    <Heading mb={4} className="text-center text-2xl text-white font-semibold">Fetching Quote...</Heading>
                    <Spinner size="lg" />
                </Box>
            </Container>
        );
    }

    return (
        <Container w-full centerContent className='m-2 mt-12'>
            <Box className="p-4 m-auto rounded-lg shadow-md w-full h-screen overflow-hidden">
                <Heading mb={4} className="text-center text-2xl text-white font-semibold">Quote</Heading>
                {error ? (
                    <Alert status="error" color={'white'} my={10} justifyContent="center" alignItems={"center"} flexDirection={'column'}>
                        <AlertIcon />
                        <Text>{error}</Text>
                    </Alert>
                ) : (
                    <VStack spacing={4} align="stretch">
                        <Box className="bg-zinc-800 p-4 rounded-md mb-4">
                            <HStack spacing={2} alignItems="center" justifyContent="center">
                                <Image src={fromTokenLogo} alt={fromTokenName} boxSize="24px" borderRadius="full" />
                                <Text className="text-white">{fromTokenName}</Text>
                                <MdSwapHoriz size="24px" className="text-white" />
                                <Image src={toTokenLogo} alt={toTokenName} boxSize="24px" borderRadius="full" />
                                <Text className="text-white">{toTokenName}</Text>
                            </HStack>
                        </Box>
                        {quote && (
                            <QuoteForm
                                quote={quote}
                                fromTokenName={fromTokenName}
                                fromTokenLogo={fromTokenLogo}
                                toTokenName={toTokenName}
                                toTokenLogo={toTokenLogo}
                            />
                        )}
                        <Button onClick={handleBridgeClick} className="text-white bg-teal-700 hover:bg-teal-600 my-4 p-2 rounded-lg shadow-lg w-fit">
                            Bridge
                        </Button>
                    </VStack>
                )}
            </Box>
        </Container>
    );
};

export default QuotePage;
