function start() {
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001)
        cm.sendYesNo("ͨ�� " + (cm.c.getPlayer().getMapId() == 103000100 ? "��Ҷ��" : "��������") + " �ĳ�Ʊ��Ҫ #b5000 ���#k. ���빺�� #b#t" + (4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000)) + "##k?");
    else if (cm.c.getPlayer().getMapId() == 600010002 || cm.c.getPlayer().getMapId() == 600010004)
        cm.sendYesNo("��Ҫ�³���");
}

function action(mode, type, selection) {
    if(mode != 1){
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001){
        if(cm.getMeso() >= 5000){
            cm.gainMeso(-5000);
            cm.gainItem(4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000), 1);
            cm.sendNext("����.");
        }else
            cm.sendNext("��B����.");
    }else{
        cm.warp(cm.c.getPlayer().getMapId() == 600010002 ? 600010001 : 103000100);
    }
    cm.dispose();
}