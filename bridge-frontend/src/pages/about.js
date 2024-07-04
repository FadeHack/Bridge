// src/pages/about.js
import { Box, Heading, Text, VStack, Container, Flex,  useColorModeValue } from '@chakra-ui/react';

const About = () => {
    return (
        <Container centerContent className="my-14">
            <Box
                className="p-6 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg shadow-md w-full"
                boxShadow="lg" // Add a subtle box shadow
                borderWidth="1px"
                borderColor={useColorModeValue("zinc.200", "zinc.700")}
            >
                <Heading mb={4} className="text-2xl text-white font-semibold">About Bridge</Heading>
                <VStack spacing={4} align="start">
                    <Text className="text-white">
                        Bridge is your trusted partner for effortless cross-chain transactions. We're dedicated to simplifying and enhancing your cryptocurrency experience by providing reliable, fast, and secure transfers across multiple blockchains.
                    </Text>
                    <Text className="text-white">
                        Our team of experts is driven by innovation and excellence. We continuously strive to bring you the best in cross-chain technology, empowering you to manage your digital assets with confidence and ease. 
                    </Text>
                </VStack>
                <Flex justifyContent="center" mt={4}>
                    <Text className="text-sm text-gray-400">© 2024 Bridge</Text>
                </Flex>
            </Box>
        </Container>
    );
};

export default About;