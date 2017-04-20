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
/* JM from tha Streetz
	Victoria Road: Kerning City (103000000)
	
	Refining NPC: 
	* Gloves
	* Glove Upgrade
	* Claw
	* Claw Upgrade
	* Processed Wood/Screws

	* Note: JM by default is used as a Megaphone shop. To move this shop to Frederick in the FM,
	* following MySQL command:
	* UPDATE `shops` SET `npcid`='9030000' WHERE (`shopid`='0')
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;

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
        var selStr = "��~����Ѳ���̫���㲻�õ��ġ�������ʲô��#b"
        var options = new Array("��������","�ϳ�����","����ȭ��","�ϳ�ȭ��","�������");
        for (var i = 0; i < options.length; i++)
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        cm.sendSimple(selStr);
    }
    else if (status == 1 && mode == 1) {
        selectedType = selection;
        if (selectedType == 0){ //glove refine
            var selStr = "��...������ʲô���ף�#b";
            var gloves = new Array ("��������#k(�ȼ����� : 10, ����)#b","�ֶ�ָ����#k(�ȼ����� : 15, ����)#b","����ָ����#k(�ȼ����� : 15, ����)#b","�ڶ�ָ����#k(�ȼ����� : 15, ����)#b","��ͭ��������#k(�ȼ����� : 20, ����)#b","��ͭ��������#k(�ȼ����� : 25, ����)#b","������������#k(�ȼ����� : 30, ����)#b",
				"����׷������#k(�ȼ����� : 35, ����)#b","����������#k(�ȼ����� : 40, ����)#b","��������#k(�ȼ����� : 50, ����)#b","��ͭ��˿����#k(�ȼ����� : 60, ����)#b");
            for (var i = 0; i < gloves.length; i++)
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            equip = true;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 1){ //glove upgrade
            var selStr = "��...����ϳ�ʲô���ף�#b";
            var gloves = new Array ("﮿��������#k(�ȼ����� : 20, ����)#b","�ڷ�������#k(�ȼ����� : 20, ����)#b","﮿�������#k(�ȼ����� : 25, ����)#b",
				"�ھ�������#k(�ȼ����� : 25, ����)#b","����������#k(�ȼ����� : 30, ����)#b","�ƽ𱩷�����#k(�ȼ����� : 30, ����)#b","�Ͽ�׷������#k(�ȼ����� : 35, ����)#b","�ƽ�׷������#k(�ȼ����� : 35, ����)#b","�ƽ���������#k(�ȼ����� : 40, ����)#b",
				"����������#k(�ȼ����� : 40, ����)#b","��������#k(�ȼ����� : 50, ����)#b","��������#k(�ȼ����� : 5, ����)#b","������˿����#k(�ȼ����� : 60, ����)#b","�ƽ���˿����#k(�ȼ����� : 60, ����)#b");
            for (var i = 0; i < gloves.length; i++)
                selStr += "\r\n#L" + i + "# " + gloves[i] + "#l";
            equip = true;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 2){ //claw refine
            var selStr = "ȭ����Ͷ����ʱ�������ϵ�װ��������Ҫ�ö̵��ķ������ò�����ô����������ʲô����ȭ�ף�#b";
            var claws = new Array ("����ȭ��#k(�ȼ����� : 15, ����)#b","��ָͭ��#k(�ȼ����� : 20, ����)#b","����#k(�ȼ����� : 25, ����)#b","������ȭ#k(�ȼ����� : 30, ����)#b","��ͭ�ػ�ȭ��#k(�ȼ����� : 35, ����)#b","��������#k(�ȼ����� : 40, ����)#b","�����ּ�#k(�ȼ����� : 50, ����)#b");
            for (var i = 0; i < claws.length; i++){
                selStr += "\r\n#L" + i + "# " + claws[i] + "#l";
            }
            equip = true;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 3){ //claw upgrade
            var selStr = "ȭ����Ͷ����ʱ�������ϵ�װ��������Ҫ�ö̵��ķ������ò�����ô����������ʲô����ȭ�ף�#b";
            var claws = new Array ("﮿�ȭ��#k(�ȼ����� : 15, ����)#b","�ƽ�ȭ��#k(�ȼ����� : 15, ����)#b","����ָ��#k(�ȼ����� : 20, ����)#b","���ָ��#k(�ȼ����� : 20, ����)#b","﮿�ȭ#k(�ȼ����� : 30, ����)#b","���ȭ#k(�ȼ����� : 30, ����)#b",
			"���ػ�ȭ��#k(�ȼ����� : 35, ����)#b","���ػ�ȭ��#k(�ȼ����� : 35, ����)#b","��커��#k(�ȼ����� : 40, ����)#b","�����#k(�ȼ����� : 40, ����)#b","�ڻ���#k(�ȼ����� : 40, ����)#b","����ּ�#k(�ȼ����� : 50, ����)#b","����ʯ�ּ�#k(�ȼ����� : 50, ����)#b");
            for (var i = 0; i < claws.length; i++){
                selStr += "\r\n#L" + i + "# " + claws[i] + "#l";
            }
            equip = true;
            cm.sendSimple(selStr);
        }
        else if (selectedType == 4){ //material refine
            var selStr = "��˵���������ϣ���~������ʲô���ϣ�#b";
            var materials = new Array ("����֦��ľ��","��ľ����ľ��","����˿��");
            for (var i = 0; i < materials.length; i++){
                selStr += "\r\n#L" + i + "# " + materials[i] + "#l";
            }
            equip = false;
            cm.sendSimple(selStr);
        }
        if (equip)
            status++;
    }
    else if (status == 2 && mode == 1) {
        selectedItem = selection;
        if (selectedType == 4){ //material refine
            var itemSet = new Array (4003001,4003001,4003000);
            var matSet = new Array(4000003,4000018,new Array (4011000,4011001));
            var matQtySet = new Array (10,5,new Array (1,1));
            var costSet = new Array (0,0,0);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
		
        var prompt = "���ԣ���������һЩ#t" + item + "#s��Ҫ������Ҳ��ϣ��Ҹ�����ѷ�����ô�������������Σ�";
		
        cm.sendGetNumber(prompt,1,1,100)
    }
    else if (status == 3 && mode == 1) {
        if (equip)
        {
            selectedItem = selection;
            qty = 1;
        }
        else
            qty = selection;

        if (selectedType == 0){ //glove refine
            var itemSet = new Array(1082002,1082029,1082030,1082031,1082032,1082037,1082042,1082046,1082075,1082065,1082092);
            var matSet = new Array(4000021,new Array(4000021,4000018),new Array(4000021,4000015),new Array(4000021,4000020),new Array(4011000,4000021),new Array(4011000,4011001,4000021),new Array(4011001,4000021,4003000),new Array(4011001,4011000,4000021,4003000),new Array(4021000,4000014,4000021,4003000),new Array(4021005,4021008,4000030,4003000),new Array(4011007,4011000,4021007,4000030,4003000));
            var matQtySet = new Array(15,new Array(30,20),new Array(30,20),new Array(30,20),new Array(2,40),new Array(2,1,10),new Array(2,50,10),new Array(3,1,60,15),new Array(3,200,80,30),new Array(3,1,40,30),new Array(1,8,1,50,50));
            var costSet = new Array(1000,7000,7000,7000,10000,15000,25000,30000,40000,50000,70000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 1){ //glove upgrade
            var itemSet = new Array(1082033,1082034,1082038,1082039,1082043,1082044,1082047,1082045,1082076,1082074,1082067,1082066,1082093,1082094);
            var matSet = new Array(new Array(1082032,4011002),new Array(1082032,4021004),new Array(1082037,4011002),new Array(1082037,4021004),new Array(1082042,4011004),new Array(1082042,4011006),new Array(1082046,4011005),new Array(1082046,4011006),new Array(1082075,4011006),new Array(1082075,4021008),new Array(1082065,4021000),new Array(1082065,4011006,4021008),new Array(1082092,4011001,4000014),new Array(1082092,4011006,4000027));
            var matQtySet = new Array(new Array(1,1),new Array(1,1),new Array(1,2),new Array(1,2),new Array(1,2),new Array(1,1),new Array(1,3),new Array(1,2),new Array(1,4),new Array(1,2),new Array(1,5),new Array(1,2,1),new Array(1,7,200),new Array(1,7,150));
            var costSet = new Array (5000,7000,10000,12000,15000,20000,22000,25000,40000,50000,55000,60000,70000,80000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //claw refine
            var itemSet = new Array(1472001,1472004,1472007,1472008,1472011,1472014,1472018);
            var matSet = new Array(new Array(4011001,4000021,4003000),new Array(4011000,4011001,4000021,4003000),new Array(1472000,4011001,4000021,4003001),new Array(4011000,4011001,4000021,4003000),new Array(4011000,4011001,4000021,4003000),new Array(4011000,4011001,4000021,4003000),new Array(4011000,4011001,4000030,4003000));
            var matQtySet = new Array(new Array(1,20,5),new Array(2,1,30,10),new Array(1,3,20,30),new Array(3,2,50,20),new Array(4,2,80,25),new Array(3,2,100,30),new Array(4,2,40,35));
            var costSet = new Array(2000,3000,5000,15000,30000,40000,50000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //claw upgrade
            var itemSet = new Array (1472002,1472003,1472005,1472006,1472009,1472010,1472012,1472013,1472015,1472016,1472017,1472019,1472020);
            var matSet = new Array(new Array(1472001,4011002),new Array(1472001,4011006),new Array(1472004,4011001),new Array(1472004,4011003),new Array(1472008,4011002),new Array(1472008,4011003),new Array(1472011,4011004),new Array(1472011,4021008),new Array(1472014,4021000),new Array(1472014,4011003),new Array(1472014,4021008),new Array(1472018,4021000),new Array(1472018,4021005));
            var matQtySet = new Array (new Array(1,1),new Array(1,1),new Array(1,2),new Array(1,2),new Array(1,3),new Array(1,3),new Array(1,4),new Array(1,1),new Array(1,5),new Array(1,5),new Array(1,2),new Array(1,6),new Array(1,6));
            var costSet = new Array (1000,2000,3000,5000,10000,15000,20000,25000,30000,30000,35000,40000,40000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
		
        var prompt = "��˵������";
        if (qty == 1)
            prompt += "һ��#t" + item + "#?";
        else
            prompt += qty + " #t" + item + "#?";
			
        prompt += "����Ҫ�������Ʒ����ô����������#b";
		
        if (mats instanceof Array){
            for(var i = 0; i < mats.length; i++){
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        }
        else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
		
        if (cost > 0)
            prompt += "\r\n#i4031138# " + cost * qty + " ���";
		
        cm.sendYesNo(prompt);
    }
    else if (status == 4 && mode == 1) {
        var complete = true;
		
        if (cm.getMeso() < cost * qty)
        {
            cm.sendOk("����ȷ���Ƿ�����Ҫ����Ʒ���߱�����װ������û�пռ䡣")
        }
        else
        {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                {
                    if (matQty[i] * qty == 1)	
                        if (!cm.haveItem(mats[i]))
                            complete = false;
                        else
                        if (!cm.haveItem(mats[i],matQty[i] * qty)) complete=false;
                }
            }
            else 
            if (!cm.haveItem(mats,matQty * qty)) complete=false;
        }
			
        if (!complete)
            cm.sendOk("����ȷ���Ƿ�����Ҫ����Ʒ���߱�����װ������û�пռ䡣");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i] * qty);
                }
            }
            else
                cm.gainItem(mats, -matQty * qty);
            if (cost > 0)
                cm.gainMeso(-cost * qty);
            if (item == 4003000)//screws
                cm.gainItem(4003000, 15 * qty);
            else
                cm.gainItem(item, qty);
            cm.sendOk("�ã���Ķ����Ѿ������ˣ��ҵ����չ�Ȼ�����㿴������ô�����Ķ������´������ɡ�");
        }
        cm.dispose();
    }
}