const xyFinanceService = require('../services/xyFinanceService');

const getQuote = async (req, res) => {
  try {
    const {
      srcChainId,
      fromTokenAddress,
      amount,
      destChainId,
      toTokenAddress,
    } = req.query;  // Changed from `req.body` to `req.query` for GET requests
    // Validate required parameters
    if (!srcChainId || !fromTokenAddress || !amount || !destChainId || !toTokenAddress) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const quoteData = await xyFinanceService.fetchQuote({
      srcChainId,
      fromTokenAddress,
      amount,
      destChainId,
      toTokenAddress,
    });

    return res.status(200).json(quoteData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getQuote,
};