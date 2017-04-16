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
    cm.sendSimple("我可以兑换点卷\r\n#L0##b用枫叶兑换点卷#k#l\r\n#L1##kAini叼不叼？#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status < 3)) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("请再仔细想想。一旦你作出了决定，就来找我。");
        cm.dispose();
        return;
    }
    status++;
    if(status == 1) {
        if(selection == 0) {
            cm.sendSimple("枫叶换点卷？这个点子不错哦?\r\n#L0##b我就是要用 #t4001126# 换他妈的.#k#l");
        } else {
            cm.sendNext("吊的一B...");
            cm.dispose();
        }
    } else if(status == 2) {
        cm.sendGetNumber("#b#t4001126##k 每个可以换50点卷!",0,0,9999);
    } else if(status == 3) {
        if(selection == 0) {
            cm.sendOk("0是不允许的.");
            cm.dispose();
        } else {
            temp = selection;
            cost = temp * 50;
            cm.sendYesNo("使用 #b"+temp+" 个#t4001126##k 换 #b"+cost+" 点卷#k . 真的这样做吗?");
        }
    } else if(status == 4) {
        if(!cm.haveItem(4001126, temp)) {
            cm.sendOk("你他吗的有这么多枫叶吗？别乱BB.");
        } else {
            cm.sendOk("换好了 #b"+cost+" 点卷#k，88~");
            cm.gainItem(4001126, -temp);
            cm.getPlayer().getCashShop().gainCash(1, cost);
        }
        cm.dispose();
    }
}