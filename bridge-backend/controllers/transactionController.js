const xyFinanceService = require('../services/xyFinanceService');

const getTransactionParams = async (req, res) => {
    try {
        const params = await xyFinanceService.fetchTransactionParams(req.body);
        res.json(params);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch transaction parameters', error });
    }
};

module.exports = {
    getTransactionParams,
};
