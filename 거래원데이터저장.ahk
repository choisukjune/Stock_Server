CoordMode, Mouse, Screen
CoordMode, Pixel, Screen

;SetControlDelay, -1

;SetKeyDelay, -1


SetMouseDelay, -1


SetDefaultMouseSpeed, 0


;SetWinDelay, -1


SetBatchLines -1


Param1 := A_Args[1]

clipboard := ""

winGet, b, ID, [0127] 거래원순간거래량
;winGetPos, x, y, w, h, [0127] 거래원순간거래량
;;1134 52 1794 1032
;x_a := x + w - 17
;x_b := h - 52 
;x_c := x + w
;x_d := h 
;loop
;{
;	ImageSearch, vx, vy, 1366, 994, 1433, 1013, end.png
;	if (ErrorLevel = 0)
;	{
;	    MsgBox, 이미지를 찾았습니다! `n찾은 좌표: %vx%`, %vy%
;	    break
;	}
;	else
;	{
;	    MsgBox, 이미지를 못 찾았거나, 이미지서치를 수행하지 못했습니다. (ErrorLevel = %ErrorLevel%)
;	}
;	loop,40
;	{
;		SendMessage,0x115,7,0,AfxWnd1109,ahk_id %b%
;		sleep,100
;	}

;}

FormatTime, filieNm,,yyyyMMdd_HHmmss
FormatTime, folderNm,,yyyyMMdd

FileCreateDir .\data\02\%Param1%\csv
FileCreateDir .\data\02\%Param1%\json
FileCreateDir .\data\02\%Param1%\bak

;;ControlClick, Button7, ahk_id %b%,,,, NA x3 y3
;;sleep,5
;;ControlClick, Button7, ahk_id %b%,,,, NA x3 y3
;;sleep,5

ControlClick, x430 y200 , ahk_id %b%, ,R

sleep,200

Controlsend, AfxWnd1109,{z}, ahk_id %b%

ClipWait

;ControlClick, Button7, ahk_id %b%,,,, NA x3 y3
;sleep,5

;sleep,5
FileDelete, .\data\02\%Param1%\csv\%Param1%.txt
;sleep,5
FileAppend, %clipboard%, .\data\02\%Param1%\csv\%Param1%.txt

;sleep,500

;;Run, %comspec% /c node 05_make_Trader_DATA_REALTIME.js %Param1% %Param2%,,hide

;sleep,300

