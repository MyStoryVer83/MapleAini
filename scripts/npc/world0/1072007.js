/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Thief Job Instructor - Thief's Construction Site (108000400)
-- By ---------------------------------------------------------------------------------------------
	Unknown
-- Version Info -----------------------------------------------------------------------------------
	1.1 - Statement fix [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
*/
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
			
		if (cm.getPlayer().getMapId() == 108000400) {
			if (cm.haveItem(4031013, 30)) {
				if (status == 0)
					cm.sendNext("Ohhhhh.. ���Ѽ�����#r30�����кڰ�����������#k ����������������.. ���Ѿ�ͨ���˲��ԣ����� #bӢ��֤��#k��ȥ�ɡ�");
				else if (status == 1) {
					cm.removeAll(4031013);
					cm.gainItem(4031011, -1);
					cm.gainItem(4031012);
					cm.warp(102040000, 0);
					cm.dispose();
				}
			} else {
				cm.sendOk("���Ժܼ򵥡���ֻҪ��׼���õĿ������������ \r\n �Ѽ�#r30�����кڰ�����������#k");
				cm.dispose();
			}
		} else {
			if (cm.haveItem(4031011)) {
				if (status == 0)
					cm.sendNext("�治���������Ȼ�����#b���³#k���Ƽ��š���ô�͸Ͽ�����ҵĿ��Ի�ö�ת���ʸ�ɣ�")
				else if (status == 1)
					cm.sendNextPrev("�һ����㵽һ�����صĵ�ͼ����ῴ����ͨ�����ῴ���Ĺ�����ǿ���������ͨ�Ĺ���һ������ʮ�ֵ��ײС�");
				else if (status == 2)
					cm.sendNextPrev("���Ժܼ򵥡���ֻҪ��׼���õĿ������������Ѽ�#r30�����кڰ�����������#k���С����������ϲμӿ����𣿽��ܵĻ����ҾͰ����͵�����ȥ��");
				else if (status == 3)
					cm.sendYesNo("һ�����뿼�����㽫�����뿪���������������ͻ�������������ô��������ȥ��");
				else if (status == 4)
					cm.sendNext("�ðɣ����������ȥ,ֻҪ�Ѽ�#r30�����кڰ�����������#kȻ�󽻸���,ǧ��ҪС�ġ�ף����ˡ�");
				else if (status == 5) {
					cm.warp(108000400, 0);
					cm.dispose();
				}
			} else {
				cm.sendOk("�����߿���");
				cm.dispose();
			}
		}
    }
}