::@echo off

::for /L %%i in ( 0, 1, 1 ) do (
::@echo %DATE% %TIME% - %%i
call "c:\Program Files\AutoHotkey\AutoHotkey.exe" 거래원데이터저장.ahk %1
::)
call node 02_make_F_TR_DATA_REALTIME.js %1
call node 02_insert_F_TR_DATA_REALTIME.js %1
cmd /c