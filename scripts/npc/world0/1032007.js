var status = 0;
var cost = 5000;

function start() {
    cm.sendYesNo("��á�������ͷ����ƱԱ�������뿪��������ǰ�����������𣿴����￪�����ص���#b���֮��վ#k�ķ�ͧ#b������Ϊ��׼��ÿ15���ӳ���һ��#k����Ʊ��Ҫ#b"+cost+" ���#k.��ȷ��Ҫ����#b#t4031045##k?");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 0) {
            cm.sendNext("���б����������û������");
            cm.dispose();
            return;
        }
        status++;
        if(status == 1) {
            if (cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
                cm.dispose();
            } else {
                cm.sendOk("��ȷ������#b"+cost+" ���#k��? �������������ô��ϣ��������ı����Ƿ�����.");
                cm.dispose();
            }
        }
    }
}
