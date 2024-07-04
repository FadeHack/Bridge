// src/app/page.js

"use client";
import { useState, useEffect } from 'react';
import { Box, Button, Heading, HStack, Text, VStack, Image, Input, useBreakpointValue } from '@chakra-ui/react';
import { TokenList, Sidebar } from '../components';
import { useRouter } from 'next/navigation';
import { MdClose, MdSwapHoriz } from 'react-icons/md';

const HomePage = () => {
    const router = useRouter();
    const [selectedTokens, setSelectedTokens] = useState([]);
    const [amount, setAmount] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    // Use responsive styles for button and input width
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const inputWidth = useBreakpointValue({ base: '100%', md: '150px' });

    const handleSelectToken = (token) => {
        if (selectedTokens.some((t) => t.address === token.address)) {
            handleDeselectToken(token);
        } else if (selectedTokens.length < 2) {
            setSelectedTokens((prev) => [...prev, token]);
        } else {
            alert('2 tokens already selected. Unselect any one to select another.');
        }
    };

    const handleDeselectToken = (token) => {
        setSelectedTokens((prev) => prev.filter((t) => t.address !== token.address));
    };

    const handleClearSelection = () => {
        setSelectedTokens([]);
        setAmount('');
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleGetQuote = () => {
        if (selectedTokens.length === 2 && amount) {
            // Assuming both tokens have the same decimals
            const decimals = selectedTokens[0].decimals;
            const paddedAmount = (parseFloat(amount) * Math.pow(10, decimals)).toFixed(0);
    
            // Construct query parameters using URLSearchParams
            const queryParams = new URLSearchParams({
                srcChainId: selectedTokens[0].chainId,
                fromTokenAddress: selectedTokens[0].address,
                fromTokenName: selectedTokens[0].name,
                fromTokenSymbol: selectedTokens[0].symbol,
                fromTokenLogo: selectedTokens[0].logoURI,
                fromTokenDecimals: selectedTokens[0].decimals,
                destChainId: selectedTokens[1].chainId,
                toTokenAddress: selectedTokens[1].address,
                toTokenName: selectedTokens[1].name,
                toTokenSymbol: selectedTokens[1].symbol,
                toTokenLogo: selectedTokens[1].logoURI,
                toTokenDecimals: selectedTokens[1].decimals,
                amount: paddedAmount,
                decimal: decimals,
            }).toString();
    
            router.push(`/quote?${queryParams}`);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);  // Define mobile screen width as 768px
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Box className="min-h-screen bg-zinc-900">
            <Sidebar />
            <Box className="p-6 mt-14 mb-6 pt-16 md:pt-6 md:ml-64">
                <VStack spacing={4} align="stretch">
                    <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        className="text-white p-4 bg-zinc-700 rounded-lg shadow-lg"
                        style={{ position: 'sticky', top: '5rem', zIndex: 10 }}
                        spacing={{ base: 2, md: 4 }}
                        direction={{ base: 'column', md: 'row' }}
                    >
                        <Text flex="1" textAlign={{ base: 'center', md: 'left' }}>
                            {selectedTokens.length} selected
                        </Text>
                        <HStack
                            spacing={{ base: 2, md: 4 }}
                            direction={{ base: 'column', md: 'row' }}
                            flex="1"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {selectedTokens.map((token, index) => (
                                <HStack key={token.address} spacing={2} alignItems="center">
                                    <Image src={token.logoURI} alt={token.name} boxSize="20px" borderRadius="100%" />
                                    <Text>{token.name}</Text>
                                    {index === 0 && <MdSwapHoriz size={'20px'} />}
                                </HStack>
                            ))}
                            {selectedTokens.length === 2 && !isMobile && (
                                <>
                                    <Input
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        width={inputWidth}
                                        color="white"
                                        bg="gray.700"
                                    />
                                    <Button
                                        onClick={handleGetQuote}
                                        colorScheme="teal"
                                        size={buttonSize}
                                        isDisabled={!amount}
                                    >
                                        Get Quote
                                    </Button>
                                </>
                            )}
                        </HStack>
                        {selectedTokens.length > 0 && (
                            <MdClose
                                onClick={handleClearSelection}
                                className="cursor-pointer text-xl"
                                style={{ marginTop: { base: '1rem', md: '0' } }}
                            />
                        )}
                    </HStack>
                    {selectedTokens.length === 2 && isMobile && (
                        <VStack spacing={4} mt={4} align="stretch" className="text-white p-4 bg-zinc-700 rounded-lg shadow-lg" style={{ position: 'sticky', top: '9rem', zIndex: 10 }}>
                            <Input
                                placeholder="Enter amount"
                                value={amount}
                                onChange={handleAmountChange}
                                width={inputWidth}
                                color="white"
                                bg="gray.700"
                            />
                            <Button
                                onClick={handleGetQuote}
                                colorScheme="teal"
                                size={buttonSize}
                                isDisabled={!amount}
                            >
                                Get Quote
                            </Button>
                        </VStack>
                    )}
                    <Heading my={12} className="text-center text-2xl font-semibold text-white">
                        Select a Token
                    </Heading>
                    <TokenList selectedTokens={selectedTokens} onSelectToken={handleSelectToken} />
                </VStack>
            </Box>
        </Box>
    );
};

export default HomePage;
