import '../app/globals.css';  // Import the global stylesheet
import { Box} from '@chakra-ui/react';
import { Sidebar } from '../components';

export default function App({ Component, pageProps }) {
  return <Box className="min-h-dvh bg-zinc-900 grid grid-cols-12" >

    <Box className="col-span-2 bg-gray-800 text-white">
        <Sidebar />
    </Box>
    <Box className="col-span-10 p-6">
    <Component {...pageProps} />;
    </Box>
  </Box>
}
