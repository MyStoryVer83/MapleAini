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
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Mano Spawner
-- Edited by --------------------------------------------------------------------------------------
	ThreeStep (based on xQuasar's King Clang spawner)
**/

importPackage(Packages.client);

function init() {
    scheduleNew();
}

function scheduleNew() {
    setupTask = em.schedule("start", 0);
}

function cancelSchedule() {
    if (setupTask != null)
        setupTask.cancel(true);
}

function start() {
    var thicketAroundTheBeach3 = em.getChannelServer().getMapFactory().getMap(104000400);
    var mano = Packages.server.life.MapleLifeFactory.getMonster(2220000);
    if(thicketAroundTheBeach3.getMonsterById(2220000) != null) {
		em.schedule("start", 3 * 60 *60 * 1000);
		return;
	}
	
	var posX;
    var posY = 455;
    posX =  Math.floor((Math.random() * 605) + 110);
    thicketAroundTheBeach3.spawnMonsterOnGroundBelow(mano, new Packages.java.awt.Point(posX, posY));
    thicketAroundTheBeach3.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(6, "A cool breeze was felt when Mano appeared."));
	em.schedule("start", 3 * 60 *60 * 1000);
}