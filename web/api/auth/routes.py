from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required
from .models import User, db

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user = User(
        email=data['email'],
        name=data['name']
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        login_user(user)
        return jsonify({'message': 'Logged in successfully'})
    return jsonify({'message': 'Invalid credentials'}), 401

@api.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})