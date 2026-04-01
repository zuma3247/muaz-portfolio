import os, re

src_dir = 'src/components'
assets_dir = 'src/assets'

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find all figma:asset imports
            matches = list(set(re.findall(r'import\s+(\w+)\s+from\s+[\'\"]figma:asset/([a-f0-9]+\.png)[\'\"];', content)))
            
            if not matches:
                continue

            for var_name, hash_name in matches:
                # Convert camelCase to kebab-case
                new_name = re.sub(r'(?<!^)(?=[A-Z])', '-', var_name).lower() + '.png'
                
                # Rename the actual file
                old_asset_path = os.path.join(assets_dir, hash_name)
                new_asset_path = os.path.join(assets_dir, new_name)
                if os.path.exists(old_asset_path):
                    print(f'Renaming {old_asset_path} -> {new_asset_path}')
                    os.rename(old_asset_path, new_asset_path)
                
                # Update the import string in content to point to ../assets/new_name
                # Note: Assuming all components are in src/components, so ../assets is correct
                content = content.replace(f'"figma:asset/{hash_name}"', f'"../assets/{new_name}"')
                content = content.replace(f"'figma:asset/{hash_name}'", f'"../assets/{new_name}"')

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
