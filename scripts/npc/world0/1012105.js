/* Ms. Tan 
	Henesys Skin Change.
*/
var status = 0;
var skin = Array(0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendNext("��ӭ���٣���ӭ�����������ִ廤�����ġ����ǲ���ϣ��ӵ������һ�������������ļ����أ��������#b#t5153000##k���ǿ���Ϊ�㾫�Ļ����������������ǵ���������ô��Ҫ��Ҫ��һ�ԣ�");
    } else if (status == 1) {
        cm.sendStyle("���������⿪���Ļ����ɲ鿴�������Ч���ޣ��뻻��ʲô����Ƥ���أ���ѡ��", 5153000, skin);
    } else if (status == 2) {
		if (cm.haveItem(5153000)){
            cm.gainItem(5153000, -1);
            cm.setSkin(selection);
            cm.sendOk("�����,����������̾����·�ɫ��!");
        } else {
            cm.sendOk("�������㲢û�����ǵĻ�Ա��,�ҿ��²��ܸ��㻤��,�Һܱ�Ǹ");
        }
        cm.dispose();
    }
}