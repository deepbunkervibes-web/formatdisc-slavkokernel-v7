// src/kernel/runtime.ts
import { Manifest, Task } from './types';

export class KernelRuntime {
  private taskQueue: Task[] = [];

  async enqueueTask(task: Task): Promise<void> {
    this.taskQueue.push(task);
  }

  async dequeueTask(): Promise<Task | undefined> {
    return this.taskQueue.shift();
  }

  /**
   * The Runtime is the courtroom. It evaluates if a task is "deterministically legal".
   */
  async validateTask(task: Task, context: Manifest): Promise<boolean> {
    // 1. Basic type check
    if (!task.id || !task.execute) return false;

    // 2. Resource check (mock)
    console.log(`[Runtime] Validating Task ${task.id} against Epoch ${context.epoch}`);

    // 3. Right check (ACL bridge)
    // This would normally check if task.agent has the right to task.action in context
    
    return true;
  }
}
