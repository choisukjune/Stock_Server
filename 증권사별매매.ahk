CoordMode, Mouse, Screen

;SetControlDelay, -1

;SetKeyDelay, -1


SetMouseDelay, -1


SetDefaultMouseSpeed, 0


;SetWinDelay, -1


SetBatchLines -1


Param1 := A_Args[1]

a := 1
arr00 := [ [ "001", "����" ], [ "002", "���ѱ�������" ], [ "003", "�ѱ���������" ], [ "004", "���" ], [ "005", "�̷�����" ], [ "006", "�ſ�" ], [ "008", "������������" ], [ "009", "�Ѿ�" ], [ "010", "�޸���" ], [ "012", "NH��������" ], [ "013", "�α�" ], [ "017", "KB����" ], [ "021", "��ȭ" ], [ "022", "����������" ], [ "023", "��ȭ" ], [ "024", "����Ÿ" ], [ "025", "sk����" ], [ "029", "���������" ], [ "030", "�Ｚ" ], [ "031", "DB��������" ], [ "033", "JP�𰣼���"], [ "035", "����������"], [ "036", "��ǽ��ĸ�"], [ "037", "��Ƽ�׷�"], [ "040", "H S B C"], [ "041", "C.L.S.A����"], [ "042", "CS����"], [ "043", "���񿡽�����"], [ "044", "�޸���ġ"], [ "045", "��常�轺"], [ "046", "HI��������" ], [ "048", "SG����" ], [ "050", "Ű������" ], [ "052", "��������" ], [ "054", "�빫��" ], [ "056", "�ϳ���������" ], [ "058", "����ġ�ڸ���" ], [ "061", "���̿�" ], [ "063", "�̺���Ʈ" ], [ "064", "�ڸ��ƿ���" ], [ "066", "�ﱹ�����߰�" ], [ "067", "BNP�ĸ���" ], [ "068", "IBK��������" ], [ "069", "īī����������" ], [ "070", "�䷯�������߱�" ], [ "071", "KTB��������" ], [ "072", "��������������" ], [ "074", "�ѱ����Ĵٵ���Ƽ��" ], [ "076", "CIMB" ], [ "077", "�佺" ], [ "078", "�ѱ����̿���" ], [ "086", "BNK����" ] ]
Loop % arr00.Length()
{

	clipboard := ""

	winGet, b, ID, [0252] ���ǻ纰 �Ÿŵ��� - ���ǻ纰�ŸŻ���

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
