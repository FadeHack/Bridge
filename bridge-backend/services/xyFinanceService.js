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
      const response = await axios.get(`${XY_FINANCE_BASE_URL}/quote`, {
        params: {
          srcChainId,
          fromTokenAddress,
          amount,
          destChainId,
          toTokenAddress,
        },
      });
      console.log(response)
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

const fetchTransactionParams = async (params) => {
    try {

      const response = await axios.get(
        `${XY_FINANCE_BASE_URL}/swap`, {
          params, // Pass query parameters as an object
          headers: {},
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error fetching transaction parameters: " + error.message);
    }
  };

module.exports = {
  fetchQuote,
  fetchTokens,
  fetchTransactionParams,
};
