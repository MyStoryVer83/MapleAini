function start() {
    var status = cm.getQuestStatus(20705);
    if (status == 0) {
        cm.sendNext("��ͨ�Ĳݴԡ�");
    } else if (status == 1) {
        cm.forceCompleteQuest(20705);
        cm.sendNext("���ָ���Ӱһ��������");
    } else if (status == 2) {
        cm.sendNext("��Ӱ�Ѿ������ˡ���ȥ����#p1103001#��.");
    }
    cm.dispose();
}

function action(mode, type, selection) {
    cm.dispose();
}