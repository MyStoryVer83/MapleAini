var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
			
		if (cm.getPlayer().getMapId() == 108000200) {
			if (cm.haveItem(4031013, 30)) {
				if (status == 0)
					cm.sendNext("Ohhhhh.. ���Ѽ�����#r30�����кڰ�����������#k ����������������.. ���Ѿ�ͨ���˲��ԣ����� #bӢ��֤��#k��ȥ�ɡ�");
				else if (status == 1) {
					cm.removeAll(4031013);
					cm.gainItem(4031009, -1);
					cm.gainItem(4031012);
					cm.warp(101020000, 0);
					cm.dispose();
				}
			} else {
				cm.sendOk("���Ժܼ򵥡���ֻҪ��׼���õĿ������������ \r\n �Ѽ�#r30�����кڰ�����������#k");
				cm.dispose();
			}
		} else {
			if (cm.haveItem(4031009)) {
				if (status == 0)
					cm.sendNext("�治���������Ȼ�����#b��˹#k���Ƽ��š���ô�͸Ͽ�����ҵĿ��Ի�ö�ת���ʸ�ɣ�")
				else if (status == 1)
					cm.sendNextPrev("�һ����㵽һ�����صĵ�ͼ����ῴ����ͨ�����ῴ���Ĺ�����ǿ���������ͨ�Ĺ���һ������ʮ�ֵ��ײС�");
				else if (status == 2)
					cm.sendNextPrev("���Ժܼ򵥡���ֻҪ��׼���õĿ������������Ѽ�#r30�����кڰ�����������#k���С����������ϲμӿ����𣿽��ܵĻ����ҾͰ����͵�����ȥ��");
				else if (status == 3)
					cm.sendYesNo("һ�����뿼�����㽫�����뿪���������������ͻ�������������ô��������ȥ��");
				else if (status == 4)
					cm.sendNext("�ðɣ����������ȥ,ֻҪ�Ѽ�#r30�����кڰ�����������#kȻ�󽻸���,ǧ��ҪС�ġ�ף����ˡ�");
				else if (status == 5) {
					cm.warp(108000200, 0);
					cm.dispose();
				}
			} else {
				cm.sendOk("�����߿���");
				cm.dispose();
			}
		}
    }
}