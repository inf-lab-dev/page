import pc from 'picocolors';
import { LogOptions, ResolvedConfig } from 'vite';

/**
 * All registered loggers.
 */
const loggers = new Map<string, Logger>();

/**
 * A pre-configured logger that uses vite's format.
 */
export class Logger {
    /**
     * Creates a new instance.
     *
     * @param name the loggers name
     * @param config the vite config to do the actual logging
     */
    constructor(
        private readonly name: string,
        private readonly config: ResolvedConfig,
    ) {}

    /**
     * The prefix that will be rendered before all messages.
     */
    private get prefix() {
        return pc.cyan(`[${this.name}]`);
    }

    /**
     * Logs a success message.
     *
     * @param message the message
     * @param options options for the logging
     */
    public success(message: string, options?: LogOptions) {
        this.config.logger.info(`${this.prefix} ${pc.green(message)}`, options);
    }
}

/**
 * Gets or creates the logger by the given name.
 *
 * @param name the loggers name
 * @param config the config for the logger
 * @returns the logger
 */
export function getLogger(name: string, config: ResolvedConfig): Logger {
    if (!loggers.has(name)) {
        loggers.set(name, new Logger(name, config));
    }

    return loggers.get(name)!;
}
