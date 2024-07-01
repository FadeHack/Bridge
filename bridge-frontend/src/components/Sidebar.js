// src/components/Sidebar.js

import { Box, Text, Divider, VStack, Link } from '@chakra-ui/react';
import { HiHome, HiInformationCircle, HiMail } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();

    return (
        <Box className="w-64 bg-black text-white p-6 flex flex-col h-screen fixed top-0 left-0">
            <Text className="text-3xl font-bold mb-6">Bridge</Text>
            <Divider borderColor="whiteAlpha.300" />
            <VStack spacing={4} mt={6} align="start">
                <Link
                    href="/"
                    className="flex items-center text-lg hover:text-zinc-400"
                    onClick={() => router.push('/')}
                >
                    <HiHome className="mr-2 text-2xl" />
                    Home
                </Link>
                <Link
                    href="/about"
                    className="flex items-center text-lg hover:text-zinc-400"
                    onClick={() => router.push('/about')}
                >
                    <HiInformationCircle className="mr-2 text-2xl" />
                    About
                </Link>
                <Link
                    href="/contact"
                    className="flex items-center text-lg hover:text-zinc-400"
                    onClick={() => router.push('/contact')}
                >
                    <HiMail className="mr-2 text-2xl" />
                    Contact
                </Link>
            </VStack>
            <Text className="text-sm text-center mt-auto">© 2024 Bridge</Text>
        </Box>
    );
};

export default Sidebar;
