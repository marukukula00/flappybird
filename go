mkdir -p jobservice/cmd/server jobservice/internal/config
cd jobservice
go mod init github.com/<you>/jobservice   # use your real GitHub path if you have one
go version                                 # paste this back — I'll pin go.mod correctly
docker compose up -d
docker compose ps                          # both services should read "healthy"
