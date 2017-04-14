/*/*
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
	Cloto - Hidden Street : 1st Accompaniment
-- By ---------------------------------------------------------------------------------------------
	Stereo
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Second Version by Moogra
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

importPackage(Packages.tools);
importPackage(java.awt);

var status;
var curMap;
var questions = Array("第一个问题：转职成战士的最低等级是多少？#b\r\n（打倒怪物，获取相应数量的证书。）",
    "第一个问题：转职成战士的最低力量值（SEX）是多少？#b\r\n（打倒怪物，获取相应数量的证书。）",
    "第一个问题：转职成魔法师的最低智力值（INT）是多少？#b\r\n（打倒怪物，获取相应数量的证书。）",
    "第一个问题：转职成弓箭手的最低敏捷值（DEX）是多少？#b\r\n（打倒怪物，获取相应数量的证书。）",
    "第一个问题：转职成飞侠的最低敏捷值（DEX）是多少？#b\r\n（打倒怪物，获取相应数量的证书。）",
    "第一个问题：二转的最低等级是多少？#b\r\n（打倒怪物，获取相应数量的证书。）",
	"第一个问题：转职成魔法师的最低等级是多少？#b\r\n（打倒怪物，获取相应数量的证书。）");
var qanswers = Array(10, 35, 20, 25, 25, 30, 8);
var party;
var preamble; // we dont even need this mother fucker ! --
var stage2Rects = Array(new Rectangle(-755,-132,4,218),new Rectangle(-721,-340,4,166),new Rectangle(-586,-326,4,150),new Rectangle(-483,-181,4,222));
var stage3Rects = Array(new Rectangle(608,-180,140,50),new Rectangle(791,-117,140,45),
    new Rectangle(958,-180,140,50),new Rectangle(876,-238,140,45),
    new Rectangle(702,-238,140,45));
var stage4Rects = Array(new Rectangle(910,-236,35,5),new Rectangle(877,-184,35,5),
    new Rectangle(946,-184,35,5),new Rectangle(845,-132,35,5),
    new Rectangle(910,-132,35,5),new Rectangle(981,-132,35,5));
var stage2combos = Array(Array(0,1,1,1),Array(1,0,1,1),Array(1,1,0,1),Array(1,1,1,0));
var stage3combos = Array(Array(0,0,1,1,1),Array(0,1,0,1,1),Array(0,1,1,0,1),
    Array(0,1,1,1,0),Array(1,0,0,1,1),Array(1,0,1,0,1),
    Array(1,0,1,1,0),Array(1,1,0,0,1),Array(1,1,0,1,0),
    Array(1,1,1,0,0));
var stage4combos = Array(Array(0,0,0,1,1,1),Array(0,0,1,0,1,1),Array(0,0,1,1,0,1),
    Array(0,0,1,1,1,0),Array(0,1,0,0,1,1),Array(0,1,0,1,0,1),
    Array(0,1,0,1,1,0),Array(0,1,1,0,0,1),Array(0,1,1,0,1,0),
    Array(0,1,1,1,0,0),Array(1,0,0,0,1,1),Array(1,0,0,1,0,1),
    Array(1,0,0,1,1,0),Array(1,0,1,0,0,1),Array(1,0,1,0,1,0),
    Array(1,0,1,1,0,0),Array(1,1,0,0,0,1),Array(1,1,0,0,1,0),
    Array(1,1,0,1,0,0),Array(1,1,1,0,0,0));	
var eye = 9300002;
var necki = 9300000;
var slime = 9300003;
var monsterIds = Array(eye, eye, eye, necki, necki, necki, necki, necki, necki, slime);
var prizeIdScroll = Array(2040502, 2040505,// Overall DEX and DEF
    2040802,// Gloves for DEX
    2040002, 2040402, 2040602);// Helmet, Topwear and Bottomwear for DEF
var prizeIdUse = Array(2000001, 2000002, 2000003, 2000006,// Orange, White and Blue Potions and Mana Elixir
    2000004, 2022000, 2022003);// Elixir, Pure Water and Unagi
var prizeQtyUse = Array(80, 80, 80, 50, 5, 15, 15);
var prizeIdEquip = Array(1032004, 1032005, 1032009,// Level 20-25 Earrings
    1032006, 1032007, 1032010,// Level 30 Earrings
    1032002,// Level 35 Earring
    1002026, 1002089, 1002090);// Bamboo Hats
var prizeIdEtc = Array(4010000, 4010001, 4010002, 4010003,// Mineral Ores
    4010004, 4010005, 4010006,// Mineral Ores
    4020000, 4020001, 4020002, 4020003,// Jewel Ores
    4020004, 4020005, 4020006,// Jewel Ores
    4020007, 4020008, 4003000);	// Diamond and Black Crystal Ores and Screws
var prizeQtyEtc = Array(15, 15, 15, 15, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3, 3, 30);
//500, 1000, 2000, 4000, 7500 = default
function start() {
    status = -1;
    curMap = cm.getPlayer().getMapId() - 103000799;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (type == 0 && mode == 0)
        status--;
    else {
        cm.dispose();
        return;
    }
    if (curMap == 1) { // First Stage.
        if (isLeader()) {
            var eim = cm.getPlayer().getEventInstance();
            party = eim.getPlayers();
            preamble = eim.getProperty("leader1stpreamble");
            if (preamble == null) {
				cm.sendNext("你好，欢迎来到第一个阶段，在这里你可能会考到很多凶狠的鳄鱼，跟我对话，我会给你们每一个人出一道题目，你们再打倒凶狠的鳄鱼获取相应数目的证书卡交给我，就行了。之后我会给你们一张通行证，你们把通行证全部交给组队长，组队长再和我讲话，就可以顺利通关了，那么祝你一切顺利！");
                eim.setProperty("leader1stpreamble","done");
				cm.dispose();
            } else {
                var complete = eim.getProperty(curMap + "stageclear");
                if (complete != null) {
                    cm.sendNext("缩地门已打开，现在可以到下一个关卡了。");
                    cm.dispose();
                } else {
                    var numpasses = party.size() - 1; // All the players in the party need to get a pass besides the leader.
                    var strpasses = "#b" + numpasses + " passes#k";
                    if (!cm.haveItem(4001008, numpasses)) {
                        cm.sendNext("对不起，你收集的通行证数量没有达到我所需求的。");
                        cm.dispose();
                    } else {
                        cm.sendNext("不敢相信你们组队已经成功完成了第一阶段。好了，我将开启通往下一个关卡的结界，时间不多了，你们赶快到那里进行第二阶段的挑战吧。");
                        clear(1, eim, cm);
						cm.givePartyExp("KerningPQ1st");
                        cm.gainItem(4001008, -numpasses);
                        cm.dispose();
                    // TODO: Make the shiny thing flash
                    }
                }
            }
        } else { // Not leader
            var eim = cm.getPlayer().getEventInstance();
            pstring = "member1stpreamble" + cm.getPlayer().getId();
            preamble = eim.getProperty(pstring);
            if (status == 0) {
                if (preamble == null) {
                    var qstring = "member1st" + cm.getPlayer().getId();
                    var question = eim.getProperty(qstring);
                    if (question == null) {
                        // Select a random question to ask the player.
                        var questionNum = Math.floor(Math.random() * questions.length);
                        eim.setProperty(qstring, questionNum);
                    }
                    cm.sendNext("好了，你需要收集相应数目的#b证书#k给我。");
                } else { // Otherwise, check for stage completed
                    var complete = eim.getProperty(curMap + "stageclear");
                    if (complete != null) { // Strage completed
                        cm.sendNext("缩地门已打开，现在可以到下一个关卡了。");
                        cm.dispose();
                    } else {
                        // Reply to player correct/incorrect response to the question they have been asked
                        var qstring = "member1st" + cm.getPlayer().getId();
						var qcompletestr = "member1stcom" + cm.getPlayer().getId();
                        var numcoupons = qanswers[parseInt(eim.getProperty(qstring))];
                        var qcorr = cm.itemQuantity(4001007);
						if(eim.getProperty(qcompletestr) != null) {
							cm.sendNext("祝贺你，我已经给你了通行证，请把通行证交给队长之后，帮助其它队友吧！");
							cm.dispose();
						} else if (numcoupons == qcorr) {
                            cm.sendNext("祝贺你，我已经给你了通行证，请把通行证交给队长之后，帮助其它队友吧！");
                            cm.gainItem(4001007, -numcoupons);
                            cm.gainItem(4001008, 1);
							eim.setProperty(qcompletestr, "done");
							cm.dispose();
                        } else
							var questionstring = "member1st" + cm.getPlayer().getId();
						    var thequestion = parseInt(eim.getProperty(questionstring));
                            cm.sendNext("你给我的证书数量和答案不对应，你的问题是：\r\n" + questions[thequestion]);
                    }
                }
            } else if (status == 1) {
                if (preamble == null) {
                    var qstring = "member1st" + cm.getPlayer().getId();
                    var question = parseInt(eim.getProperty(qstring));
                    cm.sendNextPrev(questions[question]);
                } else {
					var qstring = "member1st" + cm.getPlayer().getId();
                    var question = parseInt(eim.getProperty(qstring));
                    cm.sendNextPrev(questions[question]);
                    cm.dispose();
                }
            } else if (status == 2) { // Preamble completed
                eim.setProperty(pstring,"done");
                cm.dispose();
            }
        } // End first map scripts
    }else if (2 <= curMap && 4 >= curMap) {
        new Rectanglestages(cm);
    }else if (curMap == 5) { // Final stage
        var eim = cm.getPlayer().getEventInstance();
        if (eim.getProperty("5stageclear") == null) { //If no
            if (isLeader()) { // Leader
                if (cm.haveItem(4001008, 10)) {
                    // Clear stage
                    cm.sendNext("这里可以通过最后一个关卡，这里有很多凶猛的怪物，我衷心祝福你和你的组队能通过这项挑战。");
                    party = eim.getPlayers();
                    cm.gainItem(4001008, -10);
                    clear(5, eim, cm);
					cm.givePartyExp("KerningPQFinal");
                    cm.dispose();
                } else { // Not done yet
                    cm.sendNext("你好，欢迎来到第5阶段，到处走走，可能会发现很多凶猛的怪物，打败它们，获取通行证，再把他们交给我。记住，怪物可能比你强大很多，请小心一点，祝你通过这一关。");
                }
                cm.dispose();
            } else { // Members
                cm.sendNext("欢迎来到第5阶段，在地图上走走，你就会看见许多凶猛的怪物，打败他们获取他们身上的通行证，交给你们的组队长。");
                cm.dispose();
            }
        } else { // Give rewards and warp to bonus
            if (status == 0) {
                cm.sendNext("不敢相信！你和你的组队员们终于完成了所有挑战！做为奖励，我将送你一些东西，请确保你的消耗栏、其它栏、装备栏是否有一个栏目以上的空格？");
            } else if (status == 1) {
                getPrize(eim,cm);
                cm.dispose();
            }
        }
    } else { // No map found
        cm.sendNext("无效的地图。");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty(stage + "stageclear", "true");
    var map = eim.getMapInstance(cm.getPlayer().getMapId());
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
    map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));
    var mf = eim.getMapFactory();
    map = mf.getMap(103000800 + stage);
    var nextStage = eim.getMapInstance(103000800 + stage);
    var portal = nextStage.getPortal("next00");
    if (portal != null) {
        portal.setScriptName("kpq" + stage);
    }
}

function failstage(eim, cm) {
    var map = eim.getMapInstance(cm.getPlayer().getMapId());
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Failed"));
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/wrong_kor"));
}

function Rectanglestages (cm) {
    var eim = cm.getPlayer().getEventInstance();
    var nthtext;
    var nthobj;
    var nthverb;
    var nthpos;
    var curArray;
    var curCombo;
    var objset;
    if (curMap == 2) {
        nthtext = "2nd";
        nthobj = "ropes";
        nthverb = "hang";
        nthpos = "hang on the ropes too low";
        curArray = stage2Rects;
        curCombo = stage2combos;
        objset = [0,0,0,0];
    } else if (curMap == 3) {
        nthtext = "3rd";
        nthobj = "platforms";
        nthverb = "stand";
        nthpos = "stand too close to the edges";
        curArray = stage3Rects;
        curCombo = stage3combos;
        objset = [0,0,0,0,0];
    } else if (curMap == 4) {
        nthtext = "4th";
        nthobj = "barrels";
        nthverb = "stand";
        nthpos = "stand too close to the edges";
        curArray = stage4Rects;
        curCombo = stage4combos;
        objset = [0,0,0,0,0,0];
    }
    if (isLeader()) { // Check if player is leader
        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            if (preamble == null) { // first time talking.
                cm.sendNext("欢迎来到第 " + nthtext + " 关卡。 在我旁边你可能会看到很多绳子，让三名组队成员爬上绳子，找到正确的位置，就可以通过此关卡。");
                eim.setProperty("leader" + nthtext + "preamble","done");
                var sequenceNum = Math.floor(Math.random() * curCombo.length);
                eim.setProperty("stage" + nthtext + "combo", sequenceNum.toString());
                cm.dispose();
            } else {
				if(cm.getPlayer().getMap().getCharacters().size() != eim.getPlayerCount()) {
					cm.sendOk("在你开始之前，请确保所有的组队员都在这里。");
					cm.dispose();
					return;
				}
                var complete = eim.getProperty(curMap + "stageclear");
                if (complete != null) {
                    cm.sendNext("缩地门已打开，现在可以到下一个关卡了。");
                    cm.dispose();
                } else { // Check for people on ropes and their positions
                    var playersOnCombo = 0;
                    for (var i = 0; i < party.size(); i++) {
                        for (var y = 0; y < curArray.length; y++) {
                            if (curArray[y].contains(party.get(i).getPosition())) {
                                playersOnCombo++;
                                objset[y] = 1;
                                break;
                            }
                        }
                    }
                    if (playersOnCombo == 3) {
                        var combo = curCombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
                        var correctCombo = true;
                        for (i = 0; i < objset.length && correctCombo; i++)
                            if (combo[i] != objset[i])
                                correctCombo = false;
                        if (correctCombo) {
                            clear(curMap, eim, cm);
							cm.givePartyExp("KerningPQ" + nthtext);
                            cm.dispose();
                        } else { // Wrong
                            failstage(eim, cm);
                            cm.dispose();
                        }
                    } else {
                        cm.sendNext("你看起来好像没有发现正确的位置，别气馁，让组队成员在绳子上找到正确的位置。");
                        cm.dispose();
                    }
                }
            }
        } else {
            var complete = eim.getProperty(curMap + "stageclear");
            if (complete != null) {
                var target = eim.getMapInstance(103000800 + curMap);
                var targetPortal = target.getPortal("st00");
                cm.getPlayer().changeMap(target, targetPortal);
            }
            cm.dispose();
        }
    } else { // Not leader
        var complete = eim.getProperty(curMap.toString() + "stageclear");
        if (complete != null) {
            cm.sendNext("时间不多了，请快点到达下一个关卡。");
        } else {
            cm.sendNext("请让你的组队长和我谈话。");
        }
        cm.dispose();
    }
}

function isLeader(){
    if(cm.getParty() == null)
        return false;
    else
        return cm.isLeader();
}

function getPrize(eim,cm) {
    var itemSetSel = Math.random();
    var itemSet;
    var itemSetQty;
    var hasQty = false;
    if (itemSetSel < 0.3)
        itemSet = prizeIdScroll;
    else if (itemSetSel < 0.6)
        itemSet = prizeIdEquip;
    else if (itemSetSel < 0.9) {
        itemSet = prizeIdUse;
        itemSetQty = prizeQtyUse;
        hasQty = true;
    } else {
        itemSet = prizeIdEtc;
        itemSetQty = prizeQtyEtc;
        hasQty = true;
    }
    var sel = Math.floor(Math.random()*itemSet.length);
    var qty = 1;
    if (hasQty)
        qty = itemSetQty[sel];
    cm.gainItem(itemSet[sel], qty, true, true);
        cm.getPlayer().changeMap(eim.getMapInstance(103000805));
}