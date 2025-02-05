import os
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .predictor import predictions_from_spreadsheet
import pandas as pd
from models import db, Statement

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'xlsx'}
api = Blueprint('statements', __name__)

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@api.route('/statement', methods=['POST'])
@login_required
def upload_statement():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if file and allowed_file(file.filename):
        try:
            # Read the Excel file directly from the request
            df = pd.read_excel(file)
            
            data = predictions_from_spreadsheet(df)

            # TODO: Add title field to request
            title = 'Blank'
            
            new_statement = Statement(
                title=title,
                days=data['days'],
                slope=data['slope'],
                consistancy=data['consistancy'],
                change_in_balance=data['change_in_balance'],
                user_id=current_user.id
            )
            
            db.session.add(new_statement)
            db.session.commit()
            
            return jsonify({
                'message': 'File processed successfully',
                'data': new_statement.to_dict()
            }), 201
            
        except Exception as e:
            print(e)
            return jsonify({'error': str(e)}), 500
            
    return jsonify({'error': 'File type not allowed'}), 400

@api.route('/statements',methods=['GET'])
@login_required
def get_statements():
    statements = Statement.query.filter_by(user_id=current_user.id).all()
    return jsonify([statement.to_dict() for statement in statements])

@api.route('/statement/<int:id>', methods=['GET'])
@login_required
def get_statement(id):
    statement = Statement.query.filter_by(id=id, user_id=current_user.id).first()
    
    if not statement:
        return jsonify({'error': 'Statement not found'}), 404
    
    return jsonify(statement.to_dict()), 200