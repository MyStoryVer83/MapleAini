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
			qm.sendOk("���Ѿ���ȡ������������Ŭ����15�����Ի���½����");
			qm.forceCompleteQuest(4762);
			qm.dispose();
			}else{
			qm.sendNext("��ϲ�㵱ǰ�ȼ��Ѿ�����#b10#k����");
			}
		} else if (status == 1) { //������Һͷ�Ҷ
		  if(qm.canHold(4001126)){
			qm.sendOk("��ϲ����ϵͳ������\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n100000���\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v4001126# 200��");
			qm.gainMeso(100000);
			qm.gainItem(4001126, 200);
			qm.forceCompleteQuest(4762);
		} else {          
     		cm.sendOk("��ȷ����ı����Ƿ����㹻�Ŀռ䡣");
	    }			
			qm.dispose();
		} 
	}
}
