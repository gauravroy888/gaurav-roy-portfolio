"""
Export portfolio projects from src/data/portfolioData.ts to CSV / Google Sheet format.
"""

import re
import csv
import os

def extract_projects():
    filepath = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'portfolioData.ts')
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by project objects inside PROJECTS
    proj_section = content.split('export const PROJECTS: ProjectItem[] = [')[1]
    proj_section = proj_section.split('export const CLIENTS = [')[0]

    raw_items = proj_section.split("id: '")[1:]
    projects = []

    for item in raw_items:
        try:
            pid = item.split("'")[0]
            
            title_m = re.search(r'title:\s*[\'"]([^\'"]+)[\'"]', item)
            title = title_m.group(1) if title_m else ''

            domain_m = re.search(r'domainId:\s*[\'"]([^\'"]+)[\'"]', item)
            domain = domain_m.group(1) if domain_m else ''

            client_m = re.search(r'client:\s*[\'"]([^\'"]+)[\'"]', item)
            client = client_m.group(1) if client_m else ''

            year_m = re.search(r'year:\s*[\'"]([^\'"]+)[\'"]', item)
            year = year_m.group(1) if year_m else ''

            role_m = re.search(r'role:\s*[\'"]([^\'"]+)[\'"]', item)
            role = role_m.group(1) if role_m else ''

            yt_m = re.search(r'youtubeId:\s*[\'"]([^\'"]+)[\'"]', item)
            youtube_id = yt_m.group(1) if yt_m else ''

            desc_m = re.search(r'shortDescription:\s*[\'"]([^\'"]+)[\'"]', item)
            desc = desc_m.group(1) if desc_m else ''

            software_m = re.search(r'softwareUsed:\s*\[([^\]]+)\]', item)
            software = software_m.group(1).replace("'", "").replace('"', '').strip() if software_m else ''

            projects.append({
                'ID': pid,
                'Title': title,
                'Domain': domain,
                'Client': client,
                'Year': year,
                'Role': role,
                'YouTube_ID': youtube_id,
                'Short_Description': desc,
                'Software_Stack': software
            })
        except Exception:
            continue

    return projects

def export_to_csv():
    projects = extract_projects()
    csv_path = os.path.join(os.path.dirname(__file__), '..', 'portfolio_projects_template.csv')
    
    if not projects:
        print("No projects found.")
        return None

    fieldnames = ['ID', 'Title', 'Domain', 'Client', 'Year', 'Role', 'YouTube_ID', 'Short_Description', 'Software_Stack']
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(projects)

    print(f"[SUCCESS] Successfully exported {len(projects)} projects to {csv_path}")
    return csv_path

if __name__ == '__main__':
    export_to_csv()
