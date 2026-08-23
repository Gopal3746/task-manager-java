.PHONY: db-up db-down backend frontend

db-up:
	docker compose up -d

db-down:
	docker compose down

backend:
	cd backend && mvn spring-boot:run

frontend:
	cd frontend && npm start
