CoordMode, Mouse, Screen

;SetControlDelay, -1

;SetKeyDelay, -1


SetMouseDelay, -1


SetDefaultMouseSpeed, 0


;SetWinDelay, -1


SetBatchLines -1


Param1 := A_Args[1]

;loop
;{

	clipboard := ""

	winGet, b, ID, [1413] X-Ray 순간체결량 - 매수

	;loop,30
	;{
	;	;postmessage,0x100,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ?????
	;	;postmessage,0x101,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ????

	;	SendMessage,0x115,7,0,AfxWnd1109,%cd%
	;	sleep,100
	;}

	; ControlClick, AfxWnd1105, ahk_id %b%,,,, NA x3 y3
	; Controlsend, Edit4,%Param1%, ahk_id %b%

	FormatTime, filieNm,,yyyyMMdd_HHmmss
	FormatTime, folderNm,,yyyyMMdd

	FileCreateDir .\data\06\%Param1%\csv
	FileCreateDir .\data\06\%Param1%\json
	FileCreateDir .\data\06\%Param1%\bak

	ControlClick, AfxWnd1105 , ahk_id %b%, ,R

	sleep,5

	Controlsend, AfxWnd1105,{z}, ahk_id %b%

	ClipWait

	sleep,5

	FileDelete, D:\dev\stock_temp_server\data\06\%Param1%\csv\%Param1%.txt

	sleep,5

	FileAppend, %clipboard%, D:\dev\stock_temp_server\data\06\%Param1%\csv\%Param1%.txt

	sleep,500

	Run, %comspec% /c node D:\dev\stock_temp_server\06_make_mass_trns_DATA_REALTIME.js %Param1%,,hide

	sleep,10000

;}

;esc::
;	ExitApp	