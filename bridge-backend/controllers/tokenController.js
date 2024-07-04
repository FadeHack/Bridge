const xyFinanceService = require('../services/xyFinanceService');

const getTokens = async (req, res) => {

    try {
        const tokens = await xyFinanceService.fetchTokens();
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tokens', error });
    }
};

module.exports = {
    getTokens,
};
