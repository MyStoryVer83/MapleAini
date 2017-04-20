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
/* Francois
	Victoria Island: Ellinia (101000000)
	
	Refining NPC: (magicians)
	* Gloves
	* Glove Upgrades
	* Hats
	* Wand
	* Staff
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        cm.dispose();
    if (status == 0 && mode == 1) {
        var selStr = "��ѽ���ⲻ���ǻ������������ѡ���...#b"
        var options = new Array("��������","���׺ϳ�","ñ�Ӻϳ�","��������","��������");
        for (var i = 0; i < options.length; i++){
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
			
        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0){ //glove refine
            var selStr = "Ҫ�������ռ����ֲ��ϣ�����ħ�����������ס�������ʲô�������ף�#b";
            var items = new Array ("ħ������#k(�ȼ����� : 15, ħ��ʦ)#b","��ɫ÷������#k(�ȼ����� : 20, ħ��ʦ)#b","����������#k(�ȼ����� : 25, ħ��ʦ)#b","���ػ�����#k(�ȼ����� : 30, ħ��ʦ)#b","����ʥ����#k(�ȼ����� : 35, ħ��ʦ)#b","�쾫������#k(�ȼ����� : 40, ħ��ʦ)#b",
				"��Ԫ������#k(�ȼ����� : 50, ħ��ʦ)#b","������ӡ����#k(�ȼ����� : 60, ħ��ʦ)#b");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 1){ //glove upgrade
            var selStr = "��...����ϳ�ʲô�������ף�#b";
            var items = new Array ("��ɫ÷������#k(�ȼ����� : 20, ħ��ʦ)#b","��ɫ÷������#k(�ȼ����� : 20, ħ��ʦ)#b","����������#k(�ȼ����� : 25, ħ��ʦ)#b","����������#k(�ȼ����� : 25, ħ��ʦ)#b","���ػ�����#k(�ȼ����� : 30, ħ��ʦ)#b","���ػ�����#k(�ȼ����� : 30, ħ��ʦ)#b",
                "����ʥ����#k(�ȼ����� : 35, ħ��ʦ)#b","����ʥ����#k(�ȼ����� : 35, ħ��ʦ)#b","����������#k(�ȼ����� : 40, ħ��ʦ)#b","�ھ�������#k(�ȼ����� : 40, ħ��ʦ)#b","��Ԫ������#k(�ȼ����� : 50, ħ��ʦ)#b","��Ԫ������#k(�ȼ����� : 50, ħ��ʦ)#b",
                "�ƽ��ӡ����#k(�ȼ����� : 60, ħ��ʦ)#b","�ڷ�ӡ����#k(�ȼ����� : 60, ħ��ʦ)#b");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 2){ //hat upgrade
            var selStr = "��...����ϳ�ʲô����ñ�ӣ�#b";
            var items = new Array ("����ո���ͷ��#k(�ȼ����� : 30, ħ��ʦ)#b","�����ͷ��#k(�ȼ����� : 30, ħ��ʦ)#b");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 3){ //wand refine
            var selStr = "Ҫ�������ռ����ֲ��ϣ��Ҿ���ħ�����������ȡ�������ʲô���Ķ��ȣ�#b";
            var items = new Array ("ľ�ƶ���#k(�ȼ����� : 8, ����)#b","�߼�ľ�ƶ���#k(�ȼ����� : 13, ����)#b","��������#k(�ȼ����� : 18, ����)#b","��������#k(�ȼ����� : 23, ħ��ʦ)#b","﮿����#k(�ȼ����� : 28, ħ��ʦ)#b",
                "��ʦ����#k(�ȼ����� : 33, ħ��ʦ)#b","��������#k(�ȼ����� : 38, ħ��ʦ)#b","��ħ��ʦ����#k(�ȼ����� : 48, ħ��ʦ)#b");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
        else if (selectedType == 4){ //staff refine
            var selStr = "Ҫ�������ռ����ֲ��ϣ��Ҿ���ħ�����������ȡ�������ʲô���ĳ��ȣ�#b";
            var items = new Array ("ľ�Ƴ���#k(�ȼ����� : 10, ħ��ʦ)#b","����ʯ����#k(�ȼ����� : 15, ħ��ʦ)#b","��ĸԵ����#k(�ȼ����� : 15, ħ��ʦ)#b","��������#k(�ȼ����� : 20, ħ��ʦ)#b","��ʦ����#k(�ȼ����� : 25, ħ��ʦ)#b",
                "���鳤��#k(�ȼ����� : 45, ħ��ʦ)#b");
            for (var i = 0; i < items.length; i++){
                selStr += "\r\n#L" + i + "# " + items[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;

        if (selectedType == 0){ //glove refine
            var itemSet = new Array(1082019,1082020,1082026,1082051,1082054,1082062,1082081,1082086);
            var matSet = new Array(4000021,new Array(4000021,4011001),new Array(4000021,4011006),new Array(4000021,4021006,4021000),new Array(4000021,4011006,4011001,4021000),
                new Array(4000021,4021000,4021006,4003000),new Array(4021000,4011006,4000030,4003000),new Array(4011007,4011001,4021007,4000030,4003000));
            var matQtySet = new Array(15,new Array(30,1),new Array(50,2),new Array(60,1,2),new Array(70,1,3,2),new Array(80,3,3,30),new Array(3,2,35,40),new Array(1,8,1,50,50));
            var costSet = new Array(7000,15000,20000,25000,30000,40000,50000,70000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 1){ //glove upgrade
            var itemSet = new Array(1082021,1082022,1082027,1082028,1082052,1082053,1082055,1082056,1082063,1082064,1082082,1082080,1082087,1082088);
            var matSet = new Array(new Array(1082020,4011001),new Array(1082020,4021001),new Array(1082026,4021000),new Array(1082026,4021008),new Array(1082051,4021005),
                new Array(1082051,4021008),new Array(1082054,4021005),new Array(1082054,4021008),new Array(1082062,4021002),new Array(1082062,4021008),
                new Array(1082081,4021002),new Array(1082081,4021008),new Array(1082086,4011004,4011006),new Array(1082086,4021008,4011006));
            var matQtySet = new Array(new Array(1,1),new Array(1,2),new Array(1,3),new Array(1,1),new Array(1,3),new Array(1,1),new Array(1,3),new Array(1,1),new Array(1,4),
                new Array(1,2),new Array(1,5),new Array(1,3),new Array(1,3,5),new Array(1,2,3));
            var costSet = new Array (20000,25000,30000,40000,35000,40000,40000,45000,45000,50000,55000,60000,70000,80000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //hat upgrade
            var itemSet = new Array(1002065,1002013);
            var matSet = new Array(new Array(1002064,4011001),new Array(1002064,4011006));
            var matQtySet = new Array(new Array(1,3),new Array(1,3));
            var costSet = new Array(40000,50000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //wand refine
            var itemSet = new Array (1372005,1372006,1372002,1372004,1372003,1372001,1372000,1372007);
            var matSet = new Array(4003001,new Array(4003001,4000001),new Array(4011001,4000009,4003000),new Array(4011002,4003002,4003000),new Array(4011002,4021002,4003000),
                new Array(4021006,4011002,4011001,4003000),new Array(4021006,4021005,4021007,4003003,4003000),new Array(4011006,4021003,4021007,4021002,4003002,4003000));
            var matQtySet = new Array (5,new Array(10,50),new Array(1,30,5),new Array(2,1,10),new Array(3,1,10),new Array(5,3,1,15),new Array(5,5,1,1,20),new Array(4,3,2,1,1,30));
            var costSet = new Array (1000,3000,5000,12000,30000,60000,120000,200000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 4){ //staff refine
            var itemSet = new Array (1382000,1382003,1382005,1382004,1382002,1382001);
            var matSet = new Array(4003001,new Array(4021005,4011001,4003000),new Array(4021003,4011001,4003000),new Array(4003001,4011001,4003000),
                new Array(4021006,4021001,4011001,4003000),new Array(4011001,4021006,4021001,4021005,4003000,4000010,4003003));
            var matQtySet = new Array (5,new Array(1,1,5),new Array(1,1,5),new Array(50,1,10),new Array(2,1,1,15),new Array(8,5,5,5,30,50,1));
            var costSet = new Array (2000,2000,2000,5000,12000,180000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
		
        var prompt = "������һ��#t" + item + "#������Ҫ����ĵ��ߡ���ô����������#b";

        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] + " #t" + mats[i] + "#";
            }
        }
        else {
            prompt += "\r\n#i"+mats+"# " + matQty + " #t" + mats + "#";
        }
		
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost + " ���";
		
        cm.sendYesNo(prompt);
    }
    else if (status == 3 && mode == 1) {
        var complete = true;
        if (cm.getMeso() < cost)
        {
            cm.sendOk("����ȷ���Ƿ�����Ҫ����Ʒ���߱�����װ������û�пռ䡣")
        }
        else
        {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                {
                    if (matQty[i] == 1)	{
                        if (!cm.haveItem(mats[i]))
                        {
                            complete = false;
                        }
                    }
                    else {

                        if (!cm.haveItem(mats[i],matQty[i])) complete=false;
                    }
                }
            }
            else {

                if (!cm.haveItem(mats,matQty)) complete=false;
            }
        }
			
        if (!complete)
            cm.sendOk("����ȷ���Ƿ�����Ҫ����Ʒ���߱�����װ������û�пռ䡣");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i]);
                }
            }
            else
                cm.gainItem(mats, -matQty);
					
            if (cost > 0)
                cm.gainMeso(-cost);
				
            cm.gainItem(item, 1);
            cm.sendOk("�ã���Ķ����Ѿ������ˣ��ҵ����չ�Ȼ�����㿴������ô�����Ķ������´������ɡ�");
        }
        cm.dispose();
    }
}