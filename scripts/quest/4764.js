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
			if(qm.getQuestStatus(4764)==2){
			qm.sendOk("你已经领取过奖励，继续努力到30级可以获得新奖励喔");
			qm.forceCompleteQuest(4764);
			qm.dispose();
			}else{
			qm.sendNext("恭喜你当前等级已经到达#b20#k级。");
			}
		} else if (status == 1) { //奖励高级瞬移之石
		  if(qm.canHold(5041000){			
			qm.sendOk("恭喜你获得系统奖励！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v5041000# 3个");
			qm.gainItem(5041000, 3);
			qm.forceCompleteQuest(4764);
		} else {          
     		cm.sendOk("请确保你的背包是否有足够的空间。");
	    }				
			qm.dispose();
		} 
	}
}
