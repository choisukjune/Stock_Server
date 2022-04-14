::@echo off

SET yyyymmdd=%DATE:~0,4%%DATE:~5,2%%DATE:~8,2% 
::SET yyyymmdd=%DATE:~10,4%%DATE:~4,2%%DATE:~7,2% 
ECHO %yyyymmdd%

::for /L %%i in ( 0, 1, 1 ) do (
::@echo %DATE% %TIME% - %%i
call node 08_All_Trader_DATA.js %yyyymmdd%
::)
cmd /c