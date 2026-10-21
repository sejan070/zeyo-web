Add-Type -AssemblyName System.Drawing

$srcPath = "d:\All Projects\Zeyo- event management\public\client-media\zeyo-logo-emblem.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

function Resize-Bmp($source, $w, $h) {
    $dest = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($source, 0, 0, $w, $h)
    $g.Dispose()
    return $dest
}

# 1. 192x192 PNG
$icon192 = Resize-Bmp $bmp 192 192
$icon192.Save("d:\All Projects\Zeyo- event management\src\app\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$icon192.Save("d:\All Projects\Zeyo- event management\public\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 2. 180x180 Apple Touch Icon
$appleIcon = Resize-Bmp $bmp 180 180
$appleIcon.Save("d:\All Projects\Zeyo- event management\src\app\apple-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$appleIcon.Save("d:\All Projects\Zeyo- event management\public\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 3. Favicon 48x48
$fav48 = Resize-Bmp $bmp 48 48
$hIcon = $fav48.GetHicon()
$ico = [System.Drawing.Icon]::FromHandle($hIcon)

$fs1 = [System.IO.File]::Create("d:\All Projects\Zeyo- event management\src\app\favicon.ico")
$ico.Save($fs1)
$fs1.Close()

$fs2 = [System.IO.File]::Create("d:\All Projects\Zeyo- event management\public\favicon.ico")
$ico.Save($fs2)
$fs2.Close()

$bmp.Dispose()
Write-Host "Success: All Zeyo official brand icons generated!"
