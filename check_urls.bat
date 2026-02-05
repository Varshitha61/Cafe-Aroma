@echo off
setlocal enabledelayedexpansion
for /f "tokens=*" %%a in (urls.txt) do (
    curl.exe -o NUL -s -w "%%{http_code} %%a\n" "%%a" >> status.txt
)
