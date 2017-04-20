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
                    cm.sendNext("你好！我是达尔利。这个地方充满了满月的神秘光环，如果你是一个人的话就无法进入这里。");
                } else if (status == 1) {
                    cm.sendOk("若想要进入里面，需要你所属组队的队长，与我进行对话喔！快去找你的队长吧~^^");
                    cm.dispose();
                }
            } else {
                if (status == 0) {
                    cm.sendNext("哈啰~我叫达尔利。这里面是开满月花的美丽山丘。听说…里面有一个叫做兴儿的老虎，好像四处在寻找可以填饱肚子的食物…");
                } else if (status == 1) {
                    cm.sendSimple("#e<组队任务：月妙组队任务>#n\r\n你想和队员们一起努力，完成任务吗？\r\n#b#L0#我想执行组队任务。#l");
                } else if (status == 2) {
                    var party = cm.getPartyMembers();
                    var onmap = 0;
                    for (var i = 0; i < party.size(); i++) {
                        if (party.get(i).getMap().getId() == 100000200) {
                            if (party.get(i).getLevel() < minLevel) {
                                cm.sendOk("请确认你的组队员：\r\n\r\n#b组队员等级必须要在" + minLevel + "以上。");
                                cm.dispose();
                                return;
                            }
                            onmap++;
                        }
                    }
                    if (onmap < min) {
                        cm.sendOk("你所属的组队队员不足3名不能入场。");
                        cm.dispose();
                        return;
                    }
                    if (cm.getClient().getChannelServer().getMapFactory().getMap(910010000).getAllPlayer().size() > 0) {
                        cm.sendOk("组队任务正在进行中...请稍等!");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("HenesysPQ");
                    if (em == null) { 
                        cm.sendOk("组队任务正在修复中，因此无法进行！");
                        cm.dispose();
                        return;
                    }

                    var prop = em.getProperty("state");
                    if (prop == null || prop.equals("0")) { //Start the PQ
					    cm.removeHPQItems();
                        em.setProperty("latestLeader", cm.getPlayer().getName());
                        em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                    } else {
                        cm.sendOk("组队任务正在进行中...请稍等片刻!");
                        cm.dispose();
                        return;
                    }
                    cm.dispose();
                }
            }
        } else if (cm.getPlayer().getMap().getId() == 910010100 || cm.getPlayer().getMap().getId() == 910010400) {
            if (status == 0) {
                cm.sendSimple("我感谢你给饥饿的生长者提供一些年糕。 看起来你还没有别的事情了，你想离开这个地方吗？\r\n#L0#我想给你剩下的年糕。#l\r\n#L1#是的，请让我离开这里。#l");
            } else if (status == 1) {
                chosen = selection;
                if (selection == 0) {
                    if (cm.getPlayer().getGivenRiceCakes() >= 20) {
                        if (cm.getPlayer().getGottenRiceHat()) {
                            cm.sendNext("你喜欢我给你的帽子吗？ 我吃了很多你的年糕，真的很感谢你。");
                            cm.dispose();
                        } else {
                            cm.sendYesNo("我很欣赏你这个想法，但我现在没事了。我家里还有一些你给我的年糕。为了表示对你的感激，我为你准备了一份小礼物。你愿意接受吗？");
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
                        cm.sendNext("祝你好运。");
                    } else {
                        cm.getPlayer().dropMessage(1, "EQUIP inventory full.");
                    }
                    cm.dispose();
                } else if (cm.getPlayer().getGivenRiceCakes() < 20) {
                    cm.sendOk("谢谢你的" + cm.getPlayer().getGivenRiceCakes() + "个年糕!!我真的很感激！");
                }
            }
        }
    }
}