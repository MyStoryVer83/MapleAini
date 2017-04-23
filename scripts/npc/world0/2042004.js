var MonsterCarnival = Packages.server.partyquest.mcpq.MonsterCarnival;
var MCTracker = Packages.server.partyquest.mcpq.MCTracker;
var MCParty = Packages.server.partyquest.mcpq.MCParty;
var MCField = Packages.server.partyquest.mcpq.MCField;
var MCTeam = Packages.server.partyquest.mcpq.MCField.MCTeam;

// NPC variables
var status = -1;
var carnival, field;
var room = -1;

function start() {
    if (!MonsterCarnival.isLobbyMap(cm.getMapId())) {
        MCTracker.log("������ �����зǷ��Ի������ڵ�ͼ��" + cm.getMapId() + " ��ң�" + cm.getName());
        cm.sendOk("�벻Ҫ���зǷ�������");
        cm.dispose();
        return;
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 1) status++;
    else status--;

    if (status == 0) {
        if (cm.getParty() == null) {
            cm.warp(MonsterCarnival.MAP_LOBBY);
            cm.dispose();
            return;
        }
        options = ["#L1#�뿪������� #r#e�����棺������õĻ�����ֹ�����й�����껪��#b#n.#l",
                   "#L2#ûʲô�£���Ҫ���м��껪��ս��#l"];
        if (cm.isLeader()) {
            options.unshift("#L0#�鿴���������ս#l");
        }

        text = "��ӭ����������껪������#r���� ��#k. ����Ϊ������ʲô��#b\r\n";
        for (var i = 0; i < options.length; i++) {
            text += options[i];
            text += "\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        field = cm.getChar().getMCPQField();
        if (selection == 0) {
            if (!cm.isLeader()) {
                cm.sendOk("���������Ӷӳ�����˵��.");
                cm.dispose();
                return;
            }
            if (!field.hasPendingRequests()) {
                cm.sendOk("Ŀǰû�д����������");
                cm.dispose();
                return;
            }
            cm.sendSimple(field.getNPCRequestString());
        } else if (selection == 1) {
            if (field != null) {
                field.deregister(true);
            } else {
                cm.warp(MonsterCarnival.MAP_EXIT);
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    } else if (status == 2) {
        var code = field.acceptRequest(selection);
        if (code == 1) {
            cm.sendOk("������ս��");
        } else {
            cm.sendOk("����δ֪����");
        }
        cm.dispose();
    }
}
