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
/* NPC Base
	Map Name (Map ID)
	Extra NPC info.
 */

var status;
var ticketId = 5220000;
var mapName = ["射手村", "魔法密林", "勇士部落", "废弃都市", "林中之城", "Mushroom Shrine", "Showa Spa (M)", "Showa Spa (F)", "新叶城", "诺特勒斯号码头"];
var curMapName = "";

function start() {
    status = -1;
	curMapName = mapName[(cm.getNpc() != 9100117 && cm.getNpc() != 9100109) ? (cm.getNpc() - 9100100) : cm.getNpc() == 9100109 ? 8 : 9];
	
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
			if (cm.haveItem(ticketId)) {
				cm.sendYesNo("You may use the " + curMapName + " Gachapon. Would you like to use your Gachapon ticket?");
			} else {
				cm.sendSimple("欢迎来到 " + curMapName + " 的百宝箱. 我能帮您什么?\r\n\r\n#L0#什么是百宝箱?#l\r\n#L1#在哪里买快乐百宝卷?#l");
			}
		} else if(status == 1 && cm.haveItem(ticketId)) {
			if(cm.canHold(1302000) && cm.canHold(2000000) && cm.canHold(3010001) && cm.canHold(4000000)) { // One free slot in every inventory.
				cm.gainItem(ticketId, -1);
				cm.doGachapon();
			} else {
				cm.sendOk("Please have at least one slot in your #rEQUIP, USE, SET-UP, #kand #rETC#k inventories free.");
			}
			cm.dispose();
		} else if(status == 1) {
			if (selection == 0) {
                cm.sendNext("快乐百宝卷里面有各种稀奇古怪的道具哦.");
            } else {
                cm.sendNext("快乐百宝卷在 #r商城#k 购买.");
            }
		} else if(status == 2) {
			cm.sendNextPrev("You'll find a variety of items from the " + curMapName + " Gachapon, but you'll most likely find items and scrolls related to " + curMapName + ".");
		} else {
			cm.dispose();
		}
    }
}