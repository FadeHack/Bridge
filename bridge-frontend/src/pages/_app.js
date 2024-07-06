import '../app/globals.css';  // Import the global stylesheet
import { Box } from '@chakra-ui/react';
import { Sidebar } from '../components';

export default function App({ Component, pageProps }) {
  return (
    <Box className="md:min-h-dvh bg-zinc-900 md:grid md:grid-cols-12">
      <Box className="md:col-span-2 bg-gray-800 text-white fixed h-full z-10">
        <Sidebar />
      </Box>
      <Box className="md:col-span-10 md:col-start-3 p-6 justify-center w-full">
        <Component {...pageProps} />
      </Box>
    </Box>
  );
}
