var status = -1;
var map = 912030000;
var num = 5;
var maxp = 5;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status <= 1) {
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	var selStr = "���������ѵ������";
	for (var i = 0; i < num; i++) {
		selStr += "\r\n#b#L" + i + "#��ѵ���� " + i + " (" + cm.getPlayerCount(map + i) + "/" + maxp + ")#l#k";
	}
	cm.sendSimple(selStr);
    } else if (status == 1) {
	if (selection < 0 || selection >= num) {
		cm.dispose();
	} else if (cm.getPlayerCount(map + selection) >= maxp) {
		cm.sendNext("�����ѵ�����Ѿ����ˡ�");
		status = -1;
	} else {
		cm.warp(map + selection, 0);
		cm.dispose();
	}
    }
}