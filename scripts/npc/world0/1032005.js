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
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	VIP Cab - Victoria Road : Ellinia (101000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
    1.0 - First Version by Xterminator
    2.0 - Second Version by Moogra
    2.1 - Clean up By Moogra
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var cost = 10000;

function start() {
    cm.sendNext("您好~！我是星级出租车。不同于村落之间来往的一半的中巴我们给您提供更高级的服务。因此车费有点贵…您只要支付10000金币，我们就会将您安全迅速的送到#b蚂蚁洞广场#k。但是等级太低进去会很危险是否要进去呢？");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.sendNext("在这个村子里还有许多漂亮的景点，如果你想去蚂蚁洞广场，欢迎随时使用我们的出租车服务。");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) 
            cm.sendNext("您好~！我们是星级出租车。不同于村落之间来往的一半的中巴我们给您提供更高级的服务。因此车费有点贵…您只要支付10000金币，我们就会将您安全迅速的送到#b蚂蚁洞广场#k。但是等级太低进去会很危险是否要进去呢？");
        else if (status == 1) {
            var string = cm.getJobId() == 0 ? "新手可以享受9折的价格折扣" : "非新手职业我们将收取正常的费用";
            string += "蚂蚁洞广场是位于金银岛中间的迷宫深处。在那里有24小时排挡。你是否要付10000金币后去蚂蚁洞广场？";
            if (cm.getJobId() == 0)
                cost = 1000;
        } else if (status == 2) {
            if (cm.getMeso() < cost)
                cm.sendNext("对不起，你的金币不够支付车费。");
            else {
                cm.gainMeso(-cost);
                cm.warp(105070001, 0);
            }
            cm.dispose();
        }
    }
}