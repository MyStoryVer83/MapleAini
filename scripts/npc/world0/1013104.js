function start() {
	if (cm.isQuestStarted(22007)) {
		if (!cm.haveItem(4032451)) {
			cm.gainItem(4032451, true);
			cm.sendNext("#b(你获得了鸡蛋。把它交给尤塔)");
		} else {
			cm.sendNext("#b(你获得了鸡蛋。拿着鸡蛋，把它交给尤塔)");
		}
	} else {
		cm.sendNext("#b(你现在不需要拿鸡蛋)#k");
	}
	cm.dispose();
}