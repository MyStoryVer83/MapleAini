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

/*      Athena Pierce
	Bowman Job Advancement
	Victoria Road : Bowman Instructional School (100000201)
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 310;

function start() {
    if (cm.getJobId() == 0) {
        actionx["1stJob"] = true;
        if (cm.getLevel() >= 10)
            cm.sendNext("你真的想成为一名#r弓箭手#k吗?");
        else {
            cm.sendOk("你还需要更多的修炼,我才能告诉你怎样成为一名出色的#r弓箭手#k.");
            cm.dispose();
        }
    } else if (cm.getLevel() >= 30 && cm.getJobId() == 300) {
        actionx["2ndJob"] = true;
        if (cm.haveItem(4031012))
            cm.sendNext("哦……你平安地回来了！我知道你会轻而易举的通过……我承认你是个强大的弓箭手……好吧，现在我会让你变得更加强大…在这之前！你需要选择#b二转弓箭手#k的两个路径，这并不是一件容易的事，所以如果你有任何问题，可以随时问我。");
        else if (cm.haveItem(4031011)){
            cm.sendOk("你怎么还在这里？把我给你的#b推荐信#k交给#b弓箭手转职教官#k,据说他现在在#b迷宫通道#k。通过他的考试获得#b#z4031012##k然后在回来和我对话。");
            cm.dispose();
        } else
            cm.sendYesNo("嗯...自上次见到你以来，你已经有了很大的成长。怎么样？你想不想变得更加强大吗？通过一个简单的测试，我会让你变得更大强大。准备好开始了吗？");
    } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 3 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
        actionx["3thJobI"] = true;
        cm.sendNext("试炼非常简单……你只需要打败我的分身取得黑符然后回来交给就行。但在这之前你需要去#b森林迷宫Ⅴ#k的#b异界之门#k里面找到我的分身并且打败他。");
    } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
        cm.sendNext("试炼非常简单……你只需要打败我的分身取得黑符然后回来交给就行。但在这之前你需要去#b森林迷宫Ⅴ#k的#b异界之门#k里面找到我的分身并且打败他。");
        cm.dispose();
    } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
        actionx["3thJobC"] = true;
        cm.sendNext("没想到你这么快就把分身打败了。怎么样？取得黑符了吧？好的,我这就把力气项链给你……");
    } else {
        cm.sendOk("你的选择是明智的.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type != 1)
        status -= 2;
    if (status == -1){
        start();
        return;
    } else if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
        if (mode == 0 && status == 2 && type == 1)
            cm.sendOk("看来你还有其他的事情,等你忙完了在来找我吧！我会在这里等你。");
        if (!(mode == 0 && type != 1)){
            cm.dispose();
            return;
        }
    }
    if (actionx["1stJob"]){
        if (status == 0)
            cm.sendNextPrev("你现在的条件我可以把你训练成弓箭手。怎么样？你确定进行转职仪式吗？");
        else if (status == 1){
            if (cm.canHold(1452051) && cm.canHold(2060000)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(300);
					cm.gainItem(1452051, 1);
					cm.gainItem(2060000, 1000);
					cm.resetStats();
                }
                cm.sendNext("恭喜你转职成功。");
            } else {
                cm.sendNext("你没有足够的背包空间,等你整理好在来找我吧！");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("我现在给你一点#bSP#k。你现在可以打开#b技能窗口#k学习弓箭手的基础技能。");
		else
			cm.dispose();
	} else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("二转弓箭手总共分为两个分支职业,每种职业都有不同的特色。如果你想了解的话,随时可以来问我。#b\r\n#L0#我想了解猎人的特色。\r\n#L1#我想了解弩弓手的特色。\r\n#L2#我想选择职业。");
            else
                cm.sendNext("好的。你看起来很急切！但是我仍然需要测试你的实力是否合格。测试并不是太难，做好准备接受测试吧！……先把这封信收好,不要弄丢了。");
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031010)){
                    if (!cm.haveItem(4031010))
                        cm.gainItem(4031010, 1);
                    cm.sendNextPrev("把我给你的#b推荐信#k交给#b弓箭手转职教官#k,据说他现在在#b迷宫通道#k。通过他的考试获得#b#z4031012##k然后在回来和我对话。");
					cm.dispose();
				} else {
                    cm.sendNext("你没有足够的背包空间,无法进行下面的任务。");
                    cm.dispose();
                }
            } else {
                if (selection < 2){
                    cm.sendNext("尚未完成。");
                    status -= 2;
                } else
                    cm.sendSimple("好吧!那么选择你心仪的职业吧。#b\r\n#L0#猎人\r\n#L1#弩弓手");
            }
        } else if (status == 2){
            job += selection * 10;
            cm.sendYesNo("你现在确定进行战士的第二次转职成为" + (job == 310 ? "#b猎人#k" : "#b弩弓手#k") + "吗?");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.sendNext("恭喜你转职成功。你现在已经获得了" + (job == 310 ? "#b猎人#k" : "#b弩弓手#k") + "技能窗口。");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("你现在已经获得了" + (job == 310 ? "猎人" : "弩弓手") + "技能窗口。同时你的最大HP和最大MP也增加了……");
        else if (status == 5)
            cm.sendNextPrev("我送了你1点SP,赶紧去学习技能吧。要记住有些技能只有在你学会了其他技能之后才能得到。");
        else if (status == 6)
            cm.sendNextPrev((job == 310 ? "猎人" : "弩弓手") + "请记住，你不能滥用技能，正确的使用你强大的力量，因为…对你来说，正确掌握使用力量的方法相当的困难。请在你变得更加强大以后再找到我。我会等你的。");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("我的分身很厉害。他会使用许多特殊技能，然而，冒险家们不能长期停留在秘密通道，所以重要的是尽快击败他。祝你...好运，我会期待你带#b#t4031059##k来找我");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}