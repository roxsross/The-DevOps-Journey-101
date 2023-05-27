from flask import Flask, render_template, abort, redirect, request
import os
import redis
app = Flask(__name__)	


@app.route('/',methods=["GET","POST"])
def inicio():
    noredis=False
    try:
        server=os.environ["REDIS_SERVER"]
        r = redis.Redis(host=server, port=6379, db=0)
        l=r.lrange("lista",0,-1)
        lista=[x.decode('utf-8') for x in l]
    except:
        noredis=True
        lista=[]
    
    return render_template("inicio.html",noredis=noredis,lista=lista)

@app.route('/add',methods=["GET","POST"])
def add():
    try:
        server=os.environ["REDIS_SERVER"]
        r = redis.Redis(host=server, port=6379, db=0)
        if request.form.get("info")!="":
            l=r.lpush("lista",request.form.get("info"))
    except:
        abort(404)
    return redirect("/")

app.run('0.0.0.0',5000,debug=True)
