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
/* Grendel the Really Old
	Magician Job Advancement
	Victoria Road : Magic Library (101000003)

	Custom Quest 100006, 100008, 100100, 100101
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 210;

function start() {
    if (cm.getJobId() == 0) {
        actionx["1stJob"] = true;
        if (cm.getLevel() >= 8)
            cm.sendNext("ħ��ʦ��Ȼ������.��������ħ����ǿ��...���ҿ������Ƿ��������...");
        else {
            cm.sendOk("����������ʻ����㹻��Ϊһ��#rħ��ʦ#k..");
            cm.dispose();
        }
    } else if (cm.getLevel() >= 30 && cm.getJobId() == 200) {
        actionx["2ndJob"] = true;
        if (cm.haveItem(4031012))
            cm.sendNext("Ŷ������ƽ���ػ����ˣ���֪���������׾ٵ�ͨ�������ҳ������Ǹ�ǿ���ħ��ʦ�����ðɣ������һ������ø���ǿ������֮ǰ������Ҫѡ��#b��תħ��ʦ#k������·�����Ⲣ����һ�����׵��£�������������κ����⣬������ʱ���ҡ�");
        else if (cm.haveItem(4031009)){
            cm.sendOk("����ô����������Ҹ����#b�Ƽ���#k����#bħ��ʦתְ�̹�#k,��˵��������#bħ�����ֱ���#k��ͨ�����Ŀ��Ի��#b#z4031012##kȻ���ڻ������ҶԻ���");
            cm.dispose();
        } else
            cm.sendNext("��Ľ���ʵ����̫�����ˡ�");
    } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 2 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
        actionx["3thJobI"] = true;
        cm.sendNext("�����ǳ��򵥡�����ֻ��Ҫ����ҵķ���ȡ�úڷ�Ȼ������������С�������֮ǰ����Ҫȥ#b����ɭ�֢�#k��#b���֮��#k�����ҵ��ҵķ����Ҵ������");
    } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
        cm.sendNext("�����ǳ��򵥡�����ֻ��Ҫ����ҵķ���ȡ�úڷ�Ȼ������������С�������֮ǰ����Ҫȥ#b����ɭ�֢�#k��#b���֮��#k�����ҵ��ҵķ����Ҵ������");
        cm.dispose();
    } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
        actionx["3thJobC"] = true;
        cm.sendNext("û�뵽����ô��Ͱѷ������ˡ���ô����ȡ�úڷ��˰ɣ��õ�,����Ͱ������������㡭��");
    } else {
        cm.sendOk("���ѡ�������ǵ�.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0)
        status -= 2;
    if (status == -1){
        start();
        return;
    } else if (mode != 1 || status == 7 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
        if (mode == 0 && status == 2 && type == 1)
            cm.sendOk("�����㻹������������,����æ�����������Ұɣ��һ���������㡣");
        if (!(mode == 0 && type == 0)){
            cm.dispose();
            return;
        }
    }
    if (actionx["1stJob"]){
        if (status == 0)
            cm.sendYesNo("�����ڵ������ҿ��԰���ѵ����ħ��ʦ����ô������ȷ������תְ��ʽ��");
        else if (status == 1){
            if (cm.canHold(1372043)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(200);
                    cm.gainItem(1372043, 1);
                    cm.resetStats();
                }
                cm.sendNext("��ϲ��תְ�ɹ���");
            } else {
                cm.sendNext("��û���㹻�ı����ռ�,����������������Ұɣ�");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("�����ڸ���һ��#bSP#k�������ڿ��Դ�#b���ܴ���#kѧϰħ��ʦ�Ļ������ܡ�");
        else if (status == 3)
            cm.sendNextPrev("��ϲ��תְ�ɹ���");
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("��תħ��ʦ�ܹ���Ϊ������ְ֧ҵ,ÿ��ְҵ���в�ͬ����ɫ����������˽�Ļ�,��ʱ���������ҡ�#b\r\n#L0#�����˽ⷨʦ(��/��)����ɫ��\r\n#L1#�����˽ⷨʦ(��/��)����ɫ��\r\n#L2#�����˽���ʦ����ɫ��\r\n#L3#����ѡ��ְҵ��");
            else
                cm.sendNext("�õġ��㿴�����ܼ��У���������Ȼ��Ҫ�������ʵ���Ƿ�ϸ񡣲��Բ�����̫�ѣ�����׼�����ܲ��԰ɣ������Ȱ�������պ�,��ҪŪ���ˡ�");
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031009)){
                    if(!cm.haveItem(4031009))
                        cm.gainItem(4031009, 1);
                    cm.sendNextPrev("���Ҹ����#b�Ƽ���#k����#bħ��ʦתְ�̹�#k,��˵��������#bħ�����ֱ���#k��ͨ�����Ŀ��Ի��#b#z4031012##kȻ���ڻ������ҶԻ���");
                } else {
                    cm.sendNext("��û���㹻�ı����ռ�,�޷��������������");
                    cm.dispose();
                }
            }else{
                if (selection < 3){
                    cm.sendNext("��δ��ɡ�");
                    status -= 2;
                } else
                    cm.sendSimple("�ð�!��ôѡ�������ǵ�ְҵ�ɡ�#b\r\n#L0#��ʦ(��/��)\r\n#L1#��ʦ(��/��)\r\n#L2#��ʦ");
            }
        } else if (status == 2){
            if (cm.haveItem(4031009)){
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("������ȷ������ħ��ʦ�ĵڶ���תְ��Ϊ" + (job == 210 ? "#b��ʦ(��/��)#k" : job == 220 ? "#b��ʦ(��/��)#k" : "#b��ʦ#k") + "��?");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.sendNext("��ϲ��תְ�ɹ����������Ѿ������" + (job == 210 ? "#b��ʦ(��/��)#k" : job == 220 ? "#b��ʦ(��/��)#k" : "#b��ʦ#k") + "���ܴ��ڡ�");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�������Ѿ������" + (job == 210 ? "��ʦ(��/��)" : job == 220 ? "��ʦ(��/��)" : "��ʦ") + "���ܴ��ڡ�ͬʱ������HP�����MPҲ�����ˡ���");
        else if (status == 5)
            cm.sendNextPrev("��������1��SP,�Ͻ�ȥѧϰ���ܰɡ�Ҫ��ס��Щ����ֻ������ѧ������������֮����ܵõ���");
        else if (status == 6)
            cm.sendNextPrev((job == 210 ? "��ʦ(��/��)" : job == 220 ? "��ʦ(��/��)" : "��ʦ") + "���ס���㲻�����ü��ܣ���ȷ��ʹ����ǿ�����������Ϊ��������˵����ȷ����ʹ�������ķ����൱�����ѡ��������ø���ǿ���Ժ����ҵ��ҡ��һ����ġ�");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
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