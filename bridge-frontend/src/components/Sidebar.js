import { Box, Text, Divider, VStack, Link, Flex, IconButton } from '@chakra-ui/react';
import { HiHome, HiInformationCircle, HiMail, HiMenu, HiX } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Sidebar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [showHamburger, setShowHamburger] = useState(false);

    // Update the hamburger state based on screen size
    useEffect(() => {
        const handleResize = () => {
            setShowHamburger(window.innerWidth <= 768); // Adjust breakpoint as needed
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check on load

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleClose = () => setIsOpen(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <Box className="hidden md:flex w-64 bg-black text-white p-6 flex-col h-screen fixed top-0 left-0">
                <Text className="text-3xl font-bold mb-6 text-teal-600">Bridge</Text>
                <Divider borderColor="whiteAlpha.300" />
                <VStack spacing={4} mt={6} align="start">
                    <Link
                        href="/"
                        className="flex items-center text-lg hover:text-teal-700"
                        onClick={() => router.push('/')}
                    >
                        <HiHome className="mr-2 text-2xl" />
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="flex items-center text-lg hover:text-teal-700"
                        onClick={() => router.push('/about')}
                    >
                        <HiInformationCircle className="mr-2 text-2xl" />
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="flex items-center text-lg hover:text-teal-700"
                        onClick={() => router.push('/contact')}
                    >
                        <HiMail className="mr-2 text-2xl" />
                        Contact
                    </Link>
                </VStack>
                <Text className="text-sm text-center mt-auto">© 2024 Bridge</Text>
            </Box>

            {/* Mobile Navbar */}
            <Flex className="bg-black text-white p-4 items-center justify-between fixed top-0 left-0 right-0 z-10">
                <Text className="text-3xl font-bold text-teal-600">Bridge</Text>

                {/* Show hamburger only on smaller screens */}
                {showHamburger && (
                    <IconButton
                        icon={<HiMenu />}
                        aria-label="Menu"
                        variant="outline"
                        color='white'
                        onClick={handleToggle}
                    />
                )}
            </Flex>

            {/* Mobile Sidebar */}
            {isOpen && (
                <Box className="md:hidden bg-black text-white p-6 flex-col h-screen fixed top-0 left-0 right-0 z-20">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text className="text-3xl font-bold text-teal-600">Bridge</Text>
                        <IconButton
                            icon={<HiX />}
                            aria-label="Close"
                            variant="outline"
                            color='white'
                            onClick={handleClose}
                        />
                    </Flex>
                    <VStack spacing={4} mt={6} align="start">
                        <Link
                            href="/"
                            className="flex items-center text-lg hover:text-teal-600"
                            onClick={() => {
                                router.push('/');
                                handleClose();
                            }}
                        >
                            <HiHome className="mr-2 text-2xl" />
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center text-lg hover:text-teal-600"
                            onClick={() => {
                                router.push('/about');
                                handleClose();
                            }}
                        >
                            <HiInformationCircle className="mr-2 text-2xl" />
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center text-lg hover:text-teal-600"
                            onClick={() => {
                                router.push('/contact');
                                handleClose();
                            }}
                        >
                            <HiMail className="mr-2 text-2xl" />
                            Contact
                        </Link>
                    </VStack>
                    <Flex justifyContent="center" alignItems="center" className="absolute bottom-4 w-full"> 
                        <Text className="text-sm text-center ">© 2024 Bridge</Text> 
                    </Flex>
                </Box>
            )}
        </>
    );
};

export default Sidebar;
