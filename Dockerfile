FROM golang:1.22.2 as build

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main .

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=build /app/main .

COPY --from=build /app/static ./static

EXPOSE 8080

CMD ["./main"]
