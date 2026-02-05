
$path = "c:\Users\varsh\Desktop\projects\cafe-aroma\pages\Shop.tsx"
$content = Get-Content $path
$count = 0
for ($i = 0; $i -lt $content.Length; $i++) {
    $line = $content[$i]
    if ($line -match "image: '(.*?)'") {
        $url = $matches[1]
        if ($url -eq "" -or $url -eq "undefined" -or $url -eq "null") {
            Write-Output "Empty/Invalid URL at line $($i + 1): $line"
            $count++
        }
    }
}
Write-Output "Found $count empty image URLs"
