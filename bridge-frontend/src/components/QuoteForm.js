// src/components/QuoteForm.js

import { Box, Text, VStack, HStack, Image, Grid, Flex } from '@chakra-ui/react';
import { MdSwapHoriz } from 'react-icons/md';

const QuoteForm = ({ quote, fromTokenName, fromTokenLogo, toTokenName, toTokenLogo }) => {
    if (!quote) return null;

    const {
        fromTokenAmount,
        quote: {
            crossChainSwap: {
                fromToken,
                toToken
            },
            destChainSwaps,
            toTokenAmount
        },
        xyFee,
        estimatedGas,
        minimumReceived,
        estimatedTransferTime,
        transactionCounts
    } = quote;

    return (
        <Box className="p-6 bg-zinc-800 rounded-lg shadow-lg w-full">
            <VStack spacing={4} align="stretch" className="text-white">
            <Text><strong>Details: </strong></Text>

                <Flex justify="space-between" align="center" className="bg-zinc-700 p-4 rounded-md">
                    <HStack spacing={2} alignItems="center">
                        <Image src={fromTokenLogo} alt={fromTokenName} boxSize="30px" borderRadius="full" />
                        <Text>{fromTokenName}</Text>
                    </HStack>
                    <MdSwapHoriz size="24px" />
                    <HStack spacing={2} alignItems="center">
                        <Image src={toTokenLogo} alt={toTokenName} boxSize="30px" borderRadius="full" />
                        <Text>{toTokenName}</Text>
                    </HStack>
                </Flex>
                <Box className="bg-zinc-700 p-4 rounded-md">
                    <Text><strong>From Amount:</strong> {fromTokenAmount} {fromTokenName}</Text>
                    <Text><strong>To Amount:</strong> {toTokenAmount} {toTokenName}</Text>
                    <Text><strong>Quote Fee:</strong> {xyFee.amount} {xyFee.symbol}</Text>
                </Box>
                <Box className="bg-zinc-700 p-4 rounded-md">
                    <Text><strong>Estimated Gas:</strong> {estimatedGas}</Text>
                    <Text><strong>Minimum Received:</strong> {minimumReceived} {toTokenName}</Text>
                    <Text><strong>Estimated Transfer Time:</strong> {estimatedTransferTime} seconds</Text>
                    <Text><strong>Transaction Counts:</strong> {transactionCounts}</Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default QuoteForm;
