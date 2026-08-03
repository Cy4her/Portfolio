package KW.CH08;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Browser-only launcher.
 *
 * Installs the browser console before loading the unchanged main class.
 */
public final class BrowserLauncher {

    private BrowserLauncher() {
        // Utility class.
    }

    public static void main(String[] args) {
        try {
            /*
             * Install browser streams before KW.CH08.main is loaded.
             */
            BrowserConsole.install();

            /*
             * Load your unchanged original main class afterward.
             */
            Class<?> originalMainClass =
                Class.forName(
                    "KW.CH08.main",
                    true,
                    BrowserLauncher.class.getClassLoader()
                );

            Method originalMainMethod =
                originalMainClass.getMethod(
                    "main",
                    String[].class
                );

            /*
             * Execute:
             *
             * KW.CH08.main.main(args)
             */
            originalMainMethod.invoke(
                null,
                (Object) args
            );

        } catch (InvocationTargetException exception) {
            Throwable originalCause = exception.getCause();

            if (originalCause != null) {
                originalCause.printStackTrace();
            } else {
                exception.printStackTrace();
            }

        } catch (ReflectiveOperationException exception) {
            System.err.println(
                "[BrowserLauncher]: Could not start KW.CH08.main."
            );

            exception.printStackTrace();
        }
    }
}