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
			if(qm.getQuestStatus(4761)==2){
			qm.sendOk("���Ѿ���ȡ������������Ŭ����10�����Ի���½����");
			qm.forceCompleteQuest(4761);
			qm.dispose();
			}else{
			qm.sendNext("��ϲ�㵱ǰ�ȼ��Ѿ�����#b8#k����");
			}
		} else if (status == 1) { //������ɫҩˮ
          if(qm.canHold(2000003)){
			qm.sendOk("��ϲ����ϵͳ������\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2000003#  50��"); 
			qm.gainItem(2000003, 50);
			qm.forceCompleteQuest(4761);
		} else {          
     		cm.sendOk("��ȷ����ı����Ƿ����㹻�Ŀռ䡣");
	    }
			qm.dispose();
		} 
	}
}
