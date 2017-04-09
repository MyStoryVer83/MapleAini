var status = 0;
var maps = [100000000, 102000000, 101000000, 103000000, 120000000];
var cost = [1000, 1000, 800, 1000, 800];
var selectedMap = -1;
var mesos;

function start() {
	if (cm.hasItem(4032313,1)) {
		cm.sendOk("�ҿ�������һ��ȥ���ִ���Ż݄���һ���Ҵ����ȥ��");
	} else {
		cm.sendNext("����~������������а͡����벻���ֿ���ְ�ȫ�ĵ��������ط�ȥ����ô��ʹ�����ǵĳ��⳵�ɡ��������Ͻ����͵�����ȥ�ĵط����۸�ܱ���Ŷ��");
	}
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("����������ﻹ�����Ư���ľ��㣬�������ȥ�����ط�����ӭ��ʱʹ�����ǵĳ��⳵����");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
        	if (cm.hasItem(4032313,1)) {
        		cm.gainItem(4032313, -1);
                cm.warp(maps[0], 0);
                cm.dispose();
                return;
        	}
            var selStr = "";
            if (cm.getJobId() == 0)
                selStr += "���ֿ�������#b9��#k�ļ۸��Żݡ�";
            selStr += "��ѡ�����Ŀ�ĵذɡ�����Ŀ�ĵز�ͬ������Ҳ������ͬ��#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + " ���)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("����������������Ѿ����������ȷ��Ҫȥ #b#m" + maps[selection] + "##k��Ʊ���� #b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " ���#k.");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getMeso() < (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection])) {
                cm.sendNext("�����û���㹻�Ľ�ң������Ļ����Ҳ���Ϊ���ṩ����");
                cm.dispose();
                return;
            }
            if (cm.getJobId() == 0) {
            	mesos = -cost[selectedMap] / 10;
            } else {
            	mesos = -cost[selectedMap];
            }
            cm.gainMeso(mesos);            
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}