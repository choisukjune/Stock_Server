::@echo off

::for /L %%i in ( 0, 1, 1 ) do (
::@echo %DATE% %TIME% - %%i
call "c:\Program Files\AutoHotkey\AutoHotkey.exe" 10_taradeValue_realTime.ahk
call node 10_make__taradeValue_realTime.js %1
::timeout 15 > NUL
::call 10.bat
::)
cmd /c