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
- **Containerization**: Docker/Podman

## 📋 Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- Docker or Podman (for containerized setup)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/rule-engine.git
cd rule-engine
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with following variables
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=rule_engine
DB_HOST=localhost
DB_PORT=5432
PORT=5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Database Setup
- Ensure PostgreSQL is running
- Create a database named 'rule_engine'
- The application will automatically create required tables on startup

## 🚀 Running the Application

### Without Docker

1. Start Backend:
```bash
cd backend
npm start
```

2. Start Frontend:
```bash
cd frontend
npm run dev
```

3. Access application at `http://localhost:5173`

### With Docker/Podman

1. Build containers:
```bash
docker-compose build
```

2. Run containers:
```bash
docker-compose up
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
# Rule Engine with Abstract Syntax Tree (AST)


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

2. **Microservices Architecture**
   - Separated frontend and backend for better scalability
   - Independent deployment capability
   - Easier maintenance and updates

3. **PostgreSQL Database**
   - Robust ACID compliance
   - Excellent for complex queries
   - Strong data integrity

4. **Docker/Podman Support**
   - Containerized deployment for consistency
   - Easy setup across different environments
   - Simplified dependency management

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
