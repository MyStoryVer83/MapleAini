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
var temp;
var cost;

var status = 0;

function start() {
    cm.sendSimple("�ҿ��Զһ����\r\n#L0##b�÷�Ҷ�һ����#k#l\r\n#L1##aini�𲻵�#k#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status < 3)) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("Please think carefully. Once you have made your decision, let me know.");
        cm.dispose();
        return;
    }
    status++;
    if(status == 1) {
        if(selection == 0) {
            cm.sendSimple("��Ҷ�����������Ӳ���Ŷ?\r\n#L0##b�Ҿ���Ҫ�� #t4001126# �������.#k#l");
        } else {
            cm.sendNext("����һB...");
            cm.dispose();
        }
    } else if(status == 2) {
        cm.sendGetNumber("#b#t4001126##k ÿ�����Ի�30���!",0,0,9999);
    } else if(status == 3) {
        if(selection == 0) {
            cm.sendOk("0�ǲ������.");
            cm.dispose();
        } else {
            temp = selection;
            cost = temp * 30;
            cm.sendYesNo("ʹ�� #b"+temp+" ��#t4001126##k �� #b"+cost+" ���#k . �����������?");
        }
    } else if(status == 4) {
        if(!cm.haveItem(4001126, temp)) {
            cm.sendOk("�����������ô���Ҷ�𣿱���BB.");
        } else {
            cm.sendOk("88~");
            cm.gainItem(4001126, -temp);
            cm.getPlayer().getCashShop().gainCash(1, cost);
        }
        cm.dispose();
    }
}