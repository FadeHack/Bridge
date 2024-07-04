const app = require('./app');
const errorHandler = require('./utils/errorHandler');

const PORT = process.env.PORT || 4000;

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
