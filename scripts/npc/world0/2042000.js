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
        MCTracker.log("与休彼德蔓进行非法对话。所在地图：" + cm.getMapId() + " 玩家：" + cm.getName());
        cm.sendOk("请不要进行非法操作。");
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
            cm.sendOk("你没有组队。");
            cm.dispose();
            return;
        } else if (!cm.isLeader()) {
            cm.sendOk("请让你的组队队长和我说话.");
            cm.dispose();
            return;
        }
        carnival = MonsterCarnival.getMonsterCarnival(cm.getChannel());
        cm.sendSimple(carnival.getNPCAvailableFields());
    } else if (status == 1) {
        room = selection;
        if (room < 1 || room > 6) {
            cm.sendOk("无效的嘉年华战场。");
            cm.dispose();
            return;
        }
        var code = carnival.registerStatus(cm.getParty(), selection);
        if (code == MonsterCarnival.STATUS_FIELD_FULL) {
            cm.sendOk("这个房间已经满了。")
        } else if (code == MonsterCarnival.STATUS_PARTY_SIZE) {
            cm.sendOk("你组队的人数不符合要求。");
        } else if (code == MonsterCarnival.STATUS_PARTY_LEVEL) {
            cm.sendOk("请确认你的组队组员等级是否符合要求。");
        } else if (code == MonsterCarnival.STATUS_PARTY_MISSING) {
            cm.sendOk("请确认你的组队组员都在同一个地图。");
        } else if (code == MonsterCarnival.STATUS_FIELD_INVALID) {
            cm.sendOk("未经授权的请求。");
        }

        if (code == MonsterCarnival.STATUS_PROCEED) {
            field = carnival.getField(room);
            party = carnival.createParty(cm.getParty());
            field.register(party, MCTeam.RED);
            cm.sendOk("你有3分钟的时间来接受其他战队的挑战。");
        } else if (code == MonsterCarnival.STATUS_REQUEST) {
            cm.sendOk("申请挑战到房间" + room + "。请等待对方组队接受你的挑战！");
            field = carnival.getField(room);
            party = carnival.createParty(cm.getParty());
            field.request(party);
        }
        cm.dispose();
    }
}
