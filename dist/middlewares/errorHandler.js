export default function errorHandler(err, _, res, __) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
}
