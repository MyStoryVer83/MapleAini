// Relevant Monster Carnival classes
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
    if (cm.getMapId() != 980000000) {
        MCTracker.log("���ݱ˵������зǷ��Ի������ڵ�ͼ��" + cm.getMapId() + " ��ң�" + cm.getName());
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
            cm.sendOk("��û����ӡ�");
            cm.dispose();
            return;
        } else if (!cm.isLeader()) {
            cm.sendOk("���������Ӷӳ�����˵��.");
            cm.dispose();
            return;
        }
        carnival = MonsterCarnival.getMonsterCarnival(cm.getChannel());
        cm.sendSimple(carnival.getNPCAvailableFields());
    } else if (status == 1) {
        room = selection;
        if (room < 1 || room > 6) {
            cm.sendOk("��Ч�ļ��껪ս����");
            cm.dispose();
            return;
        }
        var code = carnival.registerStatus(cm.getParty(), selection);
        if (code == MonsterCarnival.STATUS_FIELD_FULL) {
            cm.sendOk("��������Ѿ����ˡ�")
        } else if (code == MonsterCarnival.STATUS_PARTY_SIZE) {
            cm.sendOk("����ӵ�����������Ҫ��");
        } else if (code == MonsterCarnival.STATUS_PARTY_LEVEL) {
            cm.sendOk("��ȷ����������Ա�ȼ��Ƿ����Ҫ��");
        } else if (code == MonsterCarnival.STATUS_PARTY_MISSING) {
            cm.sendOk("��ȷ����������Ա����ͬһ����ͼ��");
        } else if (code == MonsterCarnival.STATUS_FIELD_INVALID) {
            cm.sendOk("δ����Ȩ������");
        }

        if (code == MonsterCarnival.STATUS_PROCEED) {
            field = carnival.getField(room);
            party = carnival.createParty(cm.getParty());
            field.register(party, MCTeam.RED);
            cm.sendOk("����3���ӵ�ʱ������������ս�ӵ���ս��");
        } else if (code == MonsterCarnival.STATUS_REQUEST) {
            cm.sendOk("������ս������" + room + "����ȴ��Է���ӽ��������ս��");
            field = carnival.getField(room);
            party = carnival.createParty(cm.getParty());
            field.request(party);
        }
        cm.dispose();
    }
}
