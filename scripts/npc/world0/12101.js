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
/* Author: Xterminator
	NPC Name: 		Rain
	Map(s): 		Maple Road : Amherst (1010000)
	Description: 		Talks about Amherst
*/
var status = -1;

function start() {
    cm.sendNext("������λ�ڲʺ絺�������Ľ�#b�ʺ��#k�Ĵ���...���Ѿ�֪���ʺ絺��������ϰ�ĵط���?����ֻ���ֱȽ����Ĺ���,��������İ�.");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && status == 2){
            status -= 2;
            start();
        }else if(mode == 0)
            status-= 2;
        else
            cm.dispose();
    }else{
        if (status == 1)
            cm.sendNextPrev("�����ϣ����ø�ǿ��,��ȥ#b�ϸ�#k,������˴�ȥ#b������#k.�Ǹ����Ĺ�ģ�ܴ�,������ǱȲ��ϵ�.");
        else if (status == 2)
            cm.sendPrev("��˵�ڽ���������ѧ��ר�ŵ�ְҵ����.�����ǽ�#b��ʿ����#k����...? ����˵���ﻹ�зǳ������ĸ�ԭ��ׯ,�������кܶ�սʿ.�Ǹ�ԭ...��������ô���ĵط���?");
        else if (status == 3)
            cm.dispose();
    }
}