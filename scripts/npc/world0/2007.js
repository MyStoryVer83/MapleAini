function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
	cm.sendNext("�ú��������ð��֮�ðɡ�");
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
		cm.sendNext("�ú��������ð��֮�ðɡ�");
		cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) 
			cm.sendYesNo("���������ʺ絺�̳�ֱ��ȥ����ۣ�");
	else if (status == 1){
			cm.warp(104000000);
			cm.dispose();
		}
	}
}