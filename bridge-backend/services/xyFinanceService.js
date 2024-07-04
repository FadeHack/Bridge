const axios = require("axios");
const { XY_FINANCE_BASE_URL } = require("../constants/apiEndpoints");

// src/services/xyFinanceService.js

const fetchQuote = async ({
    srcChainId,
    fromTokenAddress,
    amount,
    destChainId,
    toTokenAddress,
  }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/quote`, {
        params: {
          srcChainId,
          fromTokenAddress,
          amount,
          destChainId,
          toTokenAddress,
        },
      });
  
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching quote: ${error.message}`);
    }
  };

const fetchTokens = async () => {
  try {
    const response = await axios.get(
      `${XY_FINANCE_BASE_URL}/recommendedTokens`,
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching tokens");
  }
};

const fetchTransactionParams = async (data) => {
  try {
    const response = await axios.post(
      `${XY_FINANCE_BASE_URL}/buildTx`,
      data,
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching transaction parameters");
  }
};

module.exports = {
  fetchQuote,
  fetchTokens,
  fetchTransactionParams,
};
