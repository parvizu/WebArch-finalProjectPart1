#!/usr/bin/env python

import string
import random
import shelve
from subprocess import check_output
import flask
from flask import request, abort
from os import environ

app = flask.Flask(__name__)
app.debug = True

db = shelve.open("shorten.db")
shortUrlDict={}

###
# Home Resource:
# Only supports the GET method, returns a homepage represented as HTML
###
@app.route('/home', methods=['GET'])
def home():
    """Builds a template based on a GET request"""
    return flask.render_template(
            'index.html')

###
# Home Resource:
# Only supports the GET method, returns a homepage represented as HTML
###
@app.route('/about', methods=['GET'])
def about():
    """Builds a template based on a GET request"""
    return flask.render_template(
            'about.html')
    
###
# Shorts Resource:
# Only supports the POST method, returns the shortened URL for the entered long url
###
@app.route('/shorts', methods=['POST'])
def shorts():
    """Shortens the given url, and returns the association between the original and the shortened url"""
    #short_url= request.form["shortUrl"]
    """Number of clicks and the time stamp
    date, number of clicks. returned as json object"""
    long_url = request.form["longUrl"]
    short_url = request.form.get("shortUrl","empty!")
    urlDict = {v:k for k, v in db.items()}
    if(long_url in urlDict and short_url=="empty!"):
        short_url=urlDict[long_url]
        return short_url+"-old"
    elif(short_url != "empty!"):
        if isinstance(short_url, unicode):
            short_url = short_url.encode('utf-8')
        if(short_url in db):
            del db[short_url]
        db[short_url]=long_url
        return short_url+"-stored"
    elif(short_url == "empty!"):
        short_url="r.pj/"+ id_generator()
        db[short_url]=long_url
        return short_url+"-new"

###
# Random character generator:
# Helper function to automatically spit out a short URL path"
def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))
###
# Short Resource:
# Only supports the GET method, returns the shortened URL for the entered long url
###
@app.route('/short/<path:url>', methods=['GET'])
def short(url):
    """Redirects to the original url after looking up the association if it exists. Otherwise throws error"""
    if isinstance(url, unicode):
            url = url.encode('utf-8')
    try:
        longUrl=db[url]
    except KeyError:
        longUrl="error"
        
    if(longUrl=="error"):
        return flask.render_template('error.html')        
    else:
        return flask.redirect(longUrl)


###
# Wiki Resource:
# GET method will redirect to the resource stored by PUT, by default: Wikipedia.org
# POST/PUT method will update the redirect destination
###
@app.route('/wiki', methods=['GET'])
def wiki_get():
    """Redirects to wikipedia."""
    destination = db.get('wiki', 'http://en.wikipedia.org')
    app.logger.debug("Redirecting to " + destination)
    return flask.redirect(destination)

@app.route("/wiki", methods=['PUT', 'POST'])
def wiki_put():
    """Set or update the URL to which this resource redirects to. Uses the
    `url` key to set the redirect destination."""
    wikipedia = request.form.get('url', 'http://en.wikipedia.org')
    db['wiki'] = wikipedia
    return "Stored wiki => " + wikipedia

###
# i253 Resource:
# Information on the i253 class. Can be parameterized with `relationship`,
# `name`, and `adjective` information
#
# TODO: The representation for this resource is broken. Fix it!
# Set the correct MIME type to be able to view the image in your browser
##/
@app.route('/i253')
def i253():
    """Returns a PNG image of madlibs text"""
    relationship = request.args.get("relationship", "friend")
    name = request.args.get("name", "Jim")
    adjective = request.args.get("adjective", "fun")

    resp = flask.make_response(
            check_output(['convert', '-size', '600x400', 'xc:transparent',
                '-frame', '10x30',
                '-font', '/usr/share/fonts/liberation/LiberationSerif-BoldItalic.ttf',
                '-fill', 'black',
                '-pointsize', '32',
                '-draw',
                  "text 30,60 'My %s %s said i253 was %s'" % (relationship, name, adjective),
                '-raise', '30',
                'png:-']), 200);
    # Comment in to set header below
    # resp.headers['Content-Type'] = '...'

    return resp


if __name__ == "__main__":
    app.run(port=63022)
    #app.run(port=int(environ['FLASK_PORT']))
    
