import { queueManager } from './queueManager';
import { processJob } from './processJob';
import path from 'path';

// Use this snippet at the top of your file

/**
 * A function that tests the queue logic.
 *
 * @return {Promise<void>} A promise that resolves when the function finishes.
 */
export async function testQueueLogic() {
  const queueName = 'testQueue';
  const workerScriptPath = path.resolve(__dirname, '../workers/mockWorker.ts');
  const testQueue = queueManager.createQueue(queueName, workerScriptPath);

  // Mock job and task
  const job = 'testJob';
  const task = 'testTask';

  // Listen for job completed event
  const jobCompletedPromise = new Promise((resolve, reject) => {
    testQueue.on('completed', (job, result) => {
      resolve(result);
    });

    testQueue.on('failed', (job, err) => {
      console.error(`Job ${job.id} failed with error ${err}`);
      reject(err);
    });
  });

  // Process job
  await processJob(job, queueName, task);

  // Wait for the job to be completed or failed
  await jobCompletedPromise;
}

// Call the testing function
testQueueLogic().catch(console.error);
