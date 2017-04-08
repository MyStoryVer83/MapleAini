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
/* Dances with Balrog
	Warrior Job Advancement
	Victoria Road : Warriors' Sanctuary (102000003)

	Custom Quest 100003, 100005
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 110;

function start() {
    if (cm.getJobId() == 0) {
        actionx["1stJob"] = true;
        if (cm.getLevel() >= 10)
            cm.sendNext("Do you wants to become a Warrior? You need to meet some criteria in orden to do so.#b You should be at least in level 10, with at least 35 in STR#k. Let's see...");
        else {
            cm.sendOk("Train a bit more and I can show you the way of the #rWarrior#k.");
            cm.dispose();
        }
    } else if (cm.getLevel() >= 30 && cm.getJobId() == 100) {
        actionx["2ndJob"] = true;
        if (cm.haveItem(4031012))
            cm.sendNext("I see you have done well. I will allow you to take the next step on your long road.");
        else if (cm.haveItem(4031008)){
            cm.sendOk("Go and see the #b#p1072000##k.");
            cm.dispose();
        } else
            cm.sendNext("The progress you have made is astonishing.");
    } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && (cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 1 && !cm.getPlayer().gotPartyQuestItem("JBP")))) {
        actionx["3thJobI"] = true;
        cm.sendNext("I was waiting for you. Few days ago, I heard about you from #b#p2020008##k in Ossyria. Well... I'd like to test your strength. There is a secret passage near the ant tunnel. Nobody but you can go into that passage. If you go into the passage, you will meat my the other self. Beat him and bring #b#t4031059##k to me.");
    } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
        cm.sendNext("Please, bring me the #b#t4031059##k.");
        cm.dispose();
    } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
        actionx["3thJobC"] = true;
        cm.sendNext("Wow... You beat my the other self and brought #b#t4031059##k to me. Good! this surely proves your strength. In terms of strength, you are ready to advance to 3th job. As I promised, I will give #b#t4031057##k to you. Give this necklace to #b#p2020008##k in Ossyria and you will be able to take second test of 3rd job advancement. Good Luck~");
    } else {
        cm.sendOk("You have chosen wisely.");
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
    } else if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJob"] && status == 1)){
        if (mode == 0 && status == 2 && type == 1)
            cm.sendOk("Make up your mind and visit me again.");
        if (!(mode == 0 && type != 1)){
            cm.dispose();
            return;
        }
    }
    if (actionx["1stJob"]){
        if (status == 0)
            cm.sendNextPrev("It is an important and final choice. You will not be able to turn back.");
        else if (status == 1){
            if (cm.canHold(1302077)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(100);
                    cm.gainItem(1302077, 1);
                    cm.resetStats();
                }
                cm.sendNext("From here on out, you are going to the (Incomplete)");
            } else {
                cm.sendNext("Make some room in your inventory and talk back to me.");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("You've gotten much stronger now. Plus every single one of your inventories have added slots. A whole row, to be exact. Go see for it yourself. I just gave you a little bit of #bSP#k. When you open up the #bSkill#k menu on the lower left corner of the screen, there are skills you can learn by using SP's. One warning, though: You can't raise it all together all at once. There are also skills you can acquire only after having learned a couple of skills first.");
        else if (status == 3)
            cm.sendNextPrev("One more warning. Once you have chosed you (Incomplete)");
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("Alright, when you have made your decision, click on [I'll choose my occupation] at the bottom.#b\r\n#L0#Please explain to me what being the Fighter is all about.\r\n#L1#Please explain to me what being the Page is all about.\r\n#L2#Please explain to me what being the Spearman is all about.\r\n#L3#I'll choose my occupation!");
            else
                cm.sendNext("Good decision. You look strong, but I need to see if you really are strong enough to pass the test, it's not a difficult test, so you'll do just fine. Here, take my letter first... make sure you don't lose it!");
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031008)){
                    if(!cm.haveItem(4031008))
                        cm.gainItem(4031008, 1);
                    cm.sendNextPrev("Please get this letter to #b#p1072000##k who's around #b#m102020300##k near Perion. He is taking care of the job of an instructor in place of me. Give him the letter and he'll test you in place of me. Best of luck to you.");
                } else {
                    cm.sendNext("Please, make some space in your inventory.");
                    cm.dispose();
                }
            }else{
                if (selection < 3){
                    cm.sendNext("Not done.");
                    status -= 2;
                } else
                    cm.sendSimple("Now... have you made up your mind? Please choose the job you'd like to select for your 2nd job advancement. #b\r\n#L0#Fighter\r\n#L1#Page\r\n#L2#Spearman");
            }
        } else if (status == 2){
            if (cm.haveItem(4031008)){
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("So you want to make the second job advancement as the " + (job == 110 ? "#bFighter#k" : job == 120 ? "#bPage#k" : "#bSpearman#k") + "? You know you won't be able to choose a different job for the 2nd job advancement once you make your desicion here, right?");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.sendNext("Alright, you're the " + (job == 110 ? "#bFighter#k" : job == 120 ? "#bPage#k" : "#bSpearman#k") + " from here on out. Hunters are the intelligent bunch with incredible vision, able to pierce the arrow through the heart of the monsters with ease... please train yourself each and everyday. We'll help you become even stronger than you already are.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("I have just given you a book that gives you the list of skills you can acquire as a " + (job == 110 ? "fighter" : job == 120 ? "page" : "spearman") + ". Also your etc inventory has expanded by adding another row to it. Your max HP and MP have increased, too. Go check and see for it yourself.");
        else if (status == 5)
            cm.sendNextPrev("I have also given you a little bit of #bSP#k. Open the #bSkill Menu#k located at the bottomleft corner. you'll be able to boost up the newer acquired 2nd level skills. A word of warning, though. You can't boost them up all at once. Some of the skills are only available after you have learned other skills. Make sure yo remember that.");
        else if (status == 6)
            cm.sendNextPrev((job == 110 ? "Fighter" : job == 120 ? "Page" : "Spearman") + " need to be strong. But remember that you can't abuse that power and use it on a weaking. Please use your enormous power the right way, because... for you to use that the right way, that is much harden than just getting stronger. Please find me after you have advanced much further. I'll be waiting for you.");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("My the other self is quite strong. He uses many special skills and you should fight with him 1 on 1. However, people cannot stay long in the secret passage, so it is important to beat him ASAP. Well... Good luck I will look forward to you bringing #b#t4031059##k to me.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}

/* 3th Job Part
	PORTAL 20 MINUTES.
 */