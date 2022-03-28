CoordMode, Mouse, Screen

;SetControlDelay, -1

;SetKeyDelay, -1


SetMouseDelay, -1


SetDefaultMouseSpeed, 0


;SetWinDelay, -1


SetBatchLines -1


Param1 := A_Args[1]

a := 1
arr00 := [ [ "001", "교보" ], [ "002", "신한금융투자" ], [ "003", "한국투자증권" ], [ "004", "대신" ], [ "005", "미래에셋" ], [ "006", "신영" ], [ "008", "유진투자증권" ], [ "009", "한양" ], [ "010", "메리츠" ], [ "012", "NH투자증권" ], [ "013", "부국" ], [ "017", "KB증권" ], [ "021", "한화" ], [ "022", "현대차증권" ], [ "023", "유화" ], [ "024", "유안타" ], [ "025", "sk증권" ], [ "029", "상상인증권" ], [ "030", "삼성" ], [ "031", "DB금융투자" ], [ "033", "JP모간서울"], [ "035", "맥쿼리증권"], [ "036", "모건스탠리"], [ "037", "씨티그룹"], [ "040", "H S B C"], [ "041", "C.L.S.A증권"], [ "042", "CS증권"], [ "043", "유비에스증권"], [ "044", "메릴린치"], [ "045", "골드만삭스"], [ "046", "HI투자증권" ], [ "048", "SG증권" ], [ "050", "키움증권" ], [ "052", "리딩투자" ], [ "054", "노무라" ], [ "056", "하나금융투자" ], [ "058", "도이치코리아" ], [ "061", "다이와" ], [ "063", "이베스트" ], [ "064", "코리아에셋" ], [ "066", "흥국증권중개" ], [ "067", "BNP파리바" ], [ "068", "IBK투자증권" ], [ "069", "카카오페이증권" ], [ "070", "토러스투자중권" ], [ "071", "KTB투자증권" ], [ "072", "케이프투자증권" ], [ "074", "한국스탠다드차티드" ], [ "076", "CIMB" ], [ "077", "토스" ], [ "078", "한국아이엠씨" ], [ "086", "BNK증권" ] ]
Loop % arr00.Length()
{

	clipboard := ""

	winGet, b, ID, [0252] 증권사별 매매동향 - 증권사별매매상위

	loop,10
	{
		;postmessage,0x100,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ?????
		;postmessage,0x101,34, 22085633,AfxWnd1109,ahk_id %b%  ; z ????

		SendMessage,0x115,7,0,AfxWnd1102,ahk_id %b%
		sleep,100
	}

	;ControlClick, Edit4, ahk_id %b%,,,, NA x3 y3
	;Controlsend, Edit4,%Param1%, ahk_id %b%

	FormatTime, filieNm,,yyyyMMdd_HHmmss
	FormatTime, folderNm,,yyyyMMdd

	FileCreateDir .\data\08\%Param1%\csv
	FileCreateDir .\data\08\%Param1%\json
	FileCreateDir .\data\08\%Param1%\bak

	;ControlClick, Button7, ahk_id %b%,,,, NA x3 y3
	;sleep,5
	;ControlClick, Button7, ahk_id %b%,,,, NA x3 y3
	;sleep,5

	ControlClick, x100 y150 , ahk_id %b%, ,R

	sleep,200

	Controlsend, AfxWnd1102,{z}, ahk_id %b%

	ClipWait

	ControlClick, Button7, ahk_id %b%,,,, NA x3 y3
	sleep,5

	sleep,5
	;FileDelete, .\data\08\%Param1%\csv\%Param1%.txt
	sleep,5
	code := arr00[A_Index][1]
	fliename := arr00[A_Index][2]
	FileAppend, %clipboard%, .\data\08\%Param1%\csv\%code%_%fliename%.txt

	sleep,500

	;Run, %comspec% /c node 05_make_Trader_DATA_REALTIME.js %Param1% %Param2%,,hide

	sleep,300

	ControlClick, Edit2, ahk_id %b%,,,, NA x3 y3

	sleep,300

	Controlsend, Edit2,{down}, ahk_id %b%

	sleep,300


	Controlsend, Edit2,{enter}, ahk_id %b%

	a := a + 1

}
