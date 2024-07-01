import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Spinner, Text, VStack, HStack } from '@chakra-ui/react';

const mockTokens = [
    { id: '1', name: 'Bitcoin', chainId: 'BTC', address: '0x...', symbol: 'BTC' },
    { id: '2', name: 'Ethereum', chainId: 'ETH', address: '0x...', symbol: 'ETH' },
    { id: '3', name: 'Binance Coin', chainId: 'BNB', address: '0x...', symbol: 'BNB' },
    { id: '4', name: 'Cardano', chainId: 'ADA', address: '0x...', symbol: 'ADA' },
    { id: '5', name: 'Solana', chainId: 'SOL', address: '0x...', symbol: 'SOL' },
    { id: '6', name: 'Polkadot', chainId: 'DOT', address: '0x...', symbol: 'DOT' },
    { id: '7', name: 'Chainlink', chainId: 'LINK', address: '0x...', symbol: 'LINK' },
    { id: '8', name: 'Litecoin', chainId: 'LTC', address: '0x...', symbol: 'LTC' },
    { id: '9', name: 'Uniswap', chainId: 'UNI', address: '0x...', symbol: 'UNI' },
    { id: '10', name: 'Avalanche', chainId: 'AVAX', address: '0x...', symbol: 'AVAX' },
    { id: '11', name: 'Polygon', chainId: 'MATIC', address: '0x...', symbol: 'MATIC' },
    { id: '12', name: 'Stellar', chainId: 'XLM', address: '0x...', symbol: 'XLM' },
    { id: '13', name: 'VeChain', chainId: 'VET', address: '0x...', symbol: 'VET' },
    { id: '14', name: 'Tron', chainId: 'TRX', address: '0x...', symbol: 'TRX' },
    { id: '15', name: 'EOS', chainId: 'EOS', address: '0x...', symbol: 'EOS' },
    { id: '16', name: 'Tezos', chainId: 'XTZ', address: '0x...', symbol: 'XTZ' },
    { id: '17', name: 'NEO', chainId: 'NEO', address: '0x...', symbol: 'NEO' },
    { id: '18', name: 'Cosmos', chainId: 'ATOM', address: '0x...', symbol: 'ATOM' },
];

const TokenList = ({ onSelectToken }) => {
    const [tokens, setTokens] = useState(mockTokens);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simulate a delay for the mock data
        const fetchTokens = () => {
            setLoading(true);
            setTimeout(() => {
                setTokens(mockTokens);
                setLoading(false);
            }, 1000);
        };

        fetchTokens();
    }, []);

    return (
        <Box className="p-4 bg-zinc-800 rounded-lg shadow-lg h-1/2 overflow-y-auto">
            {loading ? (
                <Spinner size="lg" />
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {tokens.map((token) => (
                        <Box
                            key={token.id}
                            onClick={() => onSelectToken(token)}
                            className="cursor-pointer p-4 bg-zinc-700 border border-zinc-600 rounded-lg shadow-md hover:bg-zinc-600"
                        >
                            <VStack spacing={2} align="start">
                                <Text className="text-white font-bold text-lg">{token.name}</Text>
                                <HStack spacing={1}>
                                    <Text className="text-gray-400">Chain ID:</Text>
                                    <Text className="text-white">{token.chainId}</Text>
                                </HStack>
                                <HStack spacing={1}>
                                    <Text className="text-gray-400">Address:</Text>
                                    <Text className="text-white truncate w-40">{token.address}</Text>
                                </HStack>
                                <HStack spacing={1}>
                                    <Text className="text-gray-400">Symbol:</Text>
                                    <Text className="text-white">{token.symbol}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default TokenList;
