// Most of the code is shamlessly copied from github.com/k15a/playgrounds/blob/master/packages/playgrounds-server/
// Thank you k15a for your work

import { EventEmitter } from "events";

export default class Queue {
  public worker: any;
  public running: boolean;
  public queue: any;
  public finishEvents: EventEmitter;

  constructor(worker: any) {
    this.worker = worker;
    this.running = false;
    this.queue = [];
    this.finishEvents = new EventEmitter();
  }

  has(value: any) {
    this.queue.includes(value);
  }

  async add(value: any, start?: any) {
    if (start) {
      this.queue.unshift(value);
    } else {
      this.queue.push(value);
    }

    this.execute();
    return await this.wait(value);
  }

  async wait(value: any) {
    return await new Promise(resolve => {
      this.finishEvents.once(value, resolve);
    });
  }

  async execute() {
    if (!this.running) {
      this.running = true;

      let current = null;
      // eslint-disable-next-line
      while ((current = this.queue.shift())) {
        const result = await this.worker(current);
        this.finishEvents.emit(current, result);
      }

      this.running = false;
    }
  }
}
