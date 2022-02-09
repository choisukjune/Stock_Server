CoordMode, Mouse, Screen

getScrollData( cd )
{
	Loop
	{
		
		PostMessage, 0x115, 7, 0, , 001
		postmessage,0x101,34, 22085633,AfxWnd1109,%cd%
	
		sleep,100
	
	}

return
}


F1::
	
	winGet, b, ID, [0127] 거래원순간거래량
	;MouseGetPos,,, win, Control
	loop
	{
		SendMessage,0x115,7,0,AfxWnd1109,ahk_id %b%
	}
	
return
F2::
	winGet, b, ID, [0796] 투자자별 매매동향 - 종목별투자자
	; MouseGetPos,,, win, Control
	loop
	{
		; SendMessage,0x115,7,0,Button29,ahk_id %win%
		Click,Left,236,253
		Click,WheelDown,10
		sleep,300
	}
	
return
	
esc::
	ExitApp	