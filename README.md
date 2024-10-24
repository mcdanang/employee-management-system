# Employee Management System

A Node.js and PostgreSQL-based Employee Management System with Docker containerization and Kubernetes deployment capabilities.

## Table of Contents

- [Employee Management System](#employee-management-system)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Database Setup](#database-setup)
  - [API Documentation](#api-documentation)
  - [Docker Setup](#docker-setup)
  - [Kubernetes Deployment](#kubernetes-deployment)
    - [Minikube Deployment](#minikube-deployment)
    - [Google Cloud Deployment](#google-cloud-deployment)
  - [Environment Variables](#environment-variables)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [Author](#author)

## Features

- Complete CRUD operations for employee management
- PostgreSQL database integration
- Docker containerization
- Kubernetes deployment support (local and cloud)
- API documentation with Postman

## Technology Stack

- Backend: Node.js (v18+)
- Database: PostgreSQL
- Containerization: Docker
- Orchestration: Kubernetes
- Cloud Platform: Google Cloud Platform (GCP)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL (latest stable version)
- Docker Desktop (for local container development)
- kubectl (Kubernetes command-line tool)
- Minikube (for local Kubernetes testing)
- Google Cloud SDK (for GCP deployment)

## Local Development

1. Clone the repository:

```bash
git clone https://github.com/mcdanang/employee-management-system.git
cd employee-management-system
```

2. Install project dependencies:

```bash
npm install
```

3. Set up environment variables:

   - Copy the example environment files:

   ```bash
   cp .env.example .env
   cp .env.example .env.prod
   ```

   - Update the variables according to your environment

4. Initialize and start the application:

```bash
npm run dev
```

The server will start on http://localhost:3000

## Database Setup

1. Create the PostgreSQL database:

```bash
psql -U postgres
```

2. In the PostgreSQL shell:

```sql
CREATE DATABASE employees_db;
\c employees_db
\i scripts/init.sql
```

3. Verify the database setup:

```sql
\dt
```

## API Documentation

### Available Endpoints

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | /api/employees     | Retrieve all employees |
| POST   | /api/employees     | Create a new employee  |
| GET    | /api/employees/:id | Get employee by ID     |
| PUT    | /api/employees/:id | Update employee by ID  |
| DELETE | /api/employees/:id | Delete employee by ID  |

Detailed API documentation is available on Postman:
[View API Documentation](https://documenter.getpostman.com/view/17491289/2sAY4rE4t8)

## Docker Setup

1. Build the Docker image:

```bash
docker build -t employee-management-system:1.0.0 .
```

2. Run the application using Docker Compose:

```bash
docker-compose up --build
```

3. Stop and remove containers:

```bash
docker-compose down
```

Docker Compose will set up both the application and PostgreSQL database containers with the correct networking and volume configurations.

## Kubernetes Deployment

### Minikube Deployment

1. Start and configure Minikube:

```bash
minikube start
eval $(minikube docker-env)
```

2. Build the image in Minikube's environment:

```bash
docker build -t employee-management-system:1.0.0 .
```

3. Deploy to Minikube:

```bash
kubectl apply -f k8s_minikube/
kubectl get pods  # Verify deployment
```

4. Access the application:

```bash
minikube service employee-management-system-service
```

### Google Cloud Deployment

1. Initial Setup:

```bash
# Enable required GCP APIs
gcloud services enable container.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

2. Create GKE cluster:

```bash
gcloud container clusters create my-cluster \
    --num-nodes=1 \
    --zone=asia-southeast1-a \
    --machine-type=e2-small
```

3. Configure kubectl:

```bash
gcloud container clusters get-credentials my-cluster --zone=asia-southeast1-a --project=YOUR_PROJECT_ID
```

Replace `YOUR_PROJECT_ID` with your actual Google Cloud project ID.

4. Build and push Docker image using Cloud Build:

Create a cloudbuild.yaml file in the root of your repository with the following content:

```yaml
steps:
  - name: "gcr.io/cloud-builders/docker"
    args: [
        "build",
        "--platform",
        "linux/amd64", # Specify x86 architecture
        "-t",
        "gcr.io/YOUR_PROJECT_ID/employee-management-system:1.0.0", # Update with your image path
        ".",
      ]
  - name: "gcr.io/cloud-builders/docker"
    args: ["push", "gcr.io/YOUR_PROJECT_ID/employee-management-system:1.0.0"] # Update with your image path
```

Replace `YOUR_PROJECT_ID` with your actual Google Cloud project ID.

5. Trigger the build:

```bash
gcloud builds submit --config cloudbuild.yaml .
```

4. Deploy and verify:

```bash
kubectl apply -f k8s_gke/
kubectl get services  # Get external IP
```
My deployment on GKE can be accessed on this URL:
[View Deployment](http://34.143.167.122/)

## Environment Variables

Required environment variables:

```env
# Application
PORT=3000               # Application port
NODE_ENV=development    # Environment (development/production)

# Database
DB_HOST=localhost       # Database host (use 'db' for Docker)
DB_PORT=5432            # Database port
DB_USER=postgres        # Database user
DB_PASSWORD=postgres    # Database password
DB_NAME=employees_db    # Database name

# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=employees_db
```

## Troubleshooting

Common issues and solutions:

1. Database Connection Issues

   - Verify PostgreSQL is running
   - Check database credentials
   - Ensure correct host configuration

2. Docker Issues

   - Run `docker-compose down -v` to clean up volumes
   - Verify Docker daemon is running
   - Check Docker logs: `docker-compose logs`

3. Kubernetes Issues
   - Verify cluster status: `kubectl cluster-info`
   - Check pod logs: `kubectl logs <pod-name>`
   - Verify service exposure: `kubectl get services`

## Author

Muhamad Danang Priambodo

- Email: mdanangpriambodo@gmail.com
- Website: https://mcdanang.com/
