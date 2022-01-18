FROM golang:1.17.0-alpine
# Add a work directory
WORKDIR /app
# Cache and install dependencies
COPY go.mod go.sum ./
RUN go mod download
# Copy app files
COPY . ./
# Build app
RUN go build -o app cmd/webserver/main.go

EXPOSE 5000
CMD ["./app"]
