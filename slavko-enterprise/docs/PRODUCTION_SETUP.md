# SlavkoKernel Production Setup

This repository contains the production setup for SlavkoKernel, a translation suggestion system.

## Project Structure

```
/ (root)
├─ .github/workflows/      # CI/CD pipelines
├─ api/                    # FastAPI backend
├─ functions/              # Firebase functions
├─ k8s/                    # Kubernetes manifests
├─ monitoring/             # Prometheus & Grafana configs
├─ tests/                  # Unit, integration, and E2E tests
├─ docs/                   # Documentation
├─ scripts/                # Utility scripts
├─ firebase.json           # Firebase configuration
├─ firestore.rules         # Firestore security rules
├─ firestore.indexes.json  # Firestore indexes
└─ docker-compose.yml      # Local development setup
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker and Docker Compose
- Firebase CLI
- Google Cloud SDK
- Kubernetes CLI (kubectl)

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/slavkokernel.git
   cd slavkokernel
   ```

2. Install dependencies:

   ```bash
   # Install API dependencies
   cd api
   pip install -r requirements.txt
   cd ..

   # Install Firebase Functions dependencies
   cd functions
   npm install
   cd ..

   # Install frontend dependencies
   cd web
   npm install
   cd ..
   ```

3. Start the local development environment:

   ```bash
   docker-compose up
   ```

4. Access the services:
   - API: <http://localhost:8000>
   - Frontend: <http://localhost:3000>
   - Prometheus: <http://localhost:9090>
   - Grafana: <http://localhost:3000> (admin/admin)
   - Firebase Emulators: <http://localhost:4000>

### Running Tests

#### API Tests

```bash
cd api
pytest
```

#### E2E Tests

```bash
cd tests/e2e
npm install
npm test
```

#### Load Tests

```bash
cd tests/load
k6 run load-test.js
```

## Deployment

### Production Deployment

The application is deployed using GitHub Actions CI/CD pipelines:

1. Frontend is deployed to Firebase Hosting
2. Backend is deployed to Kubernetes (GKE)
3. Firebase Functions are deployed to Firebase

### Manual Deployment

#### Frontend

```bash
cd web
npm run build && npm run export
firebase deploy --only hosting
```

#### Backend

```bash
cd api
docker build -t gcr.io/your-project-id/slavkokernel-api:latest .
docker push gcr.io/your-project-id/slavkokernel-api:latest
kubectl apply -f ../k8s/deployment.yml
```

#### Firebase Functions

```bash
cd functions
npm run build
firebase deploy --only functions
```

## Monitoring & Observability

- **Prometheus**: Collects metrics from the API and infrastructure
- **Grafana**: Visualizes metrics and provides dashboards
- **Sentry**: Tracks errors and exceptions
- **Loki**: Collects and indexes logs

## Documentation

- [Runbook](docs/RUNBOOK.md): Operational procedures and troubleshooting
- [Incident Response](docs/INCIDENT_RESPONSE.md): Procedures for handling incidents

## Security

- Firestore security rules control access to data
- API authentication using JWT tokens
- HTTPS enforced for all traffic
- Secrets managed using Secret Manager

## Backup & Recovery

- Daily Firestore backups
- Backup retention policy: 30 days
- Recovery procedures documented in the Runbook

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests to ensure everything works
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
