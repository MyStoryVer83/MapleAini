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
var status = -1;

function start() {
    cm.sendNext("魔法师可以使用华丽效果的属性魔法,并可以在组队打猎中使用非常有用的辅助魔法.二转后学习的属性魔法可以给相反属性的敌人致命的伤害哦。");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0)
           cm.sendNext("如果你想体验魔法师的话，就来找我吧。");
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendYesNo("怎么样？你想体验魔法师吗？");
    } else if (status == 1){
	cm.lockUI();
        cm.warp(1020200, 0);
        cm.dispose();
    }
}