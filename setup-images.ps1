# Script to copy image files for favicon and social preview
# Run this script from the project root directory

$projectRoot = "c:\Users\Joel Tiago\Desktop\ALL\AISOD Inc\2026\PAIED"

# Copy Paied (1).png to public/images/paied-social-preview.png
$sourceFile = Join-Path $projectRoot "Paied (1).png"
$destFile = Join-Path $projectRoot "public\images\paied-social-preview.png"

if (Test-Path $sourceFile) {
    Copy-Item -Path $sourceFile -Destination $destFile -Force
    Write-Host "✓ Copied Paied (1).png to public/images/paied-social-preview.png"
} else {
    Write-Host "✗ Source file not found: $sourceFile"
}

# Verify AISOD logo exists in public/images
$logoFile = Join-Path $projectRoot "public\images\AISOD Institute logo new.png"
if (Test-Path $logoFile) {
    Write-Host "✓ AISOD logo already exists in public/images/"
} else {
    Write-Host "✗ AISOD logo not found in public/images/"
}

Write-Host "`nImage setup complete!"
