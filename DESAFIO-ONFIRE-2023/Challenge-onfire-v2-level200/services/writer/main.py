import http.server
import socketserver
import json
import redis

class RequestHandler(http.server.SimpleHTTPRequestHandler):

    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', '*')
        self.send_header('Access-Control-Allow-Headers', '*')

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self._send_cors_headers()
        self.end_headers()

        if self.path == '/health':
            self.wfile.write(bytes(f"up", "utf8"))

        return
    def do_POST(self):
        self.send_response(201)
        self.send_header("Content-type", "application/json")
        self._send_cors_headers()
        self.end_headers()
        if self.path == '/write':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            redishost = "redis"
            redisclient = redis.Redis(host=redishost)
            redisclient.set("295devops",post_data.decode('utf-8'))



handler_object = RequestHandler
server = socketserver.TCPServer(("", 8081), handler_object)
server.serve_forever()