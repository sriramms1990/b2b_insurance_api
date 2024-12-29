# B2B Insurance API

REST API for managing business insurance quotes, policies, and claims.

## Features

- 🚀 Automated quote generation with dynamic pricing
- 📋 Policy management
- ✅ Claims processing
- 📚 OpenAPI/Swagger documentation

## Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will start on port 3000 (default) or the port specified in the `PORT` environment variable.

## API Documentation

The API documentation is available via Swagger UI when the server is running:

```
http://localhost:3000/api-docs
```

### Available Endpoints

#### Quotes
- `POST /api/quotes` - Generate a new quote

#### Policies
- `GET /api/policies` - Get all policies
- `POST /api/policies` - Create a new policy
- `GET /api/policies/:id` - Get policy by ID
- `PUT /api/policies/:id` - Update policy

#### Claims
- `GET /api/claims` - Get all claims
- `POST /api/claims` - Submit a new claim
- `PATCH /api/claims/:id/status` - Update claim status

## Premium Calculation

Quotes are automatically calculated based on:
- Coverage type base rates
- Company size (number of employees)
- Industry risk factors
- Coverage amount

## Development

Run the development server with hot reload:
```bash
npm run dev
```

## Health Check

The API includes a health check endpoint:
```
GET /health
```

## License

MIT