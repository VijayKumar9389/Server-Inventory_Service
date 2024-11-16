"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./api/routes/user.routes"));
const item_routes_1 = __importDefault(require("./api/routes/item.routes"));
const location_routes_1 = __importDefault(require("./api/routes/location.routes"));
const category_routes_1 = __importDefault(require("./api/routes/category.routes"));
// Create the express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Enable CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));
// Middleware
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
app.get('/images/:name', (req, res) => {
    const name = req.params.name;
    res.sendFile(__dirname + `/uploads/${name}`);
});
// Routes
app.use('/api/users', user_routes_1.default);
app.use('/api/tools', item_routes_1.default);
app.use('/api/locations', location_routes_1.default);
// app.use('/api/materials', materialRoutes);
app.use('/api/categories', category_routes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
