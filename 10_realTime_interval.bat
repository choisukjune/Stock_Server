::@echo off

::for /L %%i in ( 0, 1, 1 ) do (
::@echo %DATE% %TIME% - %%i
call node 10_interval_taradeValue_realTime.js
::timeout 15 > NUL
::call 10.bat
::)
cmd /c