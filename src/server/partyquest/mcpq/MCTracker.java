package server.partyquest.mcpq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MCTracker {

    static Logger log = LoggerFactory.getLogger(MCTracker.class);

    // TODO:
    // Add field-specific info
    // Add methods for calls from different files
    // Maybe write own version of FilePrinter?

    static final String PATH = "Reports/MCPQ.txt";

    public static void log(String msg) {
        System.out.println(msg);
        log.debug(msg);
    }
}  