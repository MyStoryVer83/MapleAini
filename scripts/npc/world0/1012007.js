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
	NPC Name: 		Trainer Frod
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/

function start() {
    if (cm.haveItem(4031035))
        cm.sendNext("����~ �����Ҹ����Űɣ����ֹ��Ҳ�����̰���˰ɣ��ţ���~ �㰴�Ҹ�˵�ģ�һ·�ϴ��ų���һ���������𣿺ã�����ô����������ˣ��Ҹ�������������֮������ܶ�.");
    else {
        cm.sendOk("�Ҹ�����ҹ�����Щѵ�������õ��ϰ��豸���������������ң������ȥ����������...�����Ҹ翴������������һ���~");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        if (cm.getPlayer().getNoPets() == 0)
            cm.sendNextPrev("�ţ�����ĳ������Ķ�������Ϊ����׼�����ϰ����û�г���Ϊʲô����������ȥ�ɣ�");
        else {
            cm.gainItem(4031035, -1);
            cm.gainCloseness(2, 0);
            cm.sendNextPrev("��ô�����ǲ��Ǿ��ó������������ˣ��Ժ����пյ�ʱ�򣬾��������������ɡ����������ζ����ԡ�����������ȵõ��Ҹ�����ɡ�");
        }
        cm.dispose();
    }
}