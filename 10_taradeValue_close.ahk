CoordMode, Mouse, Screen

;SetControlDelay, -1

;SetKeyDelay, -1


SetMouseDelay, -1


SetDefaultMouseSpeed, 0


;SetWinDelay, -1


SetBatchLines -1


Param1 := A_Args[1]


clipboard := ""

winGet, b, ID, [0184] ���ϰŷ�����(�ŷ���/ȸ����/�ŷ����)

ControlClick, Button8, ahk_id %b%

loop,110
{
	postmessage,0x100,34, 22085633,AfxWnd11015,ahk_id %b%  ; z ?????
	postmessage,0x101,34, 22085633,AfxWnd11015,ahk_id %b%  ; z ????

	;sendMessage,0x115,7,0,AfxWnd11015,%cd%
	sleep,10
}

ControlClick, AfxWnd1105, ahk_id %b%,,,, NA x3 y3
;; Controlsend, Edit4,%Param1%, ahk_id %b%

FormatTime, filieNm,,yyyyMMdd_HHmmss
FormatTime, folderNm,,yyyyMMdd

FileCreateDir .\data\10\%Param1%\csv
FileCreateDir .\data\10\%Param1%\json
FileCreateDir .\data\10\%Param1%\bak

ControlClick, AfxWnd11015 , ahk_id %b%, ,R

sleep,5

Controlsend, AfxWnd11015,{z}, ahk_id %b%

ClipWait

sleep,5

FileDelete, .\data\10\%Param1%\csv\%Param1%.txt

sleep,5

FileAppend, %clipboard%, .\data\10\%Param1%\csv\%Param1%.txt

sleep,500

;Run, %comspec% /c node .\07_make_mass_trns_DATA_REALTIME.js %Param1%,,hide

sleep,3000

;esc::
;	ExitApp	