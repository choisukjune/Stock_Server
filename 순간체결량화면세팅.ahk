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

;������Ÿ��Ʋ����
F1::

	arr00 := [ "001","002","003","004","005","006","008","009","010","012","013","017","021","022","023","024","025","029","030","031","050","046","052","056","058","063","064","066","067","068","069","070","071","072","074","077","078","086","888" ]
	arr01 := [ [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6] ]
	Loop % arr00.Length()
		windowRename( arr00[A_Index], arr01[A_Index][1],arr01[A_Index][2] )
	return


;��������ġ����
^1::
	windowMove(0,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , [1413] X-Ray ����ü�ᷮ - �ż� ;����

return
^2::
	windowMove(1,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , [1413] X-Ray ����ü�ᷮ - �ŵ� ;���ѱ�������
return
^3::
	windowMove(2,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 003 ;�ѱ���������
return
^4::
	windowMove(3,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 004 ;���
return
^5::
	windowMove(4,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 005 ;�̷�����
return
^6::
	windowMove(5,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 006 ;�ſ�
return
^7::
	windowMove(6,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 008 ;������������
return
^8::
	windowMove(7,0)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 009 ;�Ѿ�
return
^q::
	windowMove(0,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 010 ;�޸���
return
^w::
	windowMove(1,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 012 ;NH��������
return
^e::
	windowMove(2,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 013 ;�α�

return
^r::
	windowMove(3,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 017 ;KB����
return
^t::
	windowMove(4,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 021 ;��ȭ
return
^y::
	windowMove(5,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 022 ;����������
return
^u::
	windowMove(6,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 023 ;��ȭ
return
^i::
	windowMove(7,1)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 024 ;����Ÿ
return
^a::
	windowMove(0,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 025 ;sk����
return
^s::
	windowMove(1,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 029 ;���������
return
^d::
	windowMove(2,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 030 ;�Ｚ
return
^f::
	windowMove(3,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 031 ;DB��������
return
^g::
	windowMove(4,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 050 ;Ű������
return
^h::
	windowMove(5,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 046 ;HI��������
return
^j::
	windowMove(6,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 052 ;��������
return
^k::
	windowMove(7,2)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 056 ;�ϳ���������
return
^z::
	windowMove(0,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 058 ;����ġ�ڸ���

return
^x::
	windowMove(1,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 063 ;�̺���Ʈ	
return
^c::
	windowMove(2,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 064 ;�ڸ��ƿ���
return
^v::
	windowMove(3,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 066 ;�ﱹ�����߰�
return
^b::
	windowMove(4,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 067 ;BNP�ĸ���
return
^n::
	windowMove(5,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 068 ;IBK��������

return
^m::
	windowMove(6,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 069 ;īī����������
return
^,::
	windowMove(7,3)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 070 ;�䷯�������߱�
return
^+1::
	windowMove(0,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 071 ;KTB��������

return
^+2::
	windowMove(1,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 072 ;��������������
return
^+3::
	windowMove(2,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 074 ;�ѱ����Ĵٵ���Ƽ��
return
^+4::
	windowMove(3,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 077 ;�佺
return
^+5::
	windowMove(4,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 078 ;�ѱ����̿���
return
^+6::
	windowMove(5,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 086 ;BNK����

return
^+7::
	windowMove(6,4)
	WinGetTitle, Title, A
	WinSetTitle, %Title%, , 888 ;�ܱ�����ü
return
^+8::
	windowMove(7,4)
return

esc::
	ExitApp	