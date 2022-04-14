::@echo off

SET yyyymmdd=%DATE:~0,4%%DATE:~5,2%%DATE:~8,2% 
::SET yyyymmdd=%DATE:~10,4%%DATE:~4,2%%DATE:~7,2% 
ECHO %yyyymmdd%

::for /L %%i in ( 0, 1, 1 ) do (
::@echo %DATE% %TIME% - %%i
call "c:\Program Files\AutoHotkey\AutoHotkey.exe" 10_taradeValue_close.ahk %yyyymmdd%
call node 10_make__taradeValue_close.js %yyyymmdd%
call node 10_insert__taradeValue.js %yyyymmdd%
::)
cmd /c