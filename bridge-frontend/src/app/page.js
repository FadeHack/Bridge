// src/app/page.js
"use client";
import { Box, Heading } from '@chakra-ui/react';
import { TokenList, Sidebar } from '../components';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();

    const handleSelectToken = (token) => {
        // Redirect to the quote page with the selected token ID
        router.push(`/quote?token=${token.id}`);
    };

    return (
        <Box className="min-h-dvh bg-zinc-900 grid grid-cols-12" >
            <Box className="col-span-2 bg-gray-800 text-white">
                <Sidebar />
            </Box>
            <Box className="col-span-10 p-6">
                <Heading mb={4} className="text-center text-2xl font-semibold text-white">
                    Select a Token
                </Heading>
                <TokenList onSelectToken={handleSelectToken} />
            </Box>
        </Box>
    );
};

export default HomePage;
