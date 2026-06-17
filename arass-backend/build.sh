#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Remove any broken symlinks that might crash WhiteNoise compression
find . -xtype l -delete || true

python manage.py collectstatic --no-input
python manage.py migrate
python manage.py loaddata portfolio_dump.json

# Create superuser from environment variables (only if it doesn't exist)
if [ "$DJANGO_SUPERUSER_USERNAME" ]; then
  python manage.py createsuperuser --noinput || true
fi
