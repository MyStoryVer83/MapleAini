var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode == -1) {
		qm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
	    cm.sendNext("�����ҵ��ˣ�������Լ����������...", 1);
	} else if (status == 1) {
	    cm.sendNextPrev("������Լ������...", 1);
	} else if (status == 2) {
	    cm.warp(900090101);
	    cm.dispose();
	}
}