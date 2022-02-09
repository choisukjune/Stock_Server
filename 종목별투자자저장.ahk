CoordMode, Mouse, Screen

SetControlDelay, -1
SetKeyDelay, -1
SetMouseDelay, -1
SetDefaultMouseSpeed, 0
SetWinDelay, -1
SetBatchLines -1


Param1 := A_Args[1]
Param2 := A_Args[2]

clipboard := ""

winGet, b, ID, [0796] 투자자별 매매동향 - 종목별투자자

;loop,30
;{
;	;postmessage,0x100,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ?????
;	;postmessage,0x101,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ????

;	SendMessage,0x115,7,0,AfxWnd1109,%cd%
;	sleep,100
;}

ControlClick, Edit4, ahk_id %b%,,,, NA x3 y3
Controlsend, Edit4,%Param1%, ahk_id %b%

FormatTime, filieNm,,yyyyMMdd_HHmmss
FormatTime, folderNm,,yyyyMMdd

WinGetPos,x,y,w,h,[0796] 투자자별 매매동향 - 종목별투자자
MouseClick,left,x+310,y+60,1,0
sleep,1000

FileCreateDir .\data\05\csv
FileCreateDir .\data\05\json

ControlClick, x160 y144 , ahk_id %b%, ,R

sleep,10

Controlsend, Edit4,{z}, ahk_id %b%

ClipWait

sleep,5
FileDelete, .\data\05\csv\%Param1%_amt.txt
sleep,5
FileAppend, %clipboard%, .\data\05\csv\%Param1%_p.txt

sleep,20

WinGetPos,x,y,w,h,[0796] 투자자별 매매동향 - 종목별투자자
MouseClick,left,x+360,y+60,1,0

sleep,1000
clipboard := ""
ControlClick, x160 y144 , ahk_id %b%, ,R

sleep,10

Controlsend, Edit4,{z}, ahk_id %b%

ClipWait

sleep,5
FileDelete, .\data\05\csv\%Param1%_p.txt
sleep,5
FileAppend, %clipboard%, .\data\05\csv\%Param1%_amt.txt

;Run, %comspec% /c node 05_make_Trader_DATA_REALTIME.js %Param1%,,hide

sleep,20

