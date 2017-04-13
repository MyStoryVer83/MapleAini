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
					cm.sendNext("Ohhhhh.. 你搜集到了#r30个含有黑暗力量的珠子#k 真是令人难以置信.. 你已经通过了测试，带上 #b英雄证书#k回去吧。");
				else if (status == 1) {
					cm.removeAll(4031013);
					cm.gainItem(4031011, -1);
					cm.gainItem(4031012);
					cm.warp(102040000, 0);
					cm.dispose();
				}
			} else {
				cm.sendOk("考试很简单……只要在准备好的考场上消灭怪物 \r\n 搜集#r30个含有黑暗力量的珠子#k");
				cm.dispose();
			}
		} else {
			if (cm.haveItem(4031011)) {
				if (status == 0)
					cm.sendNext("真不敢相信你既然获得了#b达克鲁#k的推荐信。那么就赶快接受我的考试获得二转的资格吧！")
				else if (status == 1)
					cm.sendNextPrev("我会送你到一个隐藏的地图。你会看到你通常不会看到的怪物。它们看起来和普通的怪物一样，但十分的凶残。");
				else if (status == 2)
					cm.sendNextPrev("考试很简单……只要在准备好的考场上消灭怪物，搜集#r30个含有黑暗力量的珠子#k就行……你想马上参加考试吗？接受的话，我就把你送到考场去。");
				else if (status == 3)
					cm.sendYesNo("一旦进入考场，你将不能离开。如果你死了任务就会重新来过。那么你现在想去吗？");
				else if (status == 4)
					cm.sendNext("好吧！我这送你进去,只要搜集#r30个含有黑暗力量的珠子#k然后交给我,千万要小心。祝你好运。");
				else if (status == 5) {
					cm.warp(108000400, 0);
					cm.dispose();
				}
			} else {
				cm.sendOk("请你走开。");
				cm.dispose();
			}
		}
    }
}