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
			if(qm.getQuestStatus(4766)==2){
			qm.sendOk("���Ѿ���ȡ������������Ŭ����50�����Ի�ø��ཱ���");
			qm.forceCompleteQuest(4766);
			qm.dispose();
			}else{
			qm.sendNext("��ϲ�㵱ǰ�ȼ��Ѿ�����#b40#k����");
			}
		} else if (status == 1) { //����ԭ�ظ�����			
			qm.sendOk("��ϲ����ϵͳ������\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v5510000# 10��");
			qm.gainItem(5510000, 10);
			qm.forceCompleteQuest(4766);		
			qm.dispose();
		} 
	}
}
