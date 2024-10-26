# Rule Engine with Abstract Syntax Tree (AST)

This project implements a Rule Engine using Abstract Syntax Tree (AST) concepts, allowing users to create, manage, and evaluate rules with flexible logical operators. Users can combine multiple rules using AND/OR operators and evaluate conditions to get true/false results.

## 🚀 Features

- **Rule Management**: Create, read, update, and delete rules
- **Rule Combination**: Combine multiple rules using AND/OR operators
- **Rule Evaluation**: Evaluate rules with provided input to get true/false results
- **Description-Based Rules**: Create rules in string format with descriptions for easy reference
- **Interactive UI**: User-friendly interface for managing and evaluating rules

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React, Vite, Tailwind CSS
- **Database**: PostgreSQL
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- Docker and Docker Compose (if using containerized setup)
  - Docker Engine (version 20.10.0 or higher)
  - Docker Compose (version 2.0.0 or higher)

## 🔧 Installation & Setup

### Option 1: Using Docker (Recommended)

#### Prerequisites for Docker Setup
1. Ensure Docker is installed and running:
```bash
docker --version
docker-compose --version
```

2. If Docker is not installed:
   - For Ubuntu/Debian: `sudo apt-get install docker.io docker-compose`
   - For MacOS: Install Docker Desktop from the official website
   - For Windows: Install Docker Desktop with WSL 2 backend

#### Running with Docker
```bash
# Clone the repository
git clone https://github.com/yourusername/rule-engine.git
cd rule-engine

# Build and start containers
docker-compose build
docker-compose up
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

#### Docker Troubleshooting
If you encounter any issues with Docker:
- Ensure Docker daemon is running: `sudo systemctl start docker`
- Check Docker logs: `docker-compose logs`
- Verify port availability: Ensure ports 5173 and 5000 are not in use
- Check Docker permissions: Add your user to the docker group or use sudo

### Option 2: Manual Setup (Without Docker)

If Docker setup is not working or if you prefer a traditional setup:

1. **Backend Setup:**
```bash
cd backend
npm install

# Replace .env file with following variables
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=rule_engine
DB_HOST=localhost
DB_PORT=5432
```

2. **Database Setup:**
- Install PostgreSQL if not already installed:
  ```bash
  # For Ubuntu/Debian
  sudo apt-get install postgresql postgresql-contrib
  
  # For MacOS using Homebrew
  brew install postgresql
  ```
- Start PostgreSQL service:
  ```bash
  # For Ubuntu/Debian
  sudo service postgresql start
  
  # For MacOS
  brew services start postgresql
  ```
- Create database:
  ```bash
  createdb rule_engine
  ```

3. **Frontend Setup:**
```bash
cd frontend
npm install
```

4. **Running the Application:**
```bash
# Terminal 1 - Start Backend
cd backend
npm start

