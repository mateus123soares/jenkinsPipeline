BUILD=#4

## About The Project
Repositório dedicado para o desenvolvimento de um pipeline DevOps com deploy usando kubernets

## Environment variable

### Backend
`PORT=`,
`DB_HOST=`,
`DB_PORT=`,
`DB_DATABASE=`,
`DB_USERNAME=`,
`DB_PASSWORD=`,
`DB_PORT=`,
`NODE_ENV=production`,

### Frontend
`REACT_APP_PORTAPI=`,
`REACT_APP_HOSTAPI=`,

## Getting Started

### Prerequisites

[Documentação da instalação Minikube](https://github.com/github_username/repo_name/issues)<br>
[Documentação da instalação Docker](https://docs.docker.com/engine/install/)<br>
[Documentação da instalação Kubernetes](https://kubernetes.io/docs/tasks/tools/)


Iniciando o minikube com driver docker

```sh
minikube start --driver=docker
```

Realizando os apply nos services

```sh
kubectl apply -f svc-frontend.yml
kubectl apply -f svc-backend.yml
kubectl apply -f svc-db.yml 
```

Realizando os apply nos pods

```sh
kubectl apply -f frontend.yml
kubectl apply -f backend.yml
kubectl apply -f db.yml 
```
