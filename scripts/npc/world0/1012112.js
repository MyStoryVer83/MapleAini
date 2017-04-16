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
 * @author BubblesDev
 * @NPC Tory
 */
var status = 0;
var chosen = 0;
var min = 3;
var minLevel = 10;


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
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (cm.getPlayer().getMapId() == 100000200) {
            if (cm.getParty() == null || !cm.isLeader()) {
                if (status == 0) {
                    cm.sendNext("��ã����Ǵ����������ط����������µ����ع⻷���������һ���˵Ļ����޷��������");
                } else if (status == 1) {
                    cm.sendOk("����Ҫ�������棬��Ҫ��������ӵĶӳ������ҽ��жԻ�ร���ȥ����Ķӳ���~^^");
                    cm.dispose();
                }
            } else {
                if (status == 0) {
                    cm.sendNext("����~�ҽд�������������ǿ����»�������ɽ����˵��������һ�������˶����ϻ��������Ĵ���Ѱ�ҿ�������ӵ�ʳ�");
                } else if (status == 1) {
                    cm.sendSimple("#e<������������������>#n\r\n����Ͷ�Ա��һ��Ŭ�������������\r\n#b#L0#����ִ���������#l");
                } else if (status == 2) {
                    var party = cm.getPartyMembers();
                    var onmap = 0;
                    for (var i = 0; i < party.size(); i++) {
                        if (party.get(i).getMap().getId() == 100000200) {
                            if (party.get(i).getLevel() < minLevel) {
                                cm.sendOk("��ȷ��������Ա��\r\n\r\n#b���Ա�ȼ�����Ҫ��" + minLevel + "���ϡ�");
                                cm.dispose();
                                return;
                            }
                            onmap++;
                        }
                    }
                    if (onmap < min) {
                        cm.sendOk("����������Ӷ�Ա����3�������볡��");
                        cm.dispose();
                        return;
                    }
                    if (cm.getClient().getChannelServer().getMapFactory().getMap(910010000).getAllPlayer().size() > 0) {
                        cm.sendOk("����������ڽ�����...���Ե�!");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("HenesysPQ");
                    if (em == null) { 
                        cm.sendOk("������������޸��У�����޷����У�");
                        cm.dispose();
                        return;
                    }

                    var prop = em.getProperty("state");
                    if (prop == null || prop.equals("0")) { //Start the PQ
					    cm.removeHPQItems();
                        em.setProperty("latestLeader", cm.getPlayer().getName());
                        em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                    } else {
                        cm.sendOk("����������ڽ�����...���Ե�Ƭ��!");
                        cm.dispose();
                        return;
                    }
                    cm.dispose();
                }
            }
        } else if (cm.getPlayer().getMap().getId() == 910010100 || cm.getPlayer().getMap().getId() == 910010400) {
            if (status == 0) {
                cm.sendSimple("�Ҹ�л����������������ṩһЩ��⡣ �������㻹û�б�������ˣ������뿪����ط���\r\n#L0#�������ʣ�µ���⡣#l\r\n#L1#�ǵģ��������뿪���#l");
            } else if (status == 1) {
                chosen = selection;
                if (selection == 0) {
                    if (cm.getPlayer().getGivenRiceCakes() >= 20) {
                        if (cm.getPlayer().getGottenRiceHat()) {
                            cm.sendNext("��ϲ���Ҹ����ñ���� �ҳ��˺ܶ������⣬��ĺܸ�л�㡣");
                            cm.dispose();
                        } else {
                            cm.sendYesNo("�Һ�����������뷨����������û���ˡ��Ҽ��ﻹ��һЩ����ҵ���⡣Ϊ�˱�ʾ����ĸм�����Ϊ��׼����һ��С�����Ը�������");
                        }
                    }
                } else if (selection == 1) {
                    cm.warp(100000200);
                    cm.dispose();
                }
                cm.dispose();
            } else if (status == 2) {
                if (chosen == 1) {
                    if (cm.canHold(1002798)) { // we will let them try again if they can't
                        cm.gainItem(1002798);
                        cm.setGottenRiceHat(true);
                        cm.sendNext("ף����ˡ�");
                    } else {
                        cm.getPlayer().dropMessage(1, "EQUIP inventory full.");
                    }
                    cm.dispose();
                } else if (cm.getPlayer().getGivenRiceCakes() < 20) {
                    cm.sendOk("лл���" + cm.getPlayer().getGivenRiceCakes() + "�����!!����ĺܸм���");
                }
            }
        }
    }
}