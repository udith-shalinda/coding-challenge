import dynamoose from 'dynamoose'

// Configure DynamoDB for cloud (AWS environment)
const ddb = new dynamoose.aws.ddb.DynamoDB()
dynamoose.aws.ddb.set(ddb)

// Define Task Schema
const taskSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Number,
    default: () => Date.now(),
  },
  fileUrl: {
    type: String,
    required: false,
  },
})

// Export Task Model
export const TaskModel = dynamoose.model(process.env.TASK_TABLE, taskSchema)