# Terminal 2 - Start Frontend
cd frontend
npm run dev
```

## 🎯 Usage Examples

### Creating a Rule
```json
{
  "rule": "amount > 1000",
  "description": "Check if amount exceeds 1000"
}
```

### Combining Rules
```json
{
  "rules": ["rule1", "rule2"],
  "operator": "AND",
  "description": "Check both conditions"
}
```

### Evaluating Rules
```json
{
  "ruleId": "rule1",
  "input": {
    "amount": 1500
  }
}
```

## 📸 Screenshots

### 1. Rule Management Dashboard
![Viewing Rules](https://github.com/user-attachments/assets/6d7b836f-5ba0-48b8-9e39-d913b603cb3e)
- Main dashboard showing all existing rules
- Each rule displays its description and evaluation status
- Quick access to edit and delete functions

### 2. Create New Rule
![Creating Rule](https://github.com/user-attachments/assets/cc55e5de-da4d-4a3d-b917-7397a2c15e7d)
- Interface for creating new rules
- Input fields for rule condition and description
- Validation feedback for rule syntax

### 3. Rule Creation Error Handling
![Creation Error](https://github.com/user-attachments/assets/d69846a2-71c7-420f-a029-b0843c8073e1)
- Clear error messages for invalid rule syntax
- Real-time validation feedback
- Helpful suggestions for correction

### 4. Rule Update Interface
![Update Rule](https://github.com/user-attachments/assets/13e74015-1722-47a5-83b6-764da1ef957e)
- Edit existing rules
- Pre-populated fields with current values
- Save or cancel options

### 5. Rule Deletion
![Delete Confirmation](https://github.com/user-attachments/assets/0c95396b-4a6d-4df2-a6e9-7c7b19f58d76)
- Confirmation dialog before deletion
- Clear warning about permanent action
- Option to cancel deletion

### 6. Delete Success Feedback
![Delete Message](https://github.com/user-attachments/assets/b63d72bb-9383-4469-8634-a1d9e9c00a8a)
- Success confirmation after deletion
- Clear feedback for user actions
- Temporary notification system

### 7. Rule Combination Interface
![Combine Rule](https://github.com/user-attachments/assets/fde75f1c-0b7a-48ba-834a-40eec694f80d)
- Select multiple rules to combine
- Choose AND/OR operators
- Preview combined rule logic

### 8. Rule Evaluation
![Evaluate Rule](https://github.com/user-attachments/assets/90c322b9-413c-45de-a403-0bc02bbcf874)
- Interface for testing rules
- Input JSON data for evaluation
- Clear true/false result display along with node

## 🏗️ Design Choices

1. **Abstract Syntax Tree (AST)**
   - Uses AST for structured representation of rules
   - Enables efficient rule evaluation and manipulation
   - Supports complex nested conditions

2. **Backend Architecture (Node.js)**
   - **Express Framework**
     - Lightweight and flexible Node.js web application framework
     - Excellent middleware support for request processing
     - Strong ecosystem with extensive libraries
     - Easy integration with PostgreSQL and other services
   - **RESTful API Design**
     - Clear endpoint structure for rule operations
     - Stateless architecture for better scalability
     - JSON-based request/response format
   - **Modular Code Structure**
     - Separate modules for rules, evaluation, and database operations
     - Clean separation of concerns for better maintainability
     - Reusable utility functions for common operations

3. **Frontend Technology Stack**
   - **React**
     - Component-based architecture for reusable UI elements
     - Virtual DOM for efficient rendering
     - Hook-based state management for rule operations
     - Easy integration with backend APIs
   - **Vite**
     - Lightning-fast development server with hot module replacement
     - Optimized build process for production
     - Modern ESM-based development experience
     - Better development experience compared to traditional bundlers
   - **Tailwind CSS**
     - Utility-first CSS framework for rapid UI development
     - Highly customizable design system
     - Responsive design out of the box
     - Reduced bundle size through PurgeCSS integration
   - **Component Architecture**
     - Reusable components for rule creation and evaluation
     - Shared style system using Tailwind's utility classes
     - Centralized state management for rule operations

4. **Database Design (PostgreSQL)**
   - **Schema Design**
     - Efficient table structure for storing rules and their relationships
     - Proper indexing for quick rule lookup and evaluation
     - JSONB columns for flexible rule storage
   - **Data Integrity**
     - ACID compliance for reliable transactions
     - Foreign key constraints for rule relationships
     - Consistent data validation at the database level
   - **Performance Considerations**
     - Optimized queries for rule retrieval and combination
     - Proper indexing strategy for frequent operations
     - Connection pooling for efficient resource utilization

## 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/rules` | Create new rule |
| GET | `/api/rules` | Get all rules |
| PUT | `/api/rules/:id` | Update rule |
| DELETE | `/api/rules/:id` | Delete rule |
| POST | `/api/rules/combine` | Combine rules |
| POST | `/api/rules/evaluate` | Evaluate rule |

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.17.1",
  "pg": "^8.7.1",
  "body-parser": "^1.19.0",
  "dotenv": "^10.0.0",
  "cors": "^2.8.5"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "vite": "^4.0.0",
  "tailwindcss": "^3.0.0",
  "axios": "^0.24.0"
}
```

## 🐳 Docker Configuration

The project includes Docker configuration for both frontend and backend services:

```yaml
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"

  db:
    image: postgres:12
    environment:
      POSTGRES_DB: rule_engine
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details