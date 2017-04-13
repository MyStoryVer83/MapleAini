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
	NPC Name: 		Mr. Goldstein
	Map(s): 		Victoria Road : Lith Harbour (104000000)
	Description:		Extends Buddy List
*/
var status = 0;
	
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.sendNext("���𡭡������ҵ�Ԥ���Ǵ�ģ������ûʲô���Ѱ���������~��Ц����Ц~�����ı������⣬�����������ҡ������Ѷ�һ���ʱ�򡭡��Ǻǡ���");
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("���𡭡������ҵ�Ԥ���Ǵ�ģ������ûʲô���Ѱ�����������û��24���ң������ı������⣬�����������ҡ���������Ǯ��ʱ�򡭡��Ǻǡ���");
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("ϣ����������ܶ�һ�㡭��������һ�£��������Ӻ���Ŀ¼����һ���㣬�;������кܶ����ѡ���ô������ֻҪ��һ��Ǯ���ҾͿ���Ϊ�����Ӻ���Ŀ¼�����ǲ���Ӧ������ͬ�˺ŵ�������ɫ������һ��Ҫ���ء�����������");
	} else if (status == 1) {
		cm.sendYesNo("�õģ����ǵľ������۸񲻹���Ϊ���¶����ģ�������˸�#r���ۿ�#k.#b����Ŀ¼���5��һ����24����#k����Ȼ���������ۡ�ֻҪ����һ�Σ�Ŀ¼�Ϳ����������ӡ��Ժ���Ŀ¼���������˵���������Ӧ�ò�������ô������Ը��֧��24������");
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("�㡭��ȷ���Լ���#b24����#k������еĻ�������ȷ��һ�º���Ŀ¼�Ƿ��Ѿ����ӵ�����ˡ���ʹǮ�ٶ࣬����Ŀ¼������Ҳ�޷����ӵ�#b50������#k��");
            cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-240000);
			cm.getPlayer().setBuddyCapacity(newcapacity)		
			cm.sendOk("�õģ���ĺ���Ŀ¼�Ѿ�������5���������ȷ��һ�¡��������Ŀ¼���ǲ����Ļ���������ʱ�����ҡ��ҿ�����ʱ�������ӣ����ܶ��ٴζ��С���Ȼ������ѵġ�����ô�ټ�~");
			cm.dispose();
			}
		}
	}
}