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
    cm.sendNext("����~�������Ǽ����⳵����ͬ�ڴ���֮��������һ����а����Ǹ����ṩ���߼��ķ�����˳����е����ֻҪ֧��10000��ң����ǾͻὫ����ȫѸ�ٵ��͵�#b���϶��㳡#k�����ǵȼ�̫�ͽ�ȥ���Σ���Ƿ�Ҫ��ȥ�أ�");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.sendNext("����������ﻹ�����Ư���ľ��㣬�������ȥ���϶��㳡����ӭ��ʱʹ�����ǵĳ��⳵����");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) 
            cm.sendNext("����~���������Ǽ����⳵����ͬ�ڴ���֮��������һ����а����Ǹ����ṩ���߼��ķ�����˳����е����ֻҪ֧��10000��ң����ǾͻὫ����ȫѸ�ٵ��͵�#b���϶��㳡#k�����ǵȼ�̫�ͽ�ȥ���Σ���Ƿ�Ҫ��ȥ�أ�");
        else if (status == 1) {
            var string = cm.getJobId() == 0 ? "���ֿ�������9�۵ļ۸��ۿ�" : "������ְҵ���ǽ���ȡ�����ķ���";
            string += "���϶��㳡��λ�ڽ������м���Թ������������24Сʱ�ŵ������Ƿ�Ҫ��10000��Һ�ȥ���϶��㳡��";
            if (cm.getJobId() == 0)
                cost = 1000;
        } else if (status == 2) {
            if (cm.getMeso() < cost)
                cm.sendNext("�Բ�����Ľ�Ҳ���֧�����ѡ�");
            else {
                cm.gainMeso(-cost);
                cm.warp(105070001, 0);
            }
            cm.dispose();
        }
    }
}