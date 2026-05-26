export interface DomainEvent {
  occurredOn: Date;
}

export class DomainEvents {
  private static handlers: Map<string, Array<(event: any) => void>> = new Map();

  static register(handler: (event: any) => void, eventClassName: string) {
    if (!this.handlers.has(eventClassName)) {
      this.handlers.set(eventClassName, []);
    }
    this.handlers.get(eventClassName)?.push(handler);
  }

  static dispatch(event: DomainEvent) {
    const eventClassName = event.constructor.name;
    if (this.handlers.has(eventClassName)) {
      const handlers = this.handlers.get(eventClassName);
      handlers?.forEach(handler => handler(event));
    }
  }

  static clearHandlers() {
    this.handlers.clear();
  }
}
