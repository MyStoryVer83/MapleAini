function start() {
	if (!cm.isQuestStarted(22015)) {
		cm.sendOk("#b(你获得了龙蛋，你离小猪太远了。走近点抓住它。)");
	} else {
		cm.gainItem(4032449, true);
		cm.forceCompleteQuest(22015);
		cm.playerMessage(5, "你救了小猪。");
	}
	cm.dispose();
}