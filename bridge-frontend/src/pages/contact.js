import {
  Box,
  Heading,
  Text,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

const Contact = () => {
  return (
    <Container centerContent className="my-14">
      <Box
        className="p-6 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg shadow-md w-full"
        boxShadow="lg"
        borderWidth="1px"
        borderColor={useColorModeValue("zinc.200", "zinc.700")}
      >
        <Heading mb={4} className="text-2xl text-white font-semibold">
          Contact Us
        </Heading>
        <Flex direction="column" spacing={10} gap={10}>
          <Text className="text-white">
            Have a question, need assistance, or want to share your thoughts?
            We're here to help! Get in touch with us, and we'll be happy to
            connect.
          </Text>
          <FormControl id="name" isRequired>
            <FormLabel className="text-white">Name</FormLabel>
            <Input
              placeholder="Your Name"
              className="bg-transparent w-11/12 text-zinc-200 rounded-md ring-1 ring-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              isFullWidth // Use isFullWidth prop
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel className="text-white">Email</FormLabel>
            <Input
              type="email"
              placeholder="Your Email"
              className="bg-transparent w-11/12 text-zinc-200 rounded-md ring-1 ring-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              isFullWidth // Use isFullWidth prop
            />
          </FormControl>
          <FormControl id="message" isRequired>
            <FormLabel className="text-white">Message</FormLabel>
            <Textarea
              placeholder="Your Message"
              className="bg-transparent w-11/12 text-zinc-200 rounded-md ring-1 ring-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              isFullWidth // Use isFullWidth prop
            />
          </FormControl>
          <Button
            colorScheme="teal"
            type="submit"
            className="bg-teal-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            w={{ base: "full", md: "3/12" }} // Use responsive props
          >
            Send Message
          </Button>
        </Flex>
        <Flex justifyContent="center" mt={4}>
          <Text className="text-sm text-gray-400">© 2024 Bridge</Text>
        </Flex>
      </Box>
    </Container>
  );
};

export default Contact;
