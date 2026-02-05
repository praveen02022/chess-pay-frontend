import { type StateCreator } from 'zustand';

interface LoggerConfig {
  name?: string;
  enabled?: boolean;
  collapsed?: boolean;
  diff?: boolean;
  timestamp?: boolean;
  colors?: {
    title?: string;
    prevState?: string;
    action?: string;
    nextState?: string;
    error?: string;
  };
}

const defaultConfig: LoggerConfig = {
  name: 'zustand',
  enabled: true,
  collapsed: false,
  diff: true,
  timestamp: true,
  colors: {
    title: '#4CAF50',
    prevState: '#9E9E9E',
    action: '#2196F3',
    nextState: '#4CAF50',
    error: '#F44336',
  },
};

export const logger = <T extends Record<string, unknown>>(
  initializer: StateCreator<T>,
  name?: string
): StateCreator<T> => {
  const config = { ...defaultConfig, name: name || defaultConfig.name };

  return (set, get, store) => {
    const loggedSet: typeof set = (partial, replace) => {
      if (!config.enabled) {
        return set(partial, replace as false | undefined);
      }

      const prevState = get();
      const start = performance.now();

      let action = 'setState';
      if (typeof partial === 'function') {
        action = partial.name || 'anonymous function';
      } else {
        action = 'direct setState';
      }

      const result = set(partial, replace as false | undefined);
      const nextState = get();
      const end = performance.now();

      logStateChange<T>({
        config,
        prevState,
        nextState,
        action,
        timestamp: Date.now(),
        duration: end - start,
      });

      return result;
    };

    return initializer(loggedSet, get, store);
  };
};

function logStateChange<T extends Record<string, unknown>>({
  config,
  prevState,
  nextState,
  action,
  timestamp,
  duration,
}: {
  config: LoggerConfig;
  prevState: T;
  nextState: T;
  action: string;
  timestamp: number;
  duration: number;
}) {
  const time = config.timestamp ? new Date(timestamp).toISOString() : '';
  // const title = `${config.name} ${action} ${time} (${duration.toFixed(2)}ms)`;

  if (config.collapsed) {
    console.groupCollapsed(
      `${config.name} ${action} ${time} (${duration.toFixed(2)}ms)`
    );
  } else {
    console.group(
      `${config.name} ${action} ${time} (${duration.toFixed(2)}ms)`
    );
  }

  if (config.diff) {
    // const changes = diff(prevState, nextState);
    diff(prevState, nextState);
  }
}

function diff<T extends Record<string, unknown>>(
  prev: T,
  next: T
): Record<keyof T, { from: unknown; to: unknown }> {
  const changes: Partial<Record<keyof T, { from: unknown; to: unknown }>> = {};

  const allKeys = new Set([...Object.keys(prev), ...Object.keys(next)] as Array<
    keyof T
  >);

  for (const key of allKeys) {
    const prevVal = prev[key];
    const nextVal = next[key];

    if (prevVal !== nextVal) {
      changes[key] = { from: prevVal, to: nextVal };
    }
  }

  return changes as Record<keyof T, { from: unknown; to: unknown }>;
}
