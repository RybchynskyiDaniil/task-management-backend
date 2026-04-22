import express from "express";
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
console.log(`Time: ${new Date().toLocaleString()}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'hello worlddd!' });
});

app.get('/test-error', (req, res) => { 
throw new Error('Something went wrong');    
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,   
    });
 });

app.get('/users', (req, res) => {
    res.status(200).json([{id: 1, name: 'Alice' }, {id: 2, name: 'Bob' }]);
});

app.get('/users/userId',(req, res) => {
    const { userId } = req.params;
    res.status(200).json({ id: userId, name: 'Jacob' });
    
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});