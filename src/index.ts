import express from 'express';
import cors from 'cors';
import userRoutes from "./api/routes/user.routes";
import itemRoutes from "./api/routes/item.routes";
import locationRoutes from "./api/routes/location.routes";
import materialRoutes from "./api/routes/material.routes";
import categoryRoutes from "./api/routes/category.routes";

// Create the express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    })
);

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});

app.get('/images/:name', (req, res) => {
    const name = req.params.name
    res.sendFile(__dirname + `/uploads/${name}`);
});


// Routes
app.use('/api/users', userRoutes);
app.use('/api/tools', itemRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/categories', categoryRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
