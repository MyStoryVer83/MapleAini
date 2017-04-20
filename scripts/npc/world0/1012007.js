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
        cm.sendNext("哎呦~ 那是我哥哥的信吧！他又怪我不工作贪玩了吧？嗯？啊~ 你按我哥说的，一路上带着宠物一起上来的吗？好！你这么辛苦地上来了，我给你提高你跟宠物之间的亲密度.");
    else {
        cm.sendOk("我哥哥让我管理这些训练宠物用的障碍设备，不过他看不到我，我想出去玩会儿。呼呼...反正我哥看不到，我先玩一会儿~");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        if (cm.getPlayer().getNoPets() == 0)
            cm.sendNextPrev("嗯？！你的宠物在哪儿？这是为宠物准备的障碍物！你没有宠物为什么来这儿？快回去吧！");
        else {
            cm.gainItem(4031035, -1);
            cm.gainCloseness(2, 0);
            cm.sendNextPrev("怎么样？是不是觉得宠物跟你更亲密了！以后你有空的时候，就来这儿锻炼宠物吧。随便锻炼几次都可以。但是你必须先得到我哥哥的许可。");
        }
        cm.dispose();
    }
}