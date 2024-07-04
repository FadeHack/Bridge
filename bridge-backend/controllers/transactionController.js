const xyFinanceService = require('../services/xyFinanceService');

const getTransactionParams = async (req, res) => {
    try {
        // Extract query parameters from req.query
        const { srcChainId, fromTokenAddress, amount, destChainId, toTokenAddress, receiveAddress } = req.query;

        // Construct the params object for the service method
        const params = {
            srcChainId,
            fromTokenAddress,
            amount,
            destChainId,
            toTokenAddress,
            receiveAddress,
        };

        // Fetch transaction parameters
        const transactionParams = await xyFinanceService.fetchTransactionParams(params);
        res.json(transactionParams);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch transaction parameters', error: error.message });
    }
};

module.exports = {
    getTransactionParams,
};
