
$path = "c:\Users\varsh\Desktop\projects\cafe-aroma\pages\Shop.tsx"
$content = Get-Content $path
$urls = @()
foreach ($line in $content) {
    if ($line -match "image: '(.*?)'") {
        $urls += $matches[1]
    }
}
$groups = $urls | Group-Object | Where-Object { $_.Count -gt 1 }
foreach ($g in $groups) {
    Write-Output "URL used $($g.Count) times: $($g.Name)"
}
