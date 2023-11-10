from flask import Flask, request, jsonify, make_response, json
from flask_migrate import Migrate
from datetime import datetime, timedelta, timezone
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required
from flask_cors import CORS
from models import db, User, Meal, Order, Caterer, Menu
from flask_login import current_user, LoginManager, login_required
from datetime import date
import sys
from os import path


sys.path.append(path.dirname(path.abspath(__file__)))
app = Flask(__name__)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)
login_manager.login_view = "login"
CORS(app, supports_credentials=True)


app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=5)
app.config["SECRET_KEY"] = 'OURSECRETKEYISSECRET'
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///mealy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_ECHO'] = False



app.json.compact = False
app.json_as_ascii = False
db.init_app(app)

with app.app_context():
     db.create_all()


@app.route('/')
def index():
    return "Welcome to Mealy!"

# Register
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not (username and email and password):
        return jsonify({"message": "Missing required fields"}), 400

    user_exists = User.query.filter((User.username == username) | (User.email == email)).first()
    if user_exists:
        return jsonify({"message": "Username or email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()
    
    print(f"User registered: username={username}, email={email}, role={role}")

    if role in ['caterer', 'admin']:
        caterer = Caterer(user_id=new_user.id, name=username)
        db.session.add(caterer)
        db.session.commit()
        
        print(f"Caterer created: user_id={caterer.user_id}, name={caterer.name}")
        
    return jsonify({'message': 'Signed up successfully'}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    auth = request.get_json()
    if not auth or not auth.get('username') or not auth.get('email') or not auth.get('password'):
        return make_response("Missing username and password", 401)

    user = User.query \
        .filter_by(username=auth.get('username'), email=auth.get('email')) \
        .first()
    if not user:
        return make_response("User does not exist.", 401)

    if bcrypt.check_password_hash(user.password, auth.get('password')):
        token = create_access_token({
            "id": user.id,
            "expires": datetime.utcnow() + timedelta(days=7),
            "role": user.role  # Include the user's role in the response
        }, app.config['SECRET_KEY'])
        return jsonify({
            "access-token": token,  # Change "access token" to "access_token"
            "message": "Logged in successfully",
            "role": user.role  # Include the user's role in the response
        })

    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate': 'Basic realm = "Wrong password"'}
    )


# User profile
# @app.route('/profile', methods=['GET'])
@app.route('/profile/<username>', methods=['GET'])
# @jwt_required()
def user_profile(username):
    print("Requested username:", username)

    if not username or username.strip() == "":
        print("No username found in request")
        return jsonify({'message': 'No username found!'}), 404
    
    user = User.query.filter_by(username=username).first()
    print('User found:', user)

    if not user:
        print("User not found in database")
        return jsonify({'message': 'User not found!'}), 404

    response_body = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': user.role,
        'created_at': user.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        'updated_at': user.updated_at.strftime("%Y-%m-%d %H:%M:%S") if user.updated_at else None
    }

    print("Response body:", response_body)
    return jsonify(response_body), 200

    print(username)
    if not username:
        return jsonify({'No username found!'}), 404
    
    user = User.query.filter_by(username=username).first()
    print('user found is:', user)

    if not user:
        return jsonify({'User not found!'}), 404

    response_body = {
        'username' : user.username,
        'email' : user.email,
        'role' : user.role,
        'id' : user.id
    }

    return jsonify(response_body)

# Caterer login
@app.route('/caterer', methods=['POST'])
def caterer_login():
    data = request.get_json()
    email = request.json['email']
    password = request.json['password']
    role = 'caterer'

    user = User.query.filter_by(email=email, role=role).first()

    if not user:
        return jsonify({"Message":"User does not exist!"}), 401
    
    if bcrypt.check_password_hash(user.password, password):
        token = create_access_token({'id':user.id, 'role': user.role})
        return jsonify({
            "access_token": token, 
            "message":"Logged in successfully!"
            })
    
    return jsonify({"message":"Invalid credentials!"}), 404

# Getting caterers
@app.route('/caterers', methods=['GET'])
def get_caterers():
    caterers = Caterer.query.all()
    caterer_data = [{"caterer_id": caterer.user_id, "name": caterer.name} for caterer in caterers]
    return jsonify({"caterers": caterer_data})
   

# Caterer's profile
@app.route('/caterer/info', methods=['GET'])
@jwt_required()
def get_caterer_info():
    current_user = get_jwt_identity()
    caterer = Caterer.query.filter_by(user_id=current_user['id']).first()

    if not caterer:
        return jsonify({'message': 'Caterer not found'}), 404

    response_body = {
        'name': caterer.name,
        'star_meal': caterer.star_meal,
        'created_at': caterer.created_at,
        'updated_at': caterer.updated_at
    }

    return jsonify(response_body)


# Refreshing JWT tokens
@app.after_request
def refresh_token(response):
    try:
        expiring_timestamp = get_jwt()['exp']
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > expiring_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data['access_token'] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response
    
# For protecting routes
@app.route('/protected_routes', methods=['GET'])
@jwt_required
def some_protected_route():
    print('Protected route!')
    current_user = get_jwt()
    
    if current_user["role"] != "user":
        return jsonify({"message": "Access denied"}), 403

    return jsonify({"message": "You have access as a user"})


# Password reset route
@app.route('/password', methods=['POST'])
@jwt_required()
def change_password():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    current_password = request.json['current_password']
    new_password = request.json['new_password']

    if not bcrypt.check_password_hash(user.password, current_password):
        return jsonify({"message": "Invalid password"}), 401

    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password = hashed_password
    db.session.commit()

    return jsonify({"message": "Password changed successfully"}), 200


# Meals routes
@app.route('/meals', methods=['GET'])
def get_meals():
    meal_options = Meal.query.all()
    # print("meal_options:" meal_options)
    meal_options_list = [meal_option.to_dict() for meal_option in meal_options]
    return jsonify({"meal options": meal_options_list})
    

@app.route('/meals', methods=['POST'])
def add_meal():
    data = request.json

    meal_name = data.get('name')
    caterer_id = data.get('caterer_id')
    description = data.get('description')
    price = data.get('price')
    image_url = data.get('image_url')

    if not meal_name:
        return jsonify({"message": "Name is required"}), 400

    if caterer_id is None:
        return jsonify({"message": "Caterer ID is required"}), 400

    # Create a new meal with the specified attributes
    new_meal = Meal(name=meal_name, caterer_id=caterer_id, description=description, price=price, image_url=image_url)

    try:
        db.session.add(new_meal)
        db.session.commit()
        return jsonify({"message": "Meal added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error adding meal: {str(e)}"}), 500

@app.route('/meals', methods=['PUT'])
def update_meal():
    meal_option_id = request.json.get('id')
    new_meal_option_name = request.json.get('name')
    
    meal_option = Meal.query.get(meal_option_id)
    if meal_option:
        meal_option.name = new_meal_option_name
        db.session.commit()
        return jsonify({"message": "Meal option updated successfully"})
    else:
        return jsonify({"message": "Meal option not found"})

@app.route('/meals', methods=['DELETE'])
def delete_meal():
    meal_option_id = request.json.get('id')
    
    meals = Meal.query.get(meal_option_id)
    if meals:
        db.session.delete(meals)
        db.session.commit()
        return jsonify({"message": "Meal option deleted successfully"})
    else:
        return jsonify({"message": "Meal option not found"})

@app.route('/menu', methods=['POST'])
@jwt_required()
def set_menu():
    try:
        current_user_info = get_jwt_identity()
        current_user_id = current_user_info['id']

        # Ensure that the current user is a caterer
        caterer_user = User.query.get(current_user_id)
        if not caterer_user:
            app.logger.error(f'User with ID {current_user_id} not found')
            return jsonify({"error": "User not found"}), 404
        if caterer_user.role != 'caterer':
            app.logger.error(f'User with ID {current_user_id} is not a caterer')
            return jsonify({"error": "Only caterers can set menus"}), 403

        caterer = Caterer.query.filter_by(user_id=current_user_id).first()
        if not caterer:
            return jsonify({"error": "Caterer not found"}), 404

        data = request.get_json()
        date_string = data.get('date')
        if not date_string:
            return jsonify({"error": "Date is required"}), 400

        date_object = datetime.strptime(date_string, '%Y-%m-%d').date()

        menu_items = data.get('menu_items')
        if not menu_items:
            return jsonify({"error": "Menu items are required"}), 400
       

    except Exception as e:
        app.logger.error(f'An error occurred: {str(e)}')
        return jsonify({"error": str(e)}), 500
    finally:
        return jsonify({"message": "Menu set successfully"}), 200


@app.route('/view-menu', methods=['GET'])
def view_menu():
    try:
        menu = Menu.query.order_by(Menu.date.desc()).first()
        if menu:
            return jsonify(menu.to_dict()), 200  # This now includes meal details
        else:
            return jsonify({"message": "No menu available"}), 404
    except Exception as e:
        app.logger.error(f'An error occurred: {str(e)}')
        return jsonify({"error": str(e)}), 500


@app.route('/menu', methods=['GET'])
def get_menu():
    menus = Menu.query.all()
    menus_list = [menu.to_dict() for menu in menus]
    # print(menus_list)
    return jsonify({"menus": menus_list})

@app.route('/orders', methods=['POST'])
def add_order():
    data = request.json

    user_id = data.get('user_id')
    meal_id = data.get('meal_id')
    quantity = data.get('quantity')
    total_amount = data.get('total_amount')

    
    if user_id is None:
        return jsonify({"message": "User ID is required"}), 400

    if meal_id is None:
        return jsonify({"message": "Meal ID is required"}), 400

    if quantity is None or quantity <= 0:
        return jsonify({"message": "Quantity must be a positive integer"}), 400

    if total_amount is None or total_amount <= 0:
        return jsonify({"message": "Total amount must be a positive numeric value"}), 400

    
    new_order = Order(user_id=user_id, meal_id=meal_id, quantity=quantity, total_amount=total_amount)

    try:
        db.session.add(new_order)
        db.session.commit()
        return jsonify({"message": "Order added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error adding order: {str(e)}"}), 500


# Customer's order history
@app.route('/orders/history', methods=['GET'])
@jwt_required()
def view_orders_history():
    try:
        # Get the current user (customer)
        current_user = get_jwt_identity()

        # Fetch orders for the current customer
        orders = Order.query.filter_by(user_id=current_user['id']).all()

        # Create a list of order details to be returned in the response
        orders_list = [{
            "order_id": order.id,
            "meal_id": order.meal_id,
            "created_at": order.created_at.strftime('%Y-%m-%d %H:%M:%S')
        } for order in orders]

        return jsonify({"orders": orders_list})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/orders', methods=['GET'])
@jwt_required()
def view_orders():
    # get caterer => logged in user 
    current_user = get_jwt_identity()

    # current_user = "kadi"
    mycaterer = User.query.filter_by(id=current_user['id']).first()

    
    # get caterermeals => all meals with caterer id
    caterermeals = Meal.query.filter_by(caterer_id=mycaterer.id).all()
    myIds = [chakula.id for chakula in caterermeals]

    orders = Order.query.filter(Order.meal_id.in_(myIds)).all()
    orders_list = [{"order_id":order.id, "user_id":order.user_id, "meal_id":order.meal_id, "quantity":order.quantity, "total_amount":order.total_amount} for order in orders]
    return jsonify({"orders": orders_list})

@app.route('/order/<order_id>', methods=['PUT'])
def change_order_status(order_id):
    new_status = request.json.get('new_status')
    order = Order.query.get(order_id)
    if order:
        order.status = new_status
        db.session.commit()
        return jsonify({"message": "Order status changed successfully"})
    else:
        return jsonify({"message": "Order not found"})

@login_manager.user_loader
def load_user(user_id):
    # Implement a function that retrieves a user by their ID from the database
    return User.query.get(int(user_id))

@app.route('/earnings', methods=['GET'])
@jwt_required()
def calculate_earnings():
    # get caterer => logged in user

    current_user = get_jwt_identity()
    mycaterer = User.query.filter_by(id=current_user['id']).first()

    # get caterermeals => all meals with caterer id
    caterermeals = Meal.query.filter_by(caterer_id=mycaterer.id).all()
    myIds = [chakula.id for chakula in caterermeals]

    # get orders => all orders with meal id in myIds
    orders = Order.query.filter(Order.meal_id.in_(myIds)).all()

    # calculate total earnings
    total_earnings = sum(order.total_amount for order in orders)

    # calculate the number of orders
    total_orders = len(orders)

    # get the current date
    current_date = datetime.now().strftime("%Y-%m-%d")

    return jsonify({"date": current_date, "total_earnings": total_earnings, "total_orders": total_orders})

def calculate_caterer_earnings(caterer_id, date):
    # Perform a database query to fetch orders for the given caterer and date, and sum their total amounts
    orders = Order.query.filter_by(user_id=caterer_id).filter_by(order_date=date).all()
    total_earnings = sum(order.total_amount for order in orders)

    return total_earnings


@app.route('/logout', methods=['POST'])
def logout():
    response = jsonify({'Message': "Successfully logged out"})
    unset_jwt_cookies(response)
    return response

if __name__ == "__main__":  
    app.run(debug=True, port=5000)
   