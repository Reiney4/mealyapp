from app import app, db  # Import your Flask app and db instance
from models import User, Caterer, Meal, Menu, Order  # Import your models
from werkzeug.security import generate_password_hash
from datetime import date, timedelta  # Import the date and timedelta
import random  # Import the random module

def seed_users():
    users = []
    for i in range(5):
        password_hash = generate_password_hash('password', method='pbkdf2:sha256', salt_length=16)
        user = User.query.filter_by(email=f'user{i}@example.com').first()
        if not user:
            user = User(username=f'user{i}', email=f'user{i}@example.com', password=password_hash)
        else:
            user.password = password_hash  # Update the password or any other field you wish to change
        db.session.add(user)
        users.append(user)
    db.session.commit()
    return users

def seed_caterers(users):
    caterers = []
    for i, user in enumerate(users):
        caterer = Caterer.query.filter_by(name=f'Caterer{i}').first()
        if not caterer:
            caterer = Caterer(name=f'Caterer{i}', user_id=user.id)
        else:
            caterer.user_id = user.id  # Update the user_id or any other field you wish to change
        db.session.add(caterer)
        caterers.append(caterer)
    db.session.commit()
    return caterers

def seed_meals(caterers):
    meals = []
    for caterer in caterers:
        for i in range(5):  # Create 5 meals per caterer
            meal = Meal(name=f'Meal{i}', caterer_id=caterer.id, price=10.99)  # Set a fixed price for simplicity
            db.session.add(meal)
            meals.append(meal)
        db.session.commit()
        caterer.star_meal = meals[-1].id  # Set the last meal as the star meal
    db.session.commit()
    return meals

def seed_menus(caterers, meals):
    menus = []
    for caterer in caterers:
        menu_date = date.today() + timedelta(days=1)  # Create a menu for the next day
        caterer_meals = [meal for meal in meals if meal.caterer_id == caterer.id]
        meal_ids = [meal.id for meal in caterer_meals]
        menu = Menu(caterer_id=caterer.id, date=menu_date, items=','.join(map(str, meal_ids)))
        db.session.add(menu)
        menus.append(menu)
    db.session.commit()
    return menus

def seed_orders(users, meals):
    orders = []
    for user in users:
        for _ in range(3):  # Each user makes 3 orders from each caterer
            for caterer_meal in meals:
                meal_id = caterer_meal.id
                quantity = random.randint(1, 5)  # Random quantity between 1 and 5
                total_amount = caterer_meal.price * quantity
                order = Order(user_id=user.id, meal_id=meal_id, quantity=quantity, total_amount=total_amount)
                db.session.add(order)
                orders.append(order)
    db.session.commit()
    return orders

# Add a check to prevent running the seeding process if the database is already seeded
# ... (rest of your imports and seed_ functions)

if __name__ == '__main__':
    with app.app_context():
        # Now we are within the application context and can access the database

        # Add a check to prevent running the seeding process if the database is already seeded
        if not User.query.first():
            db.drop_all()  # Be careful with this in a production environment
            db.create_all()

            users = seed_users()
            caterers = seed_caterers(users)
            meals = seed_meals(caterers)
            seed_menus(caterers, meals)
            seed_orders(users, meals)
        # else:
        #     print('Database already seeded')

