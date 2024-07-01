import { Box, Text, VStack, Divider } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const TransactionParams = ({ transactionParams }) => {
    if (!transactionParams) return <Text className="text-center text-white">No transaction parameters available</Text>;

    return (
        <Box className="p-6 bg-zinc-800 border border-zinc-500 rounded-lg shadow-lg w-10/12 mx-auto">
            <Text fontSize="2xl" mb={4} fontWeight="semibold" className='text-white' textAlign="center">
                Transaction Parameters
            </Text>
            <VStack spacing={4} align="stretch">
                <TransactionParam label="Transaction ID" value={transactionParams.transactionId} />
                <TransactionParam label="Gas Price" value={transactionParams.gasPrice} />
                <TransactionParam label="Gas Limit" value={transactionParams.gasLimit} />
            </VStack>
        </Box>
    );
};

const TransactionParam = ({ label, value }) => (
    <Box className="p-4 bg-zinc-600 border border-gray-200 rounded-md shadow-sm">
        <Text className="font-semibold text-white">{label}:</Text>
        <Text className="text-white">{value || 'N/A'}</Text>
    </Box>
);

TransactionParams.propTypes = {
    transactionParams: PropTypes.shape({
        transactionId: PropTypes.string,
        gasPrice: PropTypes.string,
        gasLimit: PropTypes.string,
    }),
};

TransactionParam.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
};

export default TransactionParams;
