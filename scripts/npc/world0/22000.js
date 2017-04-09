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
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    cm.sendYesNo("��������뿪�������Ҫ������ #e150 ���#n  �һ����ȥ #b������#k. ���ؼ�������һ���뿪���޷��ٻص������������ǲ�����Ҫȥ��������");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && type != 1)
            status -= 2;
        else if(type == 1 || (mode == -1 && type != 1)){
            if(mode == 0)
                cm.sendOk("��... �Ҳ��㻹��ʲô�������Ҫ���������ɣ�");
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        if (cm.haveItem(4031801))
            cm.sendNext("��, ���ڸ��� 150 ���... ��, ����ʲô�� ��·��˹���Ƽ��ţ� ��, ��Ӧ�ø�����. ΰ���ð�ռҡ����ƺ��Ѿ�������Ľ�����");
        else
            cm.sendNext("ȷ��Ҫ�뿪��? ��ô... �ȸ��� #e150 ���#n ��...");
    } else if (status == 2) {
        if (cm.haveItem(4031801))
            cm.sendNextPrev("��Ȼ�����Ƽ��ţ���Ҳ�����������κη��õġ����ˡ��������ھ�������������������ܻ��е㶯����������...");
        else
        if (cm.getLevel() > 6) {
            if (cm.getMeso() < 150) {
                cm.sendOk("ʲô������ȥ����������û��Ǯ������һ������...");
                cm.dispose();
            } else
                cm.sendNext("�ܺ�! #e150#n ���! ��ô���������ھ��������������!");
        } else {
            cm.sendOk("�����ҿ������Ҳ���Ϊ�����㹻���ʸ�ȥ�������������ٵȼ���7������7�����ϡ�");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801))
            cm.gainItem(4031801, -1);
        cm.warp(2010000);
        cm.dispose();
    }
}