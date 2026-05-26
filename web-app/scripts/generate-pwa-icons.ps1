param(
  [string]$Source = "public/logo1.png",
  [string]$OutputDir = "public/icons"
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$sizes = @(192, 512)
$root = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $root $Source
$targetDir = Join-Path $root $OutputDir

if (-not (Test-Path -LiteralPath $sourcePath)) {
  throw "Source icon not found: $sourcePath"
}

New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

$sourceImage = [System.Drawing.Image]::FromFile($sourcePath)

try {
  foreach ($size in $sizes) {
    $bitmap = New-Object System.Drawing.Bitmap $size, $size
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

    try {
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.Clear([System.Drawing.Color]::White)

      $padding = [Math]::Round($size * 0.08)
      $availableWidth = $size - ($padding * 2)
      $availableHeight = $size - ($padding * 2)
      $scale = [Math]::Min($availableWidth / $sourceImage.Width, $availableHeight / $sourceImage.Height)
      $drawWidth = [Math]::Round($sourceImage.Width * $scale)
      $drawHeight = [Math]::Round($sourceImage.Height * $scale)
      $x = [Math]::Round(($size - $drawWidth) / 2)
      $y = [Math]::Round(($size - $drawHeight) / 2)

      $graphics.DrawImage($sourceImage, $x, $y, $drawWidth, $drawHeight)
      $bitmap.Save((Join-Path $targetDir "icon-$($size)x$($size).png"), [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
      $graphics.Dispose()
      $bitmap.Dispose()
    }
  }
}
finally {
  $sourceImage.Dispose()
}

Write-Host "Generated PWA icons in $targetDir"
