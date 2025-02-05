from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Statement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    time_added = db.Column(db.DateTime, default=datetime.now)
    # date_published = db.Column(db.Date, nullable=False)
    months = db.Column(db.Integer, nullable=False)
    slope = db.Column(db.Float, nullable=False)
    consistancy = db.Column(db.Float, nullable=False)
    change_in_balance = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'time_added': self.time_added.isoformat(),
            'slope': self.slope,
            'consistancy': self.consistancy,
            'change_in_balance': self.change_in_balance,
            'months': self.months,
            'user_id': self.user_id
        }

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(100))
    statements = db.relationship('Statement', backref='user', lazy=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


