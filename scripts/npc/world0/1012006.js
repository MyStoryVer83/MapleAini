/* Author: Xterminator
	NPC Name: 		Trainer Bartos
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
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
		} else if (status >= 1 && mode == 0) {
			cm.sendNext("Ŷ��~����������û�գ���ʲôʱ��ı��뷨�˾������Ұɡ�");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("������ʲô�£�\r\n#L0##b������ҹ������#l\r\n#L1#���� ���������ҵ��������ġ�#k#l");
		} else if (status == 1) {
			if (selection == 0) {
				if (cm.haveItem(4031035)) {
					cm.sendNext("����·����ͳ���һ������ĵط��������������ֻɢɢ������Ҳ��������������ϰ���ѵ����������ͳ��ﻹ�������ܵĻ��������ܻ᲻����Ļ�������������ѵ����ĳ�����");
					cm.dispose();
				} else {
					cm.sendYesNo("����·����ͳ���һ������ĵط��������������ֻɢɢ������Ҳ��������������ϰ���ѵ����������ͳ��ﻹ�������ܵĻ��������ܻ᲻����Ļ�������������ѵ����ĳ�����");
				}
			} else {
				cm.sendOk("ι~ ����ļ���#b���� ����#k��? ���������Ѱɣ����ǲ����ϵ��ģ�");
				cm.dispose();
			}
		} else if (status == 2) {
			cm.gainItem(4031035, 1);
			cm.sendNext("�ã������з��ż�����û������ţ������ҵܵܲ�֪������������ȥ�ġ�������һ���ƹ��ϰ��ﵽ�����档����������޵�˵����Ȼ��ת���ҵ��š���ͨ���ϰ����ʱ��Ҫ��ע����ĳ�����ͣ�");
			cm.dispose();
		}
	}
}