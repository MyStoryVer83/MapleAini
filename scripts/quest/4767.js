var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if(qm.getQuestStatus(4767)==2){
			qm.sendOk("你已经领取过奖励，继续努力到60级可以获得更多奖励喔");
			qm.dispose();
			}else{
			qm.sendNext("恭喜你当前等级已经到达#b50#k级。");
			}
		} else if (status == 1) { //奖励双倍经验值卡5 - 每天		
			qm.sendOk("恭喜你获得系统奖励！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v5211018# 1张");
			qm.gainItem(5211018, 1);
			qm.forceCompleteQuest(4767);			
			qm.dispose();
		} 
	}
}
