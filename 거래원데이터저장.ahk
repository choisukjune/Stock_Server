CoordMode, Mouse, Screen

;SetControlDelay, -1

;SetKeyDelay, -1


SetMouseDelay, -1


SetDefaultMouseSpeed, 0


;SetWinDelay, -1


SetBatchLines -1


Param1 := A_Args[1]

clipboard := ""

winGet, b, ID, [0127] 거래원순간거래량

;loop,10
;{
;	;postmessage,0x100,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ?????
;	;postmessage,0x101,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ????

;	SendMessage,0x115,7,0,AfxWnd1109,%cd%
;	sleep,100
;}

;ControlClick, Edit4, ahk_id %b%,,,, NA x3 y3
;Controlsend, Edit4,%Param1%, ahk_id %b%

FormatTime, filieNm,,yyyyMMdd_HHmmss
FormatTime, folderNm,,yyyyMMdd

FileCreateDir .\data\02\%Param1%\csv
FileCreateDir .\data\02\%Param1%\json
FileCreateDir .\data\02\%Param1%\bak

;ControlClick, Button7, ahk_id %b%,,,, NA x3 y3
;sleep,5
;ControlClick, Button7, ahk_id %b%,,,, NA x3 y3
;sleep,5

ControlClick, x430 y200 , ahk_id %b%, ,R

sleep,200

Controlsend, Edit4,{z}, ahk_id %b%

ClipWait

ControlClick, Button7, ahk_id %b%,,,, NA x3 y3
sleep,5

sleep,5
FileDelete, .\data\02\%Param1%\csv\%Param1%.txt
sleep,5
FileAppend, %clipboard%, .\data\02\%Param1%\csv\%Param1%.txt

sleep,500

;Run, %comspec% /c node 05_make_Trader_DATA_REALTIME.js %Param1% %Param2%,,hide

sleep,300

