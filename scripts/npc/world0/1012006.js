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
/* Author: Xterminator, Moogra
	NPC Name: 		Trainer Bartos
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/
var status = 0;

function start() {
    cm.sendSimple("找我有什么事？\r\n#L0##b请告诉我关于这里。#l\r\n#L1#妖精 玛丽介绍我到这里来的…#k#l");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (mode == 0) {
        cm.sendNext("哦哼~看来你现在没空？那什么时候改变想法了就来找我吧。");
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                if (cm.haveItem(4031035)) {
                    cm.sendNext("这条路是你和宠物一起锻炼的地方。你可以在这里只散散步，但也可以利用这里的障碍物训练宠物。如果你和宠物还不够亲密的话，它可能会不听你的话。你想在这里训练你的宠物吗？");
                    cm.dispose();
                } else
                    cm.sendYesNo("这条路是你和宠物一起锻炼的地方。你可以在这里只散散步，但也可以利用这里的障碍物训练宠物。如果你和宠物还不够亲密的话，它可能会不听你的话。你想在这里训练你的宠物吗？");
            } else {
                cm.sendOk("喂~ 你真的见过#b妖精 玛丽#k吗? 涅米有撒谎吧？我是不会上当的！");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.gainItem(4031035, 1);
            cm.sendNext("好！这里有封信件。你没有这封信，恐怕我弟弟不知道是我让你上去的。跟宠物一起绕过障碍物到最上面。在那里跟巴罗德说话，然后转交我的信。你通过障碍物的时候要多注意你的宠物。加油！");
            cm.dispose();
        }
    }
}