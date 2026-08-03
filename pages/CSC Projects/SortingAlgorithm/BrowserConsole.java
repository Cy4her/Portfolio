package KW.CH08;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;

/**
 * Connects System.in, System.out, and System.err to the website.
 *
 * This class does not contain or replace any sorting logic.
 */
public final class BrowserConsole {

    private BrowserConsole() {
        // Utility class.
    }

    /*
     * These methods are implemented in sorting-demo.js through CheerpJ.
     */
    private static native String readLineFromBrowser();

    private static native void writeToBrowser(String text);

    private static native void writeErrorToBrowser(String text);

    /**
     * Install the browser-backed console streams.
     */
    public static void install() {
        System.setIn(new BrowserInputStream());

        System.setOut(
            new PrintStream(
                new BrowserOutputStream(false),
                true,
                StandardCharsets.UTF_8
            )
        );

        System.setErr(
            new PrintStream(
                new BrowserOutputStream(true),
                true,
                StandardCharsets.UTF_8
            )
        );
    }

    /**
     * Supplies lines typed into the website to Scanner(System.in).
     */
    private static final class BrowserInputStream extends InputStream {

        private byte[] currentLine = new byte[0];
        private int currentPosition = 0;
        private boolean endOfInput = false;

        private void requestNextLine() {
            /*
             * Your original code may use System.out.print without flush().
             * Flushing here makes the prompt visible before input is requested.
             */
            System.out.flush();
            System.err.flush();

            String input = readLineFromBrowser();

            if (input == null) {
                endOfInput = true;
                currentLine = new byte[0];
                currentPosition = 0;
                return;
            }

            currentLine = (input + "\n").getBytes(StandardCharsets.UTF_8);
            currentPosition = 0;
        }

        @Override
        public int read() {
            if (endOfInput) {
                return -1;
            }

            if (currentPosition >= currentLine.length) {
                requestNextLine();

                if (endOfInput) {
                    return -1;
                }
            }

            return currentLine[currentPosition++] & 0xFF;
        }

        @Override
        public int read(
                byte[] destination,
                int offset,
                int length
        ) throws IOException {

            if (destination == null) {
                throw new NullPointerException("destination");
            }

            if (
                offset < 0 ||
                length < 0 ||
                offset + length > destination.length
            ) {
                throw new IndexOutOfBoundsException();
            }

            if (length == 0) {
                return 0;
            }

            int firstByte = read();

            if (firstByte == -1) {
                return -1;
            }

            destination[offset] = (byte) firstByte;

            int copied = 1;

            while (
                copied < length &&
                currentPosition < currentLine.length
            ) {
                destination[offset + copied] =
                    currentLine[currentPosition];

                currentPosition++;
                copied++;
            }

            return copied;
        }
    }

    /**
     * Sends Java output to the terminal displayed on the webpage.
     */
    private static final class BrowserOutputStream extends OutputStream {

        private final boolean errorStream;

        private final ByteArrayOutputStream buffer =
            new ByteArrayOutputStream();

        private BrowserOutputStream(boolean errorStream) {
            this.errorStream = errorStream;
        }

        @Override
        public synchronized void write(int value) {
            buffer.write(value);

            if (value == '\n') {
                sendBufferedText();
            }
        }

        @Override
        public synchronized void write(
                byte[] data,
                int offset,
                int length
        ) {
            for (int index = offset; index < offset + length; index++) {
                buffer.write(data[index]);

                if (data[index] == '\n') {
                    sendBufferedText();
                }
            }
        }

        @Override
        public synchronized void flush() {
            sendBufferedText();
        }

        @Override
        public synchronized void close() {
            sendBufferedText();
        }

        private void sendBufferedText() {
            if (buffer.size() == 0) {
                return;
            }

            String text = new String(
                buffer.toByteArray(),
                StandardCharsets.UTF_8
            );

            buffer.reset();

            if (errorStream) {
                writeErrorToBrowser(text);
            } else {
                writeToBrowser(text);
            }
        }
    }
}