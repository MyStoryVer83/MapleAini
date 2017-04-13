/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Pison - Florina Beach(110000000)
-- By ---------------------------------------------------------------------------------------------
	Information & Xterminator
-- Version Info -----------------------------------------------------------------------------------
        1.2 - Fixed and cleanup [Shootsource]
	1.1 - Add null map check [Xterminator]
	1.0 - First Version
---------------------------------------------------------------------------------------------------
 **/
var status = 0;
var returnmap;

function start() {
    returnmap = cm.getPlayer().getSavedLocation("FLORINA");
    if (returnmap == -1)
        returnmap = 104000000;
    cm.sendNext("��#b#m110000000##k��û�����������?�������Ҫ�Ļ���������ȥ#b#m"+returnmap+"##k�ɣ�");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendNext("��������������Щ�»�û�а��������ƣ����ʱ����ƽ�̲��Ϣ����һ��Ҳ����");
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
        if (status == 1)
            cm.sendYesNo("���#b#m"+returnmap+"##k�𣿺�~������׼�������ɡ��ǡ���������ȥ#m"+returnmap+"#��")
        else {
            cm.warp(returnmap);
            cm.dispose();
        }
    }
}
