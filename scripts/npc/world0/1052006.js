var status = -1;
var zones = 0;
var cost = 1000;

function start() {
    cm.sendNext("��ã�������ƱԱ��");
    if (cm.isQuestStarted(2055) || cm.isQuestCompleted(2055))
        zones++;
    if (cm.isQuestStarted(2056) || cm.isQuestCompleted(2056))
        zones++;
    if (cm.isQuestStarted(2057) || cm.isQuestCompleted(2057))
        zones++;
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (zones == 0)
            cm.dispose();
        else {
            var selStr = "�����ȥ��Ҫ��Ʊ����Ʊ����ͨ���ұߵ�#p1052007#���Խ�ȥ����ʲôƱ��#b";
            for (var i = 0; i < zones; i++)
                selStr += "\r\n#L" + i + "#����B" + (i+1) + " (" + cost + "���)#l";
            cm.sendSimple(selStr);
        }
    } else if (status == 1) {
        if (cm.getMeso() < cost)
            cm.sendOk("��û���㹻�Ľ�ҡ�");
        else {
            cm.gainMeso(-cost);
			if(selection < 0 || selection > zones) {
				cm.getClient().disconnect(false, false);
				return;
			}
            cm.gainItem(4031036 + selection,1);
        }
        cm.dispose();
    }
}