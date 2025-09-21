#!/usr/bin/env python3
"""
CSS Optimization Script for Eurolit Website
Consolidates multiple CSS files and updates HTML references
"""

import os
import re
import glob

def update_html_files():
    """Update all HTML files to use consolidated CSS"""

    # Pattern to match multiple CSS links that we want to replace
    css_pattern = re.compile(
        r'<!--CSS-->\s*'
        r'(<link[^>]*href="css/style\.css"[^>]*>\s*'
        r'(?:<link[^>]*href="css/inner\.css"[^>]*>\s*)?'
        r'<link[^>]*href="css/color\.css"[^>]*>\s*'
        r'<link[^>]*href="css/noscript\.css"[^>]*>)',
        re.MULTILINE | re.DOTALL
    )

    # Replacement with consolidated CSS
    css_replacement = '''<!--CSS-->
  <link href="css/eurolit-consolidated.css" rel="stylesheet" type="text/css"/>'''

    # Pattern to remove duplicate/unnecessary CSS links
    remove_patterns = [
        r'\s*<link[^>]*href="css/default\.css"[^>]*>',
        r'\s*<link[^>]*href="css/style-switcher\.css"[^>]*>',
    ]

    # Get all HTML files
    html_files = glob.glob('*.html')
    updated_files = []

    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Replace main CSS block
            content = css_pattern.sub(css_replacement, content)

            # Remove unnecessary CSS links
            for pattern in remove_patterns:
                content = re.sub(pattern, '', content)

            # Clean up duplicate consolidated CSS links (in case script runs multiple times)
            content = re.sub(
                r'(<link[^>]*href="css/eurolit-consolidated\.css"[^>]*>\s*){2,}',
                r'\1',
                content
            )

            # Only write if content changed
            if content != original_content:
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files.append(html_file)
                print(f"✓ Updated {html_file}")
            else:
                print(f"- No changes needed for {html_file}")

        except Exception as e:
            print(f"✗ Error updating {html_file}: {e}")

    return updated_files

def generate_report():
    """Generate optimization report"""

    css_files = glob.glob('css/*.css')
    total_size_before = 0

    # Calculate original file sizes
    original_files = [
        'css/style.css',
        'css/inner.css',
        'css/color.css',
        'css/default.css',
        'css/noscript.css',
        'css/style-switcher.css'
    ]

    for file_path in original_files:
        if os.path.exists(file_path):
            total_size_before += os.path.getsize(file_path)

    # Calculate consolidated file size
    consolidated_size = 0
    if os.path.exists('css/eurolit-consolidated.css'):
        consolidated_size = os.path.getsize('css/eurolit-consolidated.css')

    # Keep fancybox CSS (still needed)
    fancybox_size = 0
    if os.path.exists('css/jquery.fancybox-1.3.4.css'):
        fancybox_size = os.path.getsize('css/jquery.fancybox-1.3.4.css')

    total_size_after = consolidated_size + fancybox_size

    print("\n" + "="*50)
    print("CSS OPTIMIZATION REPORT")
    print("="*50)
    print(f"Files before: {len(original_files)} CSS files")
    print(f"Files after:  2 CSS files (consolidated + fancybox)")
    print(f"Size before:  {total_size_before:,} bytes")
    print(f"Size after:   {total_size_after:,} bytes")
    print(f"Reduction:    {total_size_before - total_size_after:,} bytes ({((total_size_before - total_size_after) / total_size_before * 100):.1f}%)")
    print("="*50)

    print("\nOptimizations applied:")
    print("• Consolidated 6 CSS files into 1")
    print("• Removed duplicate CSS properties")
    print("• Added CSS custom properties (variables)")
    print("• Improved responsive design")
    print("• Removed legacy browser support")
    print("• Removed unused style-switcher functionality")
    print("• Added modern focus management")
    print("• Optimized for performance")

if __name__ == "__main__":
    print("Starting CSS optimization...")

    # Update HTML files
    updated_files = update_html_files()

    print(f"\nUpdated {len(updated_files)} HTML files:")
    for file in updated_files:
        print(f"  • {file}")

    # Generate report
    generate_report()

    print("\n✓ CSS optimization complete!")
    print("\nNext steps:")
    print("1. Test the website to ensure all styles are working")
    print("2. Consider removing old CSS files after testing")
    print("3. Update any remaining hardcoded style references")