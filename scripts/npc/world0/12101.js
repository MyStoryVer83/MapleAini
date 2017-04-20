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
    cm.sendNext("这里是位于彩虹岛东北部的叫#b彩虹村#k的村落...你已经知道彩虹岛是新手练习的地方吧?这里只出现比较弱的怪兽,所以你放心吧.");
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
            cm.sendNextPrev("如果你希望变得更强大,就去#b南港#k,在那里乘船去#b金银岛#k.那个岛的规模很大,这里可是比不上得.");
        else if (status == 2)
            cm.sendPrev("听说在金银岛可以学到专门的职业技能.好像是叫#b勇士部落#k来着...? 有人说那里还有非常荒凉的高原村庄,在那里有很多战士.是高原...到底是怎么样的地方呢?");
        else if (status == 3)
            cm.dispose();
    }
}