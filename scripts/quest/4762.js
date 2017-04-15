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
			if(qm.getQuestStatus(4762)==2){
			qm.sendOk("你已经领取过奖励，继续努力到15级可以获得新奖励喔");
			qm.forceCompleteQuest(4762);
			qm.dispose();
			}else{
			qm.sendNext("恭喜你当前等级已经到达#b10#k级。");
			}
		} else if (status == 1) { //奖励金币和枫叶
		  if(qm.canHold(4001126)){
			qm.sendOk("恭喜你获得系统奖励！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n100000金币\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v4001126# 200个");
			qm.gainMeso(100000);
			qm.gainItem(4001126, 200);
			qm.forceCompleteQuest(4762);
		} else {          
     		cm.sendOk("请确保你的背包是否有足够的空间。");
	    }			
			qm.dispose();
		} 
	}
}
