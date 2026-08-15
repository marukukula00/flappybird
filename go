services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: jobservice
      POSTGRES_PASSWORD: dev_password
      POSTGRES_DB: jobservice
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U jobservice"]
      interval: 5s
      timeout: 3s
      retries: 5

  rabbitmq:
    image: rabbitmq:3.13-management
    environment:
      RABBITMQ_DEFAULT_USER: jobservice
      RABBITMQ_DEFAULT_PASS: dev_password
    ports:
      - "5672:5672"    # AMQP (your app connects here)
      - "15672:15672"  # management web UI
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
