// src/components/QuoteForm.js

import { Box, Text, VStack, HStack, Image } from '@chakra-ui/react';
import { MdSwapHoriz } from 'react-icons/md';

const QuoteForm = ({ quote }) => {
    if (!quote) return null;

    const {
        fromTokenAddress,
        toTokenAddress,
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
        <VStack spacing={4} align="stretch">
            <HStack spacing={2} alignItems="center">
                <Image src={fromToken.logoURI} alt={fromToken.symbol} boxSize="20px" borderRadius="full" />
                <Text>{fromToken.symbol}</Text>
                <MdSwapHoriz size="20px" />
                <Image src={toToken.logoURI} alt={toToken.symbol} boxSize="20px" borderRadius="full" />
                <Text>{toToken.symbol}</Text>
            </HStack>
            <Text><strong>From Amount:</strong> {fromTokenAmount} {fromToken.symbol}</Text>
            <Text><strong>To Amount:</strong> {toTokenAmount} {toToken.symbol}</Text>
            <Text><strong>Quote Fee:</strong> {xyFee.amount} {xyFee.symbol}</Text>
            <Text><strong>Estimated Gas:</strong> {estimatedGas}</Text>
            <Text><strong>Minimum Received:</strong> {minimumReceived} {toToken.symbol}</Text>
            <Text><strong>Estimated Transfer Time:</strong> {estimatedTransferTime} seconds</Text>
            <Text><strong>Transaction Counts:</strong> {transactionCounts}</Text>
        </VStack>
    );
};

export default QuoteForm;
