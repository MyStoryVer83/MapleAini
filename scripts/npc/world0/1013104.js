function start() {
	if (cm.isQuestStarted(22007)) {
		if (!cm.haveItem(4032451)) {
			cm.gainItem(4032451, true);
			cm.sendNext("#b(�����˼�����������������)");
		} else {
			cm.sendNext("#b(�����˼��������ż�����������������)");
		}
	} else {
		cm.sendNext("#b(�����ڲ���Ҫ�ü���)#k");
	}
	cm.dispose();
}