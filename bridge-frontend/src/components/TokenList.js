import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Spinner, Text, VStack, HStack, Image } from '@chakra-ui/react';
import { HiCheck } from 'react-icons/hi';
import { apiHelper } from '../utils/apiHelper';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const TokenList = ({ selectedTokens, onSelectToken }) => {
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTokens = async () => {
            setLoading(true);
            try {
                const data = await apiHelper.get(API_ENDPOINTS.TOKENS);
                if (data.isSuccess) {
                    const uniqueTokens = data.recommendedTokens.filter((token, index, self) =>
                        index === self.findIndex((t) => (
                            t.address === token.address
                        ))
                    );
                    setTokens(uniqueTokens);
                }
            } catch (error) {
                console.error('Failed to fetch tokens:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTokens();
    }, []);

    const isSelected = (token) => selectedTokens.some((t) => t.address === token.address);

    return (
        <Box className="p-4 bg-zinc-800 rounded-lg shadow-lg h-1/2 overflow-y-auto">
            {loading ? (
                <Spinner size="lg" color="white" />
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {tokens.map((token) => (
                        <Box
                            key={token.address}
                            onClick={() => onSelectToken(token)}
                            className={`cursor-pointer p-4 bg-zinc-700 border border-zinc-600 rounded-lg shadow-md hover:bg-zinc-600 relative ${
                                isSelected(token) ? 'bg-zinc-600' : ''
                            }`}
                        >
                            {isSelected(token) && (
                                <Box className="absolute top-2 right-2 bg-teal-500 rounded-full p-1">
                                    <HiCheck className="text-white" />
                                </Box>
                            )}
                            <HStack spacing={4}>
                                <Image src={token.logoURI} alt={token.name} boxSize="40px" />
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
                            </HStack>
                        </Box>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default TokenList;
