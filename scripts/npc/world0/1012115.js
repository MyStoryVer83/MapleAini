function start() {
    var status = cm.getQuestStatus(20706);
    if (status == 0) {
        cm.sendNext("普通的草丛。");
    } else if (status == 1) {
        cm.forceCompleteQuest(20706);
        cm.sendNext("发现个黑影一闪而过！");
    } else if (status == 2) {
        cm.sendNext("黑影已经不见了。先去告诉#p1103001#吧.");
    }
    cm.dispose();
}