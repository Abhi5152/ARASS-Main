import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import PortfolioProject

def load_data():
    with open('portfolio_dump.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for item in data:
        fields = item['fields']
        # Use get_or_create to prevent overwriting existing projects or duplicating
        project, created = PortfolioProject.objects.get_or_create(
            slug=fields['slug'],
            defaults={
                'title': fields['title'],
                'category': fields['category'],
                'sub': fields['sub'],
                'problem': fields['problem'],
                'solution': fields['solution'],
                'impact': fields['impact'],
                'stack': fields['stack'],
                'thumbnail': fields['thumbnail'],
                'project_url': fields['project_url'],
            }
        )
        if created:
            print(f"Created: {project.title}")
        else:
            print(f"Skipped existing: {project.title}")

if __name__ == '__main__':
    load_data()
