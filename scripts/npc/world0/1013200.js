function start() {
	if (!cm.isQuestStarted(22015)) {
		cm.sendOk("#b(����������������С��̫Զ�ˡ��߽���ץס����)");
	} else {
		cm.gainItem(4032449, true);
		cm.forceCompleteQuest(22015);
		cm.playerMessage(5, "�����С��");
	}
	cm.dispose();
}