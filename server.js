import express from 'express';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 3000;

// Inline Swagger JSON (instead of reading from a file)
const swaggerDocument = {
  swagger: "2.0",
  info: {
    title: "My API",
    description: "This is an auto-generated API documentation",
    version: "1.0.0"
  },
  host: "swagger-open-api.vercel.app",
  servers: [
    {
      url: "https://swagger-open-api.vercel.app"
    }
  ],
  basePath: "/",
  schemes: ["https"],
  paths: {
    "/users": {
      get: {
        description: "",
        responses: {
          "200": { description: "OK" }
        }
      },
      post: {
        description: "",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              type: "object",
              properties: {
                name: { example: "any" }
              }
            }
          }
        ],
        responses: {
          "201": { description: "Created" }
        }
      }
    },
    "/users/{id}": {
      get: {
        description: "",
        parameters: [
          { name: "id", in: "path", required: true, type: "string" }
        ],
        responses: {
          "200": { description: "OK" },
          "404": { description: "Not Found" }
        }
      },
      put: {
        description: "",
        parameters: [
          { name: "id", in: "path", required: true, type: "string" }
        ],
        responses: {
          "200": { description: "OK" },
          "404": { description: "Not Found" }
        }
      },
      delete: {
        description: "",
        parameters: [
          { name: "id", in: "path", required: true, type: "string" }
        ],
        responses: {
          "200": { description: "OK" },
          "404": { description: "Not Found" }
        }
      }
    }
  }
};

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to parse JSON bodies
app.use(express.json());

// Sample user data (in-memory)
let users = [
  { id: 1, name: 'Mohammad' },
  { id: 2, name: 'Haniyeh' },
];

app.get('/users', (req, res) => {
  res.json(users);
});
app.get('/',(req,res)=>{
  res.send('use /api-docs')
})
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = { id: userId, ...req.body };
  users[userIndex] = updatedUser;
  res.json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users = users.filter((u) => u.id !== userId);
  res.json({ message: 'User deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on Vercel at: https://swagger-open-api.vercel.app/`);
});

export default app;
