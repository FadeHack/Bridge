import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Select, VStack, FormErrorMessage, Heading, Text, Icon } from '@chakra-ui/react';
import { FiArrowRightCircle, FiInfo } from 'react-icons/fi';

const QuoteForm = ({ token, onQuoteFetched }) => {
    const [selectedChain, setSelectedChain] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate fetching a quote
            const mockQuoteData = {
                quoteId: 'quote123',
                amount: '1000 USD',
                fromChain: 'Ethereum',
                toChain: 'Binance Smart Chain',
            };
            onQuoteFetched(mockQuoteData);
        } catch (error) {
            setError('Failed to fetch quote');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="p-6 bg-zinc-800 border border-zinc-500 rounded-lg shadow-lg w-10/12 mx-auto">
            <Heading as="h2" size="lg" mb={6} textAlign="center" className='text-white'>
                Request a Quote
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={6} align="stretch">
                    <FormControl id="chain" isInvalid={error} className="w-full">
                        <FormLabel>
                            <Text className='text-white' fontWeight="medium">
                                Select Chain
                            </Text>
                        </FormLabel>
                        <Select
                            placeholder="Select a chain"
                            value={selectedChain}
                            onChange={(e) => setSelectedChain(e.target.value)}
                            className="min-w-full h-10 bg-zinc-200 border border-zinc-400 rounded-md shadow-sm hover:bg-zinc-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            icon={false}
                            _focus={{ boxShadow: 'none' }}
                        >
                            <option value="ethereum">Ethereum</option>
                            <option value="binance">Binance Smart Chain</option>
                            <option value="cardano">Cardano</option>
                        </Select>
                        {error && <FormErrorMessage>{error}</FormErrorMessage>}
                    </FormControl>
                    <Button
                        type="submit"
                        isLoading={loading}
                        loadingText="Fetching Quote"
                        rightIcon={<FiArrowRightCircle />}
                        className="shadow-md hover:bg-[rgba(69,70,73,0.9)] px-8 py-2 bg-[#717376] rounded-md text-white font-light transition duration-200 ease-linear"
                    >
                        Get Quote
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default QuoteForm;
