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
package net.mina;

import client.MapleClient;
import constants.ServerConstants;
import java.util.concurrent.locks.Lock;
import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.codec.ProtocolEncoder;
import org.apache.mina.filter.codec.ProtocolEncoderOutput;
import tools.MapleAESOFB;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.GenericLittleEndianAccessor;
import net.SendOpcode;

public class MaplePacketEncoder implements ProtocolEncoder {

    @Override
    public void encode(final IoSession session, final Object message, final ProtocolEncoderOutput out) throws Exception {
        final MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);

        if (client != null) {
            final MapleAESOFB send_crypto = client.getSendCrypto();
            final byte[] input = (byte[]) message;
        if(ServerConstants.DEBUG){ //控制台输出封包 
                int packetLen = input.length;
                int pHeader = readFirstShort(input);
                String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
                String op = lookupRecv(pHeader);
                System.out.println("服务端发送 " + op + " [" + pHeaderStr + "] (" + packetLen + ")");
        }
            final byte[] unencrypted = new byte[input.length];
            System.arraycopy(input, 0, unencrypted, 0, input.length);
            final byte[] ret = new byte[unencrypted.length + 4];
            final byte[] header = send_crypto.getPacketHeader(unencrypted.length);
            MapleCustomEncryption.encryptData(unencrypted);

            final Lock mutex = client.getLock();
            mutex.lock();
            try {
                send_crypto.crypt(unencrypted);
                System.arraycopy(header, 0, ret, 0, 4);
                System.arraycopy(unencrypted, 0, ret, 4, unencrypted.length);
                out.write(IoBuffer.wrap(ret));
            } finally {
                mutex.unlock();
            }
//            System.arraycopy(unencrypted, 0, ret, 4, unencrypted.length);
//            out.write(ByteBuffer.wrap(ret));
        } else {
            out.write(IoBuffer.wrap(((byte[]) message)));
        }
    }

    @Override
    public void dispose(IoSession session) throws Exception {
    }
    
    private String lookupRecv(int val) {
        for (SendOpcode op : SendOpcode.values()) {
            if (op.getValue() == val) {
                return op.name();
            }
        }
        return "UNKNOWN";
    }
    
    private int readFirstShort(byte[] arr) {
        return new GenericLittleEndianAccessor(new ByteArrayByteStream(arr)).readShort();
    }    
}