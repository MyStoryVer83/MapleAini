/* Author: Xterminator
	NPC Name: 		Pison
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Florina Beach Tour Guide
*/
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		} else if (status <= 2 && mode == 0) {
			cm.sendNext("��������������Щ�»�û�а��������ƣ����ʱ����ƽ�̲��Ϣ����һ��Ҳ����");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("����˵����������۲�Զ�ĵط��и���#b�ƽ�̲#k��������̲��ֻҪ����#b1500���#k��#b�������о�#k���Ҿ����㵽����ȥ����ô�����벻��ȥ�ƽ�̲��\r\n\r\n#L0##b���븶1500���#l\r\n#L1#�����������о�#l\r\n#L2#�������о�#k��ʲô?#l");
		} else if (status == 1) {
			if (selection == 0) {
				cm.sendYesNo("��Ҫ��#b1500���#kȥ�ƽ�̲�𣿺�~������Ҳ�й���㲻Ҫ����׼��������ȥ׼����������ô������������ȥ�ƽ�̲��");
			} else if (selection == 1) {
				status = 2;
				cm.sendYesNo("����#b�������о�#k�����Ǹ���ʱ����ȥ�ƽ�̲����~������Ҳ�й���㲻Ҫ����׼��������ȥ׼��������ô������������ȥ�ƽ�̲��");
			} else if (selection == 2) {
				status = 4;
				cm.sendNext("��������������֪��#b�������о�#k��ʲô����������������о�����ʱ�������ȥ�ƽ�̲������Ʊ�Ǻ��ر�ģ�����Ҳһֱ�ϸ����������ǰ��ȥ���򱾲���ʱ��Ū���ˡ�");
			}
		} else if (status == 2) {
			if (cm.getMeso() < 1500) {
				cm.sendNext("���Һ��񲻹��ɣ���׬��Ǯ�����ɡ�����԰��㴩���·��������������ں��ߴ��ԣ����������ҡ���׬Ǯ�İ취�ܶ�ѽ��");
				cm.dispose();
			} else {
				cm.gainMeso(-1500);
				cm.getPlayer().saveLocation("FLORINA");
				cm.warp(110000000, 0);
				cm.dispose();
			}
		} else if (status == 3) {
			if (cm.haveItem(4031134)) {
				cm.getPlayer().saveLocation("FLORINA");
				cm.warp(110000000, 0);
				cm.dispose();
			} else {
				cm.sendNext("�ߡ���#b�������о�#k�����ȷʵ��������ȷ�ϰɡ�");
				cm.dispose();
			}
		} else if (status == 4) {
			cm.sendNext("������������֪��#b�������о�#k��ʲô����������������о�����ʱ�������ȥ�ƽ�̲������Ʊ�Ǻ��ر�ģ�����Ҳһֱ�ϸ����������ǰ��ȥ���򱾲���ʱ��Ū���ˡ�");
		} else if (status == 5) {
			cm.sendNextPrev("��ϧ�һ�û�һ�������ϣ�����򱾲���ĳ�����ҵ�����������л���ȥ���򱾲��������Ǹ�Ʊ�ɡ����ܶ�������á�");
		} else if (status == 6) {
			cm.dispose();
		}
	}
}
