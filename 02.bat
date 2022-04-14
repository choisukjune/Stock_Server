::@echo off

SET yyyymmdd=%DATE:~0,4%%DATE:~5,2%%DATE:~8,2% 
::SET yyyymmdd=%DATE:~10,4%%DATE:~4,2%%DATE:~7,2% 
ECHO %yyyymmdd%

::for /L %%i in ( 0, 1, 1 ) do (
::@echo %DATE% %TIME% - %%i
call "c:\Program Files\AutoHotkey\AutoHotkey.exe" 거래원데이터저장.ahk %yyyymmdd%
::)
call node 02_make_F_TR_DATA_REALTIME.js %yyyymmdd%
call node 02_insert_F_TR_DATA_REALTIME.js %yyyymmdd%
cmd /c