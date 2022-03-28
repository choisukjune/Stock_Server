CoordMode, Mouse, Screen

cliW := A_ScreenWidth
cliH := A_ScreenHeight

winW := cliW / 8
winH := cliH / 5
;MsgBox,%winW% -- %winH%

windowMove( x,y )
{

	cliW := A_ScreenWidth
	cliH := A_ScreenHeight

	winW := cliW / 8
	winH := cliH / 5

	MouseGetPos,,, win, Control
	Winmove,ahk_id %win%,,winW * x,( winH * y ) + 25,winW,winH

	return
}

windowRename( nm, p1, p2 )
{

	;MsgBox,%nm%
	cliW := A_ScreenWidth
	cliH := A_ScreenHeight

	y := (( cliH / 5 ) * p1 ) + ( cliH / 5 ) / 2
	x := (( cliW / 8 ) * p2 ) + ( cliW / 8 ) / 2
	;MsgBox,x - y
	MouseMove,x,y

	Sleep,500
	Click
	Click
	Click
	Click
	Click

	WinGetTitle, Title, A
	WinSetTitle, %Title%, , %nm%
}

;윈도우타이틀지정
F1::

	arr00 := [ "001","002","003","004","005","006","008","009","010","012","013","017","021","022","023","024","025","029","030","031","050","046","052","056","058","063","064","066","067","068","069","070","071","072","074","077","078","086","888" ]
	arr01 := [ [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6] ]
	Loop % arr00.Length()
		windowRename( arr00[A_Index], arr01[A_Index][1],arr01[A_Index][2] )
	return


;윈도우위치지정
^1::
	windowMove(0,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , [1413] X-Ray 순간체결량 - 매수 ;교보

return
^2::
	windowMove(1,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , [1413] X-Ray 순간체결량 - 매도 ;신한금융투자
return
^3::
	windowMove(2,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 003 ;한국투자증권
return
^4::
	windowMove(3,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 004 ;대신
return
^5::
	windowMove(4,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 005 ;미래에셋
return
^6::
	windowMove(5,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 006 ;신영
return
^7::
	windowMove(6,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 008 ;유진투자증권
return
^8::
	windowMove(7,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 009 ;한양
return
^q::
	windowMove(0,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 010 ;메리츠
return
^w::
	windowMove(1,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 012 ;NH투자증권
return
^e::
	windowMove(2,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 013 ;부국

return
^r::
	windowMove(3,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 017 ;KB증권
return
^t::
	windowMove(4,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 021 ;한화
return
^y::
	windowMove(5,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 022 ;현대차증권
return
^u::
	windowMove(6,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 023 ;유화
return
^i::
	windowMove(7,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 024 ;유안타
return
^a::
	windowMove(0,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 025 ;sk증권
return
^s::
	windowMove(1,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 029 ;상상인증권
return
^d::
	windowMove(2,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 030 ;삼성
return
^f::
	windowMove(3,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 031 ;DB금융투자
return
^g::
	windowMove(4,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 050 ;키움증권
return
^h::
	windowMove(5,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 046 ;HI투자증권
return
^j::
	windowMove(6,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 052 ;리딩투자
return
^k::
	windowMove(7,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 056 ;하나금융투자
return
^z::
	windowMove(0,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 058 ;도이치코리아

return
^x::
	windowMove(1,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 063 ;이베스트	
return
^c::
	windowMove(2,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 064 ;코리아에셋
return
^v::
	windowMove(3,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 066 ;흥국증권중개
return
^b::
	windowMove(4,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 067 ;BNP파리바
return
^n::
	windowMove(5,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 068 ;IBK투자증권

return
^m::
	windowMove(6,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 069 ;카카오페이증권
return
^,::
	windowMove(7,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 070 ;토러스투자중권
return
^+1::
	windowMove(0,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 071 ;KTB투자증권

return
^+2::
	windowMove(1,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 072 ;케이프투자증권
return
^+3::
	windowMove(2,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 074 ;한국스탠다드차티드
return
^+4::
	windowMove(3,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 077 ;토스
return
^+5::
	windowMove(4,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 078 ;한국아이엠씨
return
^+6::
	windowMove(5,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 086 ;BNK증권

return
^+7::
	windowMove(6,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 888 ;외국계전체
return
^+8::
	windowMove(7,4)
return

esc::
	ExitApp	