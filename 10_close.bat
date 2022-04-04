::@echo off

::for /L %%i in ( 0, 1, 1 ) do (
::@echo %DATE% %TIME% - %%i
call "c:\Program Files\AutoHotkey\AutoHotkey.exe" 10_taradeValue_close.ahk %1
call node 10_make__taradeValue.js %1
call node 10_insert__taradeValue.js %1
::)
cmd /c