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
/* Dark Lord
	Thief Job Advancement
	Victoria Road : Thieves' Hideout (103000003)
	Custom Quest 100009, 100011
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 410;

function start() {
    if (cm.getJobId() == 0) {
        actionx["1stJob"] = true;
        if (cm.getLevel() >= 10)
            cm.sendNext("��ô���������Ϊһ��#r����#k��?");
        else {
            cm.sendOk("��������Ϊ�����Ļ�,����ȼ�������10������,�������������������Ұ�!");
            cm.dispose();
        }
    } else if (cm.getLevel() >= 30 && cm.getJobId() == 400) {
        actionx["2ndJob"] = true;
        if (cm.haveItem(4031012))
            cm.sendNext("Ŷ������ƽ���ػ����ˣ���֪���������׾ٵ�ͨ�������ҳ������Ǹ�ǿ��ķ��������ðɣ������һ������ø���ǿ������֮ǰ������Ҫѡ��#b��ת����#k������·�����Ⲣ����һ�����׵��£�������������κ����⣬������ʱ���ҡ�");
        else if (cm.haveItem(4031011)){
            cm.sendOk("����ô����������Ҹ����#b�Ƽ���#k����#b����תְ�̹�#k,��˵��������#b��������#k��ͨ�����Ŀ��Ի��#b#z4031012##kȻ���ڻ������ҶԻ���");
            cm.dispose();
        } else
            cm.sendNext("���ѡ�������ǵ�.");
    } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 4 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
        actionx["3thJobI"] = true;
        cm.sendNext("�����ǳ��򵥡�����ֻ��Ҫ����ҵķ���ȡ�úڷ�Ȼ������������С�������֮ǰ����Ҫȥ#b��������آ�#k��#b���֮��#k�����ҵ��ҵķ����Ҵ������");
    } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
        cm.sendNext("�����ǳ��򵥡�����ֻ��Ҫ����ҵķ���ȡ�úڷ�Ȼ������������С�������֮ǰ����Ҫȥ#b��������آ�#k��#b���֮��#k�����ҵ��ҵķ����Ҵ������");
        cm.dispose();
    } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
        actionx["3thJobC"] = true;
        cm.sendNext("û�뵽����ô��Ͱѷ������ˡ���ô����ȡ�úڷ��˰ɣ��õ�,����Ͱ������������㡭��");
    } else if (cm.isQuestStarted(6141)) {
        cm.warp(910300000, 3);
    } else {
        cm.sendOk("���ѡ�������ǵ�.");
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
            cm.sendOk("�����㻹������������,����æ�����������Ұɣ��һ���������㡣");
        if (!(mode == 0 && type != 1)){
            cm.dispose();
            return;
        }
    }
    if (actionx["1stJob"]){
        if (status == 0)
            cm.sendYesNo("�����ڵ������ҿ��԰���ѵ���ɷ�������ô������ȷ������תְ��ʽ��");
        else if (status == 1){
            if (cm.canHold(2070000) && cm.canHold(1472061)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(400);
                    cm.gainItem(2070000, 500);
                    cm.gainItem(1472061, 1);
                    cm.resetStats();
                }
                cm.sendNext("��ϲ��תְ�ɹ���");
            } else {
                cm.sendNext("��û���㹻�ı����ռ�,����������������Ұɣ�");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("�����ڸ���һ��#bSP#k�������ڿ��Դ�#b���ܴ���#kѧϰ�����Ļ������ܡ�");
        else if (status == 3)
            cm.sendNextPrev("��ϲ��תְ�ɹ���");
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("��ת�����ܹ���Ϊ������ְ֧ҵ,ÿ��ְҵ���в�ͬ����ɫ����������˽�Ļ�,��ʱ���������ҡ�#b\r\n#L0#�����˽�̿͵���ɫ��\r\n#L1#�����˽����͵���ɫ��\r\n#L3#����ѡ��ְҵ��");
            else
                cm.sendNext("�õġ��㿴�����ܼ��У���������Ȼ��Ҫ�������ʵ���Ƿ�ϸ񡣲��Բ�����̫�ѣ�����׼�����ܲ��԰ɣ������Ȱ�������պ�,��ҪŪ���ˡ�");
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031011)){
                    if(!cm.haveItem(4031011))
                        cm.gainItem(4031011, 1);
                    cm.sendNextPrev("���Ҹ����#b�Ƽ���#k����#b����תְ�̹�#k,��˵��������#b��������#k��ͨ�����Ŀ��Ի��#b#z4031012##kȻ���ڻ������ҶԻ���");
                } else {
                    cm.sendNext("��û���㹻�ı����ռ�,�޷��������������");
                    cm.dispose();
                }
            }else{
                if (selection < 3){
                    cm.sendNext("��δ��ɡ�");
                    status -= 2;
                } else
                    cm.sendSimple("�ð�!��ôѡ�������ǵ�ְҵ�ɡ�#b\r\n#L0#�̿�\r\n#L1#����");
            }
        } else if (status == 2){
            if (cm.haveItem(4031011)){
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("������ȷ�����з����ĵڶ���תְ��Ϊ" + (job == 410 ? "#b�̿�#k" : "#b����#k") + "��?");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.sendNext("��ϲ��תְ�ɹ����������Ѿ������" + (job == 410 ? "#b�̿�#k" : "#b����#k") + "���ܴ��ڡ�");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�������Ѿ������" + (job == 410 ? "�̿�" : "����") + "���ܴ��ڡ�ͬʱ������HP�����MPҲ�����ˡ���");
        else if (status == 5)
            cm.sendNextPrev("��������1��SP,�Ͻ�ȥѧϰ���ܰɡ�Ҫ��ס��Щ����ֻ������ѧ������������֮����ܵõ���");
        else if (status == 6)
            cm.sendNextPrev((job == 410 ? "�̿�" : "����") + "���ס���㲻�����ü��ܣ���ȷ��ʹ����ǿ�����������Ϊ��������˵����ȷ����ʹ�������ķ����൱�����ѡ��������ø���ǿ���Ժ����ҵ��ҡ��һ����ġ�");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("�ҵķ��������������ʹ��������⼼�ܣ�Ȼ����ð�ռ��ǲ��ܳ���ͣ��������ͨ����������Ҫ���Ǿ����������ף��...���ˣ��һ��ڴ����#b#t4031059##k������");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}