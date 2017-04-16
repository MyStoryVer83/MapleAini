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
/* Brittany
	Henesys Random Hair/Hair Color Change.
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair = Array(30310, 30330, 30060, 30150, 30410, 30210, 30140, 30120, 30200, 30560, 30510, 30610, 30470);
var fhair = Array(31150, 31310, 31300, 31160, 31100, 31410, 31030, 31080, 31070, 31610, 31350, 31510, 31740);
var hairnew = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("你好,我是美发店的助手!如果你有#b射手村美发店普通会员卡#k或#b射手村染色普通会员卡#k,你就放心的把发型交给我,我会让你满意的.那么你要做什么?请选择吧!\r\n#L0#我想购买会员卡。#l\r\n#L1#改变发型(使用#i5150010##t5150010##l)\r\n#L2#染色(使用#i5151000##t5151000##l)");
        } else if (status == 1) {
            if (selection == 0) {
                beauty = 0;
                cm.sendSimple("你想购买哪种会员卡？\r\n#L0#射手村美发店普通会员卡" + hairprice + " 金币: #i5150010##t5150010##l\r\n#L1#射手村染色普通会员卡" + haircolorprice + " 金币: #i5151000##t5151000##l");
            } else if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair.length; i++)
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair()% 10));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair.length; i++)
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                }
                cm.sendYesNo("如果你有#b射手村美发店普通会员卡#k,那么我将帮你随机改变一种发型,你确定要改变发型吗?");
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++)
                    haircolor.push(current + i);
                cm.sendYesNo("如果你有#b射手村染发普通会员卡#k,那么我将帮你随机改变一种发色,你确定要改变发色吗?");
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150010) == true){
                    cm.gainItem(5150010, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("好了,让朋友们赞叹你的新发型吧!");
                } else {
                    cm.sendOk("看起来你并没有我们的会员卡,我恐怕不能给你理发,我很抱歉...");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151000) == true){
                    cm.gainItem(5151000, -1);
                    cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
                    cm.sendOk("好了,让朋友们赞叹你的新发色吧!");
                } else {
                    cm.sendOk("看起来你并没有我们的会员卡,我恐怕不能给你染发,我很抱歉...");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150010, 1);
                    cm.sendOk("购买成功!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151000, 1);
                    cm.sendOk("购买成功!");
                } else {
                    cm.sendOk("看起来你没有足够的金币来购买我们的会员卡!");
                }
            }
        }
    }
}
