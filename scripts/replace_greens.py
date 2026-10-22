import re

files_to_update = [
    "src/app/packages/page.tsx",
    "src/app/careers/page.tsx",
    "src/components/home/CareersBanner.tsx",
    "src/components/layout/Footer.tsx"
]

replacements = [
    ("#1b4332", "#071426"),
    ("#2D6A4F", "#0E284D"),
    ("#133024", "#050E1B"),
    ("rgba(27,67,50,", "rgba(7,20,38,"),
    ("rgba(45,106,79,", "rgba(7,20,38,"),
]

for file_path in files_to_update:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {file_path}")

print("All green colors converted to brand navy/dark colors successfully!")
