CoordMode, Mouse, Screen

SetControlDelay, -1

;콘트롤 명령 처리 속도를 빠르게합니다

SetKeyDelay, -1

;키 입력 속도를 빠르게합니다

SetMouseDelay, -1

;마우스 관련 명령 속도를 빠르게합니다

SetDefaultMouseSpeed, 0

;마우스 이동 속도를 빠르게합니다

;SetWinDelay, -1

;윈도우 관련 명령 처리 속도를 빠르게합니다

SetBatchLines -1

F1::

	loop
	{
		SendMessage,0x115,7,0,AfxWnd1109,001
		SendMessage,0x115,7,0,AfxWnd1109,002
		SendMessage,0x115,7,0,AfxWnd1109,003
		SendMessage,0x115,7,0,AfxWnd1109,004
		SendMessage,0x115,7,0,AfxWnd1109,005
		SendMessage,0x115,7,0,AfxWnd1109,006
		SendMessage,0x115,7,0,AfxWnd1109,008
		SendMessage,0x115,7,0,AfxWnd1109,009

		SendMessage,0x115,7,0,AfxWnd1109,010
		SendMessage,0x115,7,0,AfxWnd1109,012
		SendMessage,0x115,7,0,AfxWnd1109,013
		SendMessage,0x115,7,0,AfxWnd1109,017
		SendMessage,0x115,7,0,AfxWnd1109,021
		SendMessage,0x115,7,0,AfxWnd1109,022
		SendMessage,0x115,7,0,AfxWnd1109,023
		SendMessage,0x115,7,0,AfxWnd1109,024

		SendMessage,0x115,7,0,AfxWnd1109,025
		SendMessage,0x115,7,0,AfxWnd1109,029
		SendMessage,0x115,7,0,AfxWnd1109,030
		SendMessage,0x115,7,0,AfxWnd1109,031
		SendMessage,0x115,7,0,AfxWnd1109,050
		SendMessage,0x115,7,0,AfxWnd1109,052
		SendMessage,0x115,7,0,AfxWnd1109,056
		SendMessage,0x115,7,0,AfxWnd1109,058


		SendMessage,0x115,7,0,AfxWnd1109,063
		SendMessage,0x115,7,0,AfxWnd1109,066
		SendMessage,0x115,7,0,AfxWnd1109,067
		SendMessage,0x115,7,0,AfxWnd1109,068
		SendMessage,0x115,7,0,AfxWnd1109,069
		SendMessage,0x115,7,0,AfxWnd1109,070
		SendMessage,0x115,7,0,AfxWnd1109,071
		SendMessage,0x115,7,0,AfxWnd1109,072

		SendMessage,0x115,7,0,AfxWnd1109,074
		SendMessage,0x115,7,0,AfxWnd1109,077
		SendMessage,0x115,7,0,AfxWnd1109,078
		SendMessage,0x115,7,0,AfxWnd1109,086
		SendMessage,0x115,7,0,AfxWnd1109,888
		;SendMessage,0x115,7,0,AfxWnd1109,052
		;SendMessage,0x115,7,0,AfxWnd1109,056
		;SendMessage,0x115,7,0,AfxWnd1109,058


	}
	


	return

F2::
{

	loop
	{
		Controlsend, AfxWnd1109,{PgDn}, 0zzzzz
		sleep,100
	}

	return


}

;"001","002","003","004","005","006","008","009",
;"010","012","013","017","021","022","023","024",
;"025","029","030","031","050","046","052","056",
;"058","063","064","066","067","068","069","070",
;"071","072","074","077","078","086","888" 


esc::
	ExitApp	