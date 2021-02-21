import os
# import pymongo
import json
import random
import psycopg2
import hashlib



def connector():
    # cockroachstring = "dbname='wet-dingo-838.defaultdb' user='muntaser' password='nopasswordhere' host='free-tier.gcp-us-central1.cockroachlabs.cloud' port='26257'"
    cockroachstring = os.environ.get('COCKROACHSTR')
    conn=psycopg2.connect(cockroachstring)
    return conn



def initialize(conn):
    with conn.cursor() as cur:
        cur.execute(
            "CREATE TABLE IF NOT EXISTS brickusers (id INT PRIMARY KEY, userid STRING, userface1 STRING, userface2 STRING)"
        )
        # cur.execute("UPSERT INTO users (id, email, userpassword, usertype, name) VALUES (1, 'jon@fisherman.com', 'password1', 'fisherman', 'jon stewart'), (2, 'joe@gmail.com', 'password1', 'customer', 'joe someone')")
        # logging.debug("create_accounts(): status message: %s", cur.statusmessage)
    conn.commit()



def updateface(conn, fid, userface2):
    with conn.cursor() as cur:
        cur.execute( "UPDATE brickusers SET userface2 = %s WHERE userid = %s", (userface2, fid));
        #  "UPDATE accounts SET balance = balance - %s WHERE id = %s", (amount, frm)
        conn.commit()
        
    return 0



def add_users(conn, uid, uface1, uface2):
    with conn.cursor() as cur:
        cur.execute("SELECT id FROM brickusers")
        # logging.debug("print_balances(): status message: %s", cur.statusmessage)
        rows = cur.fetchall()
        conn.commit()
        # print(f"Balances at {time.asctime()}:")
        i = 1
        for row in rows:
            i = i + 1
        i = str(i)
        
        cur.execute("UPSERT INTO brickusers (id, userid, userface1, userface2) VALUES (" + i +", '" + uid + "', '" + uface1 + "', '" + uface2 +"')")
        # logging.debug("create_accounts(): status message: %s", cur.statusmessage)
    conn.commit()
    return i
    # print ("user added")

def getuserface(conn, userid):
    with conn.cursor() as cur:
        cur.execute("SELECT id, userid, userface1, userface2 FROM brickusers")
        # logging.debug("print_balances(): status message: %s", cur.statusmessage)
        rows = cur.fetchall()
        conn.commit()
        # print(f"Balances at {time.asctime()}:")
        for row in rows:
            # print(row)
            # print (type(row))
            if row[1] == userid:
                # print ("found")
                return True, row[0], row[2], row[3]
        return False, 'none', 'none', '-1'


def login(conn, uemail, pw):
    with conn.cursor() as cur:
        cur.execute("SELECT id, email, userpassword, usertype, username FROM users")
        # logging.debug("print_balances(): status message: %s", cur.statusmessage)
        rows = cur.fetchall()
        conn.commit()
        # print(f"Balances at {time.asctime()}:")
        for row in rows:
            # print(row)
            # print (type(row))
            if row[1] == uemail and row[2] == pw:
                # print ("found")
                return True, row[0], row[3], row[4]
        return False, 'none', 'none', '-1'

def delete_users(conn):
    with conn.cursor() as cur:
        cur.execute("DELETE FROM defaultdb.brickusers")
        # logging.debug("delete_accounts(): status message: %s", cur.statusmessage)
    conn.commit()
    with conn.cursor() as cur:
        cur.execute("DROP TABLE brickusers")
        # logging.debug("delete_accounts(): status message: %s", cur.statusmessage)
    conn.commit()

    print ("users table deleted")


def purgedb(conn):
    with conn.cursor() as cur:
        cur.execute("DELETE FROM defaultdb.brickusers")
        # logging.debug("delete_accounts(): status message: %s", cur.statusmessage)
    conn.commit()
    with conn.cursor() as cur:
        cur.execute("DROP TABLE brickusers")
        # logging.debug("delete_accounts(): status message: %s", cur.statusmessage)
    conn.commit()

    print ("users table deleted")



def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()
    conn = connector()
    initialize(conn)

    retjson = {}

    action = request_json['action']
    if action == "createuser" :
        userid = request_json['userid']
        userface1 = request_json['userface1']
        userface2 = request_json['userface2']


        uid = add_users(conn, userid, userface1, userface2)

        retjson['status'] = "successfully added"
        retjson['id'] = uid

        return json.dumps(retjson)

    if action == 'getuserface':
        uid = request_json['userid']
        res = getuserface(conn, uid)

        # res = login(conn, uemail, pw)

        retjson['status'] = str(res[0])
        retjson['userface1'] = str(res[2])
        retjson['userface2'] = str(res[3])
        

        return json.dumps(retjson)

    if action == 'setuserface':
        uid = request_json['userid']
        userface = request_json['userface']

        res = updateface(conn, uid, userface)


        # res = login(conn, uemail, pw)

        retjson['status'] = "completed"
        

        return json.dumps(retjson)


    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
