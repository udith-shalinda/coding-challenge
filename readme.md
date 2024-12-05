# **Task Management API**

This project provides a **RESTful API** for managing tasks and fetching user data from an external API (JSONPlaceholder). It includes features such as **DynamoDB caching** with Time-To-Live (TTL), **rate limiting**, and **serverless deployment** on AWS.

---

## **Features**

1. **Task Management**:

   - Create, update, delete, and fetch tasks.
   - Task data stored in DynamoDB.

2. **User Data Fetching**:

   - Fetch user data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).
   - Cached in DynamoDB with a 5-minute TTL to reduce redundant API calls.

3. **Rate Limiting**:

   - Implemented using AWS API Gateway.

4. **Serverless Deployment**:
   - Fully deployable to AWS using the Serverless Framework.
   - Includes DynamoDB, S3, and Lambda.

---

## **Installation**

### **1. Prerequisites**

- **Node.js**: Version 20.
- **AWS CLI**: For managing AWS resources.
- **Serverless Framework**: Installed globally.
  ```
  npm install -g serverless
  ```

### **2. Clone the repository**

```
git clone git@github.com:udith-shalinda/coding-challenge.git
cd coding-challenge
```

### **3. Install dependencies**

```
npm install or yarn
```

### **4. Start server locally**

- configure aws profile locally as production
- running the serverless stage as dev

```
serverless offline -s dev --aws-profile production
```

### **5. Deploy to AWS**

- configure aws profile locally as production
- running the serverless stage as dev

```
serverless deploy -s dev --aws-profile production
```
