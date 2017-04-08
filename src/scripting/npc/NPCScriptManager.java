/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation version 3 as published by
 the Free Software Foundation. You may not use, modify or distribute
 this program under any other version of the GNU Affero General Public
 License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package scripting.npc;

import client.MapleCharacter;
import client.MapleClient;

import java.lang.reflect.UndeclaredThrowableException;
import java.util.HashMap;
import java.util.Map;

import javax.script.Invocable;
import javax.script.ScriptException;

import scripting.AbstractScriptManager;
import server.life.MapleLifeFactory;
import tools.FilePrinter;
import tools.MaplePacketCreator;

/**
 *
 * @author Matze
 */
public class NPCScriptManager extends AbstractScriptManager {

    private Map<MapleClient, NPCConversationManager> cms = new HashMap<>();
    private Map<MapleClient, Invocable> scripts = new HashMap<>();
    private static NPCScriptManager instance = new NPCScriptManager();

    public synchronized static NPCScriptManager getInstance() {
        return instance;
    }

    public void start(MapleClient c, int npc, MapleCharacter chr) {
        start(c, npc, null, chr);
    }

    public void start(MapleClient c, int npc, String fileName, MapleCharacter chr) {
        try {
            c.getPlayer().dropMessage("正在进行和" + npc + "的对话。");
            NPCConversationManager cm = new NPCConversationManager(c, npc, fileName);
            if (cms.containsKey(c)) {
                dispose(c);
            }
            if (c.canClickNPC()) {
                cms.put(c, cm);
                Invocable iv = null;
                if (fileName != null) {
                    iv = getInvocable("npc/world" + c.getWorld() + "/" + fileName + ".js", c);
                }
                if (iv == null) {
                    iv = getInvocable("npc/world" + c.getWorld() + "/" + npc + ".js", c);
                }
                if (iv == null) {
                    FilePrinter.printError(FilePrinter.NPC_UNCODED, "NPC " + MapleLifeFactory.getNPC(npc).getName() + "(" + npc + ") is not coded.\r\n");
                }
                if (iv == null || NPCScriptManager.getInstance() == null) {
                    cm.sendOk("在下与你无话可说。\r\n记住，我是: #r" + npc + "#k.");
                    cm.dispose();
                    return;
                }
                engine.put("cm", cm);
                scripts.put(c, iv);
                c.setClickedNPC();
                try {
                    iv.invokeFunction("start");
                } catch (final NoSuchMethodException nsme) {
                    try {
                        iv.invokeFunction("start", chr);
                    } catch (final NoSuchMethodException nsma) {
                        nsma.printStackTrace();
                    }
                }
            } else {
                c.announce(MaplePacketCreator.enableActions());
            }
        } catch (final UndeclaredThrowableException | ScriptException ute) {
            FilePrinter.printError(FilePrinter.NPC + npc + ".txt", ute);
            dispose(c);
        } catch (final Exception e) {
            FilePrinter.printError(FilePrinter.NPC + npc + ".txt", e);
            dispose(c);
        }
    }

    public void action(MapleClient c, byte mode, byte type, int selection) {
        Invocable iv = scripts.get(c);
        if (iv != null) {
            try {
                c.setClickedNPC();
                iv.invokeFunction("action", mode, type, selection);
            } catch (ScriptException | NoSuchMethodException t) {
                if (getCM(c) != null) {
                    FilePrinter.printError(FilePrinter.NPC + getCM(c).getNpc() + ".txt", t);
                }
                dispose(c);
            }
        }
    }

    public void dispose(NPCConversationManager cm) {
        MapleClient c = cm.getClient();
        cms.remove(c);
        scripts.remove(c);
        
        if(cm.getScriptName() != null) {
            resetContext("npc/world" + c.getWorld() + "/" + cm.getScriptName() + ".js", c);
        } else {
            resetContext("npc/world" + c.getWorld() + "/" + cm.getNpc() + ".js", c);
        }
    }

    public void dispose(MapleClient c) {
        if (cms.get(c) != null) {
            dispose(cms.get(c));
        }
    }

    public NPCConversationManager getCM(MapleClient c) {
        return cms.get(c);
    }

}
