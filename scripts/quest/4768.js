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
			if(qm.getQuestStatus(4768)==2){
			qm.sendOk("���Ѿ���ȡ������������Ŭ����70�����Ի�ø��ཱ���");
			qm.forceCompleteQuest(4768);
			qm.dispose();
			}else{
			qm.sendNext("��ϲ�㵱ǰ�ȼ��Ѿ�����#b60#k����");
			}
		} else if (status == 1) {//����˫�����ʿ�5 - ÿ��
			qm.sendOk("��ϲ����ϵͳ������\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v5360005# 1��");
			qm.gainItem(5360005, 1);
			qm.forceCompleteQuest(4768);		
			qm.dispose();
		} 
	}
}
