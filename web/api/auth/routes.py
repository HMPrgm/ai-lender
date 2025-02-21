from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from models import User, db

api = Blueprint('auth', __name__)

@api.route('/auth/register', methods=['POST'])
def register():
    
    
    data = request.get_json()
    
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({'message':'User already exists with this email'}), 400
        
    user = User(
        email=data['email'],
        name=data['name']
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return jsonify({
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name
            }
        }), 201

@api.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        login_user(user)
        return jsonify({
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name
            }
        }), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@api.route('/auth/check')
@login_required
def check_auth():
    if current_user.is_authenticated:
        return jsonify({
            'user': {
                'id': current_user.id,
                'email': current_user.email,
                'name': current_user.name
            }
        }), 200
    return jsonify({'message': 'Not authenticated'}), 401

@api.route('/auth/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})

