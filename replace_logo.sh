#!/bin/bash

# Script to replace all logo references with Shivohm_Logo_3.png
# This ensures consistent logo usage across the entire project

echo "🔄 Starting logo replacement script..."

# Define the new logo path
NEW_LOGO="/Shivohm_Logo_3.png"

# Replace logo references in Svelte files
echo "📝 Updating Svelte components..."
find src -name "*.svelte" -type f -exec sed -i "s|Shivohm_Logo\.png|$NEW_LOGO|g" {} \;
find src -name "*.svelte" -type f -exec sed -i "s|Shivohm_Logo_2\.png|$NEW_LOGO|g" {} \;
find src -name "*.svelte" -type f -exec sed -i "s|Shivohm_Logo_2b\.png|$NEW_LOGO|g" {} \;
find src -name "*.svelte" -type f -exec sed -i "s|shivohm-logo\.svg|$NEW_LOGO|g" {} \;

# Replace logo references in HTML files
echo "🌐 Updating HTML files..."
sed -i "s|shivohm-logo\.svg|$NEW_LOGO|g" src/app.html
sed -i "s|logo-light\.svg|$NEW_LOGO|g" index.html
sed -i "s|shivohm-logo\.svg|$NEW_LOGO|g" index.html

# Replace logo references in manifest
echo "📋 Updating manifest..."
sed -i "s|shivohm-logo\.svg|$NEW_LOGO|g" public/manifest.webmanifest

# Verify the logo file exists
if [ -f "public/Shivohm_Logo_3.png" ]; then
    echo "✅ Logo file exists: public/Shivohm_Logo_3.png"
else
    echo "❌ Logo file not found: public/Shivohm_Logo_3.png"
    exit 1
fi

# Test if the logo is accessible via HTTP (if server is running)
echo "🌐 Testing logo accessibility..."
if curl -s -I http://127.0.0.1:3000/Shivohm_Logo_3.png | grep -q "200 OK"; then
    echo "✅ Logo is accessible via HTTP"
else
    echo "⚠️  Logo not accessible via HTTP (server may not be running)"
fi

echo "🎉 Logo replacement completed!"
echo "📍 New logo path: $NEW_LOGO"
echo "🔄 Please restart your development server to see changes"