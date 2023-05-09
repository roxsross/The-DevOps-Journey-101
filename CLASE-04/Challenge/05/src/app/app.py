from socket import gethostname, gethostbyname

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    hostname = gethostname()
    context = {"hostname": hostname, "ip": gethostbyname(hostname)}
    return render_template("index.html", context=context)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
