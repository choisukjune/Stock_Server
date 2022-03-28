CoordMode, Mouse, Screen

SetControlDelay, -1
SetKeyDelay, -1
SetMouseDelay, -1
SetDefaultMouseSpeed, 0
SetWinDelay, -1
SetBatchLines -1


Param1 := A_Args[1]

clipboard := ""

winGet, b, ID, [0796] 투자자별 매매동향 - 종목별투자자
;loop,30
;{
;	;postmessage,0x100,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ?????
;	;postmessage,0x101,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ????

;	SendMessage,0x115,7,0,AfxWnd1109,%cd%
;	sleep,100
;}

FormatTime, filieNm,,yyyyMMdd_HHmmss
FormatTime, folderNm,,yyyyMMdd
FileCreateDir .\data\08\csv
FileCreateDir .\data\08\json

WinGetPos,x,y,w,h,[0796] 투자자별 매매동향 - 종목별투자자
MouseClick,left,x+530,y+63,1,0
sleep,500



ControlClick, Edit4, ahk_id %b%,,,, NA x3 y3
sleep,100
Controlsend, Edit4,%Param1%, ahk_id %b%
sleep,100

MouseClick,left,x+530,y+100,1,0
sleep,300
;loop,16
;{
;	;postmessage,0x100,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ?????
;	;postmessage,0x101,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ????

;	;SendMessage,0x115,7,0,Edit4,ahk_id %b%
;	Click,WheelDown,10
;	sleep,100
;}

ControlClick, x160 y144 , ahk_id %b%, ,R
sleep,10
Controlsend, Edit4,{z}, ahk_id %b%
ClipWait
sleep,5
FileDelete, .\data\08\csv\%Param1%_b.txt
sleep,5
FileAppend, %clipboard%, .\data\08\csv\%Param1%_b.txt
sleep,500

clipboard := ""


WinGetPos,x,y,w,h,[0796] 투자자별 매매동향 - 종목별투자자
MouseClick,left,x+574,y+63,1,0
sleep,500

MouseClick,left,x+530,y+100,1,0
sleep,300
;loop,16
;{
;	;postmessage,0x100,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ?????
;	;postmessage,0x101,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ????

;	;SendMessage,0x115,7,0,Edit4,ahk_id %b%
;	Click,WheelDown,10
;	sleep,100
;}


ControlClick, x160 y144 , ahk_id %b%, ,R
sleep,10
Controlsend, Edit4,{z}, ahk_id %b%
ClipWait
sleep,5
FileDelete, .\data\08\csv\%Param1%_s.txt
sleep,5
FileAppend, %clipboard%, .\data\08\csv\%Param1%_s.txt
sleep,500
;"c:\Program Files\AutoHotkey\AutoHotkey.exe" 08_make_All_trader_DATA.ahk 117580
;----------------------------------------------------------------
