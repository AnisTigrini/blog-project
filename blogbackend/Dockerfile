FROM golang

WORKDIR /blogbackend

COPY go.mod ./

COPY go.sum ./

RUN go mod download

COPY . ./

RUN go build -o blogbackend .

CMD ["./blogbackend"]