	function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("���ϴ�֮����Ҫ�ɺܾò��ܵ���Ŀ�ĵء�������������м���Ҫ��Ļ������Ȱ�������꣬��ô������Ҫ�ϴ���");
        else{
            cm.sendOk("�ű�������������ϵ����Ա���.");
            cm.dispose();
        }
    }else{
        cm.sendOk("����ǰ������Ʊ.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
	if (mode <= 0) {
		cm.sendOk("Okay, talk to me if you change your mind!");
		cm.dispose();
		return;
    }
    cm.gainItem(4031045, -1);
    cm.warp(101000301);
    cm.dispose();
}	