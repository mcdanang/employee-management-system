# Employee Management System

A Node.js and PostgreSQL-based Employee Management System with Docker containerization and Kubernetes deployment capabilities.

## Table of Contents
- [Employee Management System](#employee-management-system)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [API Documentation](#api-documentation)
  - [Docker Setup](#docker-setup)
  - [Kubernetes Deployment](#kubernetes-deployment)
    - [Minikube Deployment](#minikube-deployment)
    - [Google Cloud Deployment](#google-cloud-deployment)
  - [Author](#author)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Docker
- Kubernetes (kubectl)
- Minikube (for local Kubernetes testing)
- Google Cloud SDK (for GCP deployment)

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/mcdanang/employee-management-system.git
cd employee-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=employees_db
PORT=3000
```

4. Initialize the database:
```bash
psql -U postgres
CREATE DATABASE employees_db;
\c employees_db
\i scripts/init.sql
```

5. Start the application:
```bash
npm run dev
```

The application will be available at http://localhost:3000


## API Documentation

The application exposes the following endpoints:

- `GET /api/employees` - List all employees
- `POST /api/employees` - Create a new employee
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee by ID
- `DELETE /api/employees/:id` - Delete employee by ID

API documentation is available at:

- [View Postman API Documentation](https://documenter.getpostman.com/view/17491289/2sAY4rE4t8)

## Docker Setup

1. Build the Docker image:
```bash
docker build -t employee-management-system:1.0.0 .
```

2. Run with Docker Compose:
```bash
docker-compose up --build
```

This will start both the application and PostgreSQL database.

To stop the containers:
```bash
docker-compose down
```

## Kubernetes Deployment

### Minikube Deployment

1. Start Minikube:
```bash
minikube start
```

2. Build the image in Minikube's Docker daemon:
```bash
eval $(minikube docker-env)
docker build -t employee-management-system:1.0.0 .
```

3. Create ConfigMap and Secret:
```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: "postgres-service"
  DB_PORT: "5432"
  DB_NAME: "employees_db"

# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  DB_USER: cG9zdGdyZXM=      # postgres in base64
  DB_PASSWORD: cG9zdGdyZXM=  # postgres in base64
```

4. Create database initialization ConfigMap:
```bash
kubectl create configmap init-script --from-file=init.sql=./scripts/init.sql
```

5. Apply Kubernetes manifests:
```bash
kubectl apply -f k8s/
```

6. Access the application:
```bash
minikube service employee-management-system-service
```

### Google Cloud Deployment

1. Enable required APIs:
```bash
# Enable Kubernetes Engine API
gcloud services enable container.googleapis.com

# Enable Container Registry API
gcloud services enable containerregistry.googleapis.com
```

2. Create a GKE cluster:
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

4. Build and push Docker image to Google Container Registry:
```bash
# Tag the image
docker build -t gcr.io/YOUR_PROJECT_ID/employee-management-system:1.0.0 .

# Push to GCR
docker push gcr.io/YOUR_PROJECT_ID/employee-management-system:1.0.0
```

5. Update app-deployment.yaml:
```yaml
# k8s/app-deployment.yaml
# Update the image to use GCR
image: gcr.io/YOUR_PROJECT_ID/employee-management-system:1.0.0
```

6. Apply Kubernetes manifests:
```bash
kubectl apply -f k8s/
```

7. Get the external IP:
```bash
kubectl get service employee-management-system-service
```

## Author
Muhamad Danang Priambodo
- Email: mdanangpriambodo@gmail.com
- Website: https://mcdanang.com/